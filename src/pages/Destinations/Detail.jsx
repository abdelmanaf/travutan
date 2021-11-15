import styles from './Destinations.module.css';
import * as backEndService from '../../services/backendService';
import { useLocation, useHistory } from 'react-router-dom';

const DetailDestination = () => {
  const location = useLocation();
  const history = useHistory();
  const { id, city } = location.state;

  async function handleEdit(e, city) {
    e.preventDefault();
    await backEndService.createOrUpdateProfileDestination(id);
    history.push(`/destination/:${id}`);
  }
  async function handleDelete(e) {
    e.preventDefault();
    const r = await backEndService.removeProfileDestination(id);
    console.log('respose delete', r);
    history.push(`/destinations`);
  }

  return (
    <div className="show">
      <h1>{city.title}</h1>
      {/* <img width='200px' src={lastPhoto} alt='comingsoon'></img> */}

      <p>Population: {city.population ? city.population : 'N/A'}</p>
      <br />
      <a
        href={
          city.wikipedia_url
            ? city.wikipedia_url
            : 'https://en.wikipedia.org/wiki/Main_Page'
        }
      >
        Wiki
      </a>
      <br />

      {/* people who are not logged in should not be able to handle a submit */}
      {/* possibly make a condition on submit checking to see if there is a token */}

      <button onClick={(e) => handleEdit(e, city)}>Edit</button>
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </div>
  );
};

export default DetailDestination;
