import './PlantImgStyle.css';
import plantImg from '../assets/wholeplantlong.webp'

const PlantCont = () => {
    return (
        <div className='plantCont'>
            <img className="plant" src={plantImg} alt="8bit plant"></img>
        </div>
    )
}


export default PlantCont