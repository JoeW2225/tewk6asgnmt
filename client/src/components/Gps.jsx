import { useEffect } from "react"

export default function Gps({ onGpsUpdate }) {

    useEffect(() => {
        const gpsInterval = setInterval(() => {
            onGpsUpdate() //! updating gps is done by the parent (GrowthPoints.jsx)
        },1000);

        return () => clearInterval(gpsInterval)
    },[onGpsUpdate])

    

}