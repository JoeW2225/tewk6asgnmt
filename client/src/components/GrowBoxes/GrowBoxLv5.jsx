import { useState, useEffect } from 'react';
import './GrowBoxLv5Style.css';


export default function GrowBoxLv5({ growthPoints }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        
        if (growthPoints >= 30000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

    if (!isVisible) {

        return null;
    }

    return (
        <div className="boxlv5"></div>
    );
}