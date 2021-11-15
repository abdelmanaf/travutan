// React / React Router imports
import React, { Component } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

// Components imports
import NavBar from '../../components/NavBar/NavBar';

// Page imports
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Users from '../Users/Users';
import SearchList from '../SearchList/SearchList';
import Destinations from '../Destinations/Destinations';
import DestinationDetail from '../Destinations/Detail';
import SearchShow from '../SearchShow/SearchShow';

// Services imports
import * as authService from '../../services/authService';
import * as roadgoatService from './../../services/roadgoatService';
import * as backEndService from './../../services/backendService';

class App extends Component {
  state = {
    user: authService.getUser(),
    loginAPI: process.env.REACT_APP_APIKEY,
    passAPI: process.env.REACT_APP_SECRETKEY,
    baseURL: process.env.REACT_APP_BASEURL,
    query: 'q=',
    searchTitle: '',
    searchURL: '',
    search: [],
    // destinations will be an array of destinations collection,
    destinations: [],
    // profileDest will be an array of destinations in profile destinations array,
    profile: {},
    profileDestinations: [],
  };

  async componentDidMount() {
    const allDestinations = await backEndService.getAll();
    const getAllProfileDestinations = await backEndService.getProfile();
    console.log('all destination of profile', getAllProfileDestinations);

    console.log('alldestinations', allDestinations);

    this.setState(
      {
        destinations: allDestinations,
        profileDestinations: getAllProfileDestinations,
      },
      () => {
        console.log('state destinations', this.state.destinations);
      }
    );
  }

  handleAddDestination = async (formBody) => {
    const newDestination = await backEndService.create(formBody);

    if (newDestination) {
      console.log('user state', this.state.user._id);
      console.log('newDestination', newDestination);
      const d = await backEndService.createOrUpdateProfileDestination(
        this.state.user._id,
        newDestination
      );
      console.log(`ici avec data ${d}`);
    }

    this.setState(
      {
        destinations: [...this.state.destinations, newDestination],
      },
      () => {
        console.log(this.state.destinations);
      }
    );

    this.props.history.push('/');
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push('/');
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

  handleChange = (e) => {
    this.setState({ searchTitle: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      {
        searchURL:
          this.state.baseURL + this.state.query + this.state.searchTitle,
        searchTitle: '',
      },
      () => {
        roadgoatService
          .getSearch(
            this.state.searchURL,
            this.state.loginAPI,
            this.state.passAPI
          )
          .then((json) =>
            this.setState({
              search: json,
            })
          );
      }
    );

    this.props.history.push('/search');
  };

  handleProfile = async () => {
    const profile = await backEndService.getProfile();

    this.setState({
      profile,
    });
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar
          user={user}
          handleLogout={this.handleLogout}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searchTitle={this.state.searchTitle}
          handleProfile={this.handleProfile}
        />
        <Route exact path="/">
          <Landing user={user} destinations={this.state.destinations} />
        </Route>
        <Route exact path="/signup">
          <Signup
            history={this.props.history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        </Route>
        <Route exact path="/destinations">
          <Destinations
            profile={this.state.profile}
            profileDestinations={this.state.profileDestinations}
          />
        </Route>
        <Route exact path="/destination/:id">
          <DestinationDetail />
        </Route>
        <Route exact path="/login">
          <Login
            history={this.props.history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        </Route>
        <Route
          exact
          path="/users"
          render={() => (user ? <Users /> : <Redirect to="/login" />)}
        />

        <Route exact path="/search">
          <SearchList search={this.state.search} />
        </Route>

        <Route
          exact
          path="/searchShow"
          render={({ location }) => (
            <SearchShow
              user={user}
              location={location}
              handleAddDestination={this.handleAddDestination}
            />
          )}
        />
      </>
    );
  }
}

export default App;
