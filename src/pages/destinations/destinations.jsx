import { Link } from 'react-router-dom';
import styles from './Destinations.module.css';

const Destinations = ({ user, profileDestinations }) => {
  return (
    <main className={styles.container}>
      <h1>{user ? user.name : ''}'s Favorite Destinations</h1>

      <div className={styles.flexContainer}>
        {profileDestinations.length > 0 ? (
          profileDestinations.map((profileDestination, idx) => (
            <div className={styles.destinationCard} key={idx}>
              <h4>{profileDestination.title}</h4>
              <Link
                to={{
                  pathname: `/destination/${profileDestination._id}`,
                  state: {
                    id: profileDestination._id,
                    city: profileDestination,
                  },
                }}
              >
                {profileDestination.title}
              </Link>
              <img width="90%" src={profileDestination.image} alt="soon" />
            </div>
          ))
        ) : (
          <div> No data available</div>
        )}
      </div>
    </main>
  );
};

export default Destinations;
