import { useState, useEffect } from 'react';
import './GrowBoxLv4Style.css';


export default function GrowBoxLv4({ growthPoints }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        
        if (growthPoints >= 16000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

    if (!isVisible) {

        return null;
    }

    return (
        <div className="boxlv4"></div>
    );
}