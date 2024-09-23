import { useEffect } from "react"

export default function Gps({ onGpsUpdate }) {

    useEffect(() => {
        const gpsInterval = setInterval(() => {
            //! updating gps is done by the parent (GrowthPoints.jsx)
            onGpsUpdate() 
        },1000);

        return () => clearInterval(gpsInterval)
    },[onGpsUpdate])

    

}