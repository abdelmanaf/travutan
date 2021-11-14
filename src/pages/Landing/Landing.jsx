import styles from './Landing.module.css'

const Landing = ({user, destinations}) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.headerH1}>
        <span className={styles.mySpan}>W</span>elcome to <span className={styles.mySpan}>T</span>ravutan {user ? user.name : ""}
      </h1> <br /> <br />
      <div className={styles.flexContainer}>
        {
          destinations.map((destination, idx) => (
            <div className={styles.destinationCard} key={idx}>
              <h4 className={styles.headerH4}>{destination.title}</h4> <br />
              <img width="90%" height="70%" src={destination.image} alt='soon'/>
            </div>
          ))
        }
      </div>
      
    </main>
  )
}
 
export default Landing