import { useCallback, useEffect, useState } from "react"
import Gps from "./Gps.jsx"
import StoreUpgrades from "./StoreUpgrades.jsx"
import './GpButtonStyle.css'
import sunImg from '../assets/sun.webp'
import PointsCont from './PointsHudStyle.module.css'
import GrowBoxLv1 from './GrowBoxes/GrowBoxLv1.jsx';
import GrowBoxLv2 from './GrowBoxes/GrowBoxLv2.jsx';
import GrowBoxLv3 from './GrowBoxes/GrowBoxLv3.jsx';
import GrowBoxLv4 from './GrowBoxes/GrowBoxLv4.jsx';
import GrowBoxLv5 from './GrowBoxes/GrowBoxLv5.jsx';

export default function GrowthComponent() {

    useEffect(() => {
        console.log("GrowthComponent mounted");
    }, []);


    const [growthPoints, setGrowthPoints] = useState(() => {
        const storedGrowthPoints = localStorage.getItem('growthPoints');
        return storedGrowthPoints ? JSON.parse(storedGrowthPoints) : 0;
    })

    const [gps, setGps] = useState(() => {
        const storedGps = localStorage.getItem('gps');
        return storedGps ? JSON.parse(storedGps) : 1;
    })

    const handleGpsUpdate = useCallback(() => {
        setGrowthPoints((previous) => previous + gps)
    },[gps])

    const handleClick = () => {
        setGrowthPoints(previous => previous + 1)
    }

    useEffect(() => {
        localStorage.setItem('gps', JSON.stringify(gps))
        localStorage.setItem('growthPoints', JSON.stringify(growthPoints))
    },[gps, growthPoints])
    
    return (
        <>
            <div>
                <button className="gPButnCont" onClick= {handleClick}><img className="sun" src={sunImg} alt="8bit sun"></img></button>
            </div>

            <div className={PointsCont.pointsCont}>
                <h4 >Grow the Plant!</h4>
                <h4 >Growth Points: </h4>
                <h4 >{growthPoints}</h4>
                <h4 >Growth P/S: {gps}</h4>
            </div>
            
            <div>
                <Gps onGpsUpdate= {handleGpsUpdate} />
                <StoreUpgrades 
                growthPoints= {growthPoints}
                setGrowthPoints= {setGrowthPoints}
                gps= {gps}
                setGps= {setGps}/>
            </div>
            <GrowBoxLv1 growthPoints={growthPoints} />
            <GrowBoxLv2 growthPoints={growthPoints} />
            <GrowBoxLv3 growthPoints={growthPoints} />
            <GrowBoxLv4 growthPoints={growthPoints} />
            <GrowBoxLv5 growthPoints={growthPoints} />
        </>
    )

}