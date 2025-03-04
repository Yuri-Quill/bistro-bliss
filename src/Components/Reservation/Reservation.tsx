
import './Reservation.scss'
import ReservationForm from './ReservationForm/ReservationForm'

const Reservation = ()=>{
    return(
<section className='reservation'>
    <h2 className='reservation__title'>Book A Table</h2>
    <p className='reservation__text'>We consider all the drivers of change gives you the components you need to change to create a truly happens.</p>

<ReservationForm/>
</section>
    )
}
export default Reservation