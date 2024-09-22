import { useState, useEffect } from 'react';
import './GrowBoxLv3Style.css';


export default function GrowBoxLv3({ growthPoints }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        
        if (growthPoints >= 8000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

    if (!isVisible) {

        return null;
    }

    return (
        <div className="boxlv3"></div>
    );
}