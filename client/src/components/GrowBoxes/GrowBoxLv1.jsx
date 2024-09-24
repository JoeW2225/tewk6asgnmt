import { useState, useEffect } from 'react';
import './GrowBoxLv1Style.css';


export default function GrowBoxLv1({ growthPoints }) {
    
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        
        if (growthPoints >= 1000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

    if (!isVisible) {

        return null;
    }

    return (
        <div className="boxlv1"></div>
    );
}

