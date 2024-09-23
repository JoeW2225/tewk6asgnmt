import { useEffect, useState } from "react";
import StoreCont from './StoreStyle.module.css'
import UpgradesStyle from './StoreStyle.module.css'
import BuyButnCont from './StoreStyle.module.css'
import BuyButn from './StoreStyle.module.css'

export default function StoreUpgrades({ growthPoints, setGrowthPoints, setGps }) {

    const [upgradeArr, setUpgrades] = useState([])

useEffect(() => {
    console.log("storeUpgrades mounted")

    const storedUpgrades = localStorage.getItem('upgrades');
    console.log("stored upgrades:", storedUpgrades)

    if (storedUpgrades && storedUpgrades !== '[]') {
        setUpgrades(JSON.parse(storedUpgrades)); 
    } else {
    
        async function fetchStoreUpgrades() {
                const response = await fetch('https://wk6asgnmtapi.onrender.com/plantupgrades');
                const upgrades = await response.json();
                setUpgrades(upgrades);
            }
            fetchStoreUpgrades();
        }
    },[]); 

useEffect(() =>{
    
    if (upgradeArr.length > 0) {
        localStorage.setItem('upgrades', JSON.stringify(upgradeArr));
    }
}, [upgradeArr]);

    function handleBuy(upgrade) {
        if (growthPoints >= upgrade.cost) {
            setGrowthPoints(prevPoints => prevPoints - upgrade.cost);
            setGps(prevGps => prevGps + upgrade.increase);

            setUpgrades(prevUpgrades => 
                prevUpgrades.map(item => 
                    item.id === upgrade.id
                        ? {
                            id: item.id,
                            name: item.name,
                            cost: item.cost,
                            increase: item.increase,
                            //mark upgrade when bought:
                            purchased: true, 
                        }
                        : item
                )
            );
        }
    }

    return (
        <div className={StoreCont.storeCont}>
            <h3>Upgrades</h3>
            {upgradeArr.map((upgrade)=> {
                return (
                    <div className={UpgradesStyle.upgradesStyle} key={upgrade.id}>
                        <h4>{upgrade.name}</h4>
                        <p>💲Cost: {upgrade.cost}</p>
                        <p>📈GPS Increase: {upgrade.increase}</p>

                        <div className={BuyButnCont.buyButnCont}>
                            <button className={BuyButn.buyButn} onClick={() => handleBuy(upgrade)}
                            disabled={growthPoints < upgrade.cost || upgrade.purchased}
                            >
                            {upgrade.purchased ? "Purchased" : "Purchase"}
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}