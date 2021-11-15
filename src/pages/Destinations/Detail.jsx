import styles from './Destinations.module.css'
import * as backEndService from '../../services/backendService'
import { useLocation } from 'react-router-dom'

const DetailDestination = () => {
    const location = useLocation()
    const { id , city } = location.state

async function handleEdit(e,city){
    e.preventDefault();
    await backEndService.updateDest(id, city);
    this.history.push(`/destination/:${id}`)

}
async function handleDelete(e,city){
    e.preventDefault();
    await backEndService.deleteDest(id, city);
    this.history.push(`/destinations`)
}

  return (
    <div className='show'>
    
    <h1>{city.long_name}</h1>
    {/* <img width='200px' src={lastPhoto} alt='comingsoon'></img> */}
    {/* <p>{`Budget: ${city.budget ? city.budget[firstBudgetLocal].text : ''}`}</p> */}
    <p>Population: {city.population ? city.population : 'N/A'}</p><br/>
    <a href={city.wikipedia_url ? city.wikipedia_url : 'https://en.wikipedia.org/wiki/Main_Page'}>Wiki</a>
    {/* <p>{`Covid Level: ${city.covid ? city.covid[firstCovidLocal].text : ''}`}</p> */}

    {/* people who are not logged in should not be able to handle a submit */}
    {/* possibly make a condition on submit checking to see if there is a token */}
   
    <button onClick={e=>handleEdit(e,city)}>Edit</button>
    <button onClick={e=>handleDelete(e,city)}>Delete</button>
    
</div>

  )
}
 
export default DetailDestination