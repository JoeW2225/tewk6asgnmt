import { useState, useEffect } from 'react';
import './GrowBoxLv2Style.css';


export default function GrowBoxLv2({ growthPoints }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        
        if (growthPoints >= 3000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

    if (!isVisible) {

        return null;
    }

    return (
        <div className="boxlv2"></div>
    );
}

