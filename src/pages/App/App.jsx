import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import * as authService from '../../services/authService'

class App extends Component {
	state = {
		user: authService.getUser()
	}

	handleLogout = () => {
		authService.logout();
		this.setState({user: null})
		this.props.history.push('/')
	}

	handleSignup = () => {
		this.setState({ user: authService.getUser() })
	}

	render() {
		return (
			<>
				<NavBar 
					user={this.state.user} 
					handleLogout={this.handleLogout} 
				/>
				<Route exact path='/'>
          			<Landing user={this.state.user} />
        		</Route>
				<Route exact path='/signup'>
					<Signup 
						history={this.props.history}
						handleSignup={this.handleSignup}
					/>
				</Route>
				<Route exact path='/login'>
					<Login history={this.props.history}/>
				</Route>
			</>
		)
	}
}

export default App
