# Project Guide

---

## Section 1: Code Breakdowns & Comments

## Section 2: reflection

---

**PLEASE WAIT 30S/1MIN FOR UPGRADES TO LOAD, THIS IS FETCHED FROM AN EXTERNAL SERVER**

### BREAKDOWN OF: Gps.jsx, GrowthPoints.jsx, StoreUpgrades.jsx, GrowBoxes.jsx , App.jsx,

---

**React Hooks:**

###### useState:

When you use useState, you tell React to remember a specific value for this component, and you get back two things: the current value and a function to update that value.

an example: const [count, setCount] = useState(0);

count is the current value (initially 0), and setCount is the function to update it.
we use setCount to update count, we don't update count directly.

###### useEffect:

It allows you to perform side effects in your components. Side effects are actions like fetching data, manually updating the DOM.

useEffect runs after the component renders. You can think of it as a way to handle what needs to happen when the component loads or when certain values change.

an example: useEffect(() => {
console.log("Component mounted or updated");
}, [count]);

Here, refering back to the useState example- the code inside useEffect runs after rendering. It will run again whenever the count changes.

###### useCallback:

It remembers a function so it doesn't get re-created on every render. This is helpful to optimize performance when passing functions as props to child components. So it would only change if the depencdency (like count) changes.

###### Bring it together:

import React, { useState, useEffect, useCallback } from "react";

const CounterComponent = () => {

// Step 1: Create a piece of state called 'count'

const [count, setCount] = useState(0);

// Step 2: Create a memoized function using useCallback to handle button clicks:

const handleClick = useCallback(() => {

    setCount(prevCount => prevCount + 1);

    // No dependencies, so the function is the same across renders:

}, []);

// Step 3: Run a side effect when 'count' changes using useEffect

useEffect(() => {

    console.log(`The count has changed to: ${count}`);

    // Dependency array with `count`, so it runs whenever `count` changes:

}, [count]);

return (

<div>
<h1>Count: {count}</h1>
{/_ Step 4: Button that triggers the memoized handleClick function _/}
<button onClick={handleClick}>Increase Count</button>
</div>
);
};

export default CounterComponent;

return (

<div>
<h1>Count: {count}</h1>
{/_ Step 4: Button that triggers the memoized handleClick function _/}
<button onClick={handleClick}>Increase Count</button>
</div>
);
};
export default CounterComponent;

---

### Gps.jsx -export default func: Gps

**fyi The Gps file type should actually be a .js as there aren't any jsx code blocks to return. Anyways...**

#### Child to: GrowthPoints.jsx - export default func: GrowthComponent

import { useEffect } from "react"

export default function Gps({ onGpsUpdate }) {

_^^^This is a React functional component called Gps. It receives a prop called onGpsUpdate (from parent GrowthPoints.jsx)_
_The prop (onGpsUpdate) from GrowthPoints.jsx is coming from the return jsx block within GrowthPoints.jsx. Looks like this:_
<Gps onGpsUpdate= {handleGpsUpdate} />

_^^^Here we're referencing Gps (Imported at the top on line 2 from Gps.jsx), making up a name of onGpsUpdate (could be called unicorns, whatever), then assigning this prop name to the handleGpsUpdate function created within the GrowthComponent block._

    useEffect(() => {

_^^^useEffect preforms an action when the component (Gps) mounts and also when the dependency (onGpsUpdate) changes_

const gpsInterval = setInterval(() => {
//! updating gps is done by the parent (GrowthPoints.jsx)
onGpsUpdate() _>>> here we are calling the prop (reaaallyy we're actually calluing the handleGpsUpdate function within GrowthPoints.jsx)_
},1000);

_^^^setInterval repeatedly runs the callback (onGpsUpdate) every 1sec, the onGpsUpdate function passed from the parent component (GrowthComponent)_

        return () => clearInterval(gpsInterval)

_^^^We then want to clean up this function to stop it doing everything twice (otherwise it would count up by 2 and not one)_
},[onGpsUpdate])

_^^^[] this array of dependencies control when useEffect will run. if the function onGpsUpdate changes for any reason, the interval will reset and use the new function._
}

---

### GrowthPoints.jsx -export default func: GrowthComponent

#### Parent to the following:

#### Gps.jsx - export default func: Gps | StoreUpgrades.jsx - export default func: StoreUpgrades | GrowBoxLv1,2,3,4,5 - export default func: GrowBoxLv1,2,3,4,5

import { useCallback, useEffect, useState } from "react"
_^^^importing all these React Hooks as we are using them within the GrowthComponent_
import Gps from "./Gps.jsx" \*_^^^We need this import for the Gps the handleGpsUpdate function, referenced in the jsx block at the bottom_
import StoreUpgrades from "./StoreUpgrades.jsx"
_^^^ for the upgrades to improve growth rate_
import './GpButtonStyle.css'
import sunImg from '../assets/sun.webp'
import PointsCont from './PointsHudStyle.module.css'
_^^^styling for the GP button and the gps/GP points_
import GrowBoxLv1 from './GrowBoxes/GrowBoxLv1.jsx';
import GrowBoxLv2 from './GrowBoxes/GrowBoxLv2.jsx';
import GrowBoxLv3 from './GrowBoxes/GrowBoxLv3.jsx';
import GrowBoxLv4 from './GrowBoxes/GrowBoxLv4.jsx';
import GrowBoxLv5 from './GrowBoxes/GrowBoxLv5.jsx';
_^^^making the boxes disappear as the user progresses_

export default function GrowthComponent() {

    useEffect(() => {
        console.log("GrowthComponent mounted");
    }, []);

_^^^The useEffect hook with an empty dependency array ([]) will run once, when the component first mounts, logging "GrowthComponent mounted"_

    const [growthPoints, setGrowthPoints] = useState(() => {

_^^^we create the useState so using growthPoints, setGrowthPoints. remember using setGrowthPoints when we want to update/change the growthPoints_
const storedGrowthPoints = localStorage.getItem('growthPoints');
_^^^as we are using localStorage, we are getting the stored data (growthPoints)_  
 return storedGrowthPoints ? JSON.parse(storedGrowthPoints) : 0;
})
_^^^what we are saying here is (using the ? : syntax) if growthPoints is found in localStorage, use it as the initial state on load. otherwise default to 0._

    const [gps, setGps] = useState(() => {
        const storedGps = localStorage.getItem('gps');
        return storedGps ? JSON.parse(storedGps) : 1;
    })

_^^^the same logic as the growthPoints, but it defaults to 1 instead of 0 (as we don't want users to have 0 growth points per second)_

    const handleGpsUpdate = useCallback(() => {
        setGrowthPoints((previous) => previous + gps)
    },[gps])

_^^^In the cookieclicker we want to add the gps to the growthpoints, and update it. it's in a callBack function as we want to aviod unnecessary re-make of the function unless gps changes. this is key for preformance when passing it to Gps.jsx as a prop (mentioned earlier)_

    const handleClick = () => {
        setGrowthPoints(previous => previous + 1)
    }

_^^^pretty simple, adds +1 everytime the button (being the sun) gets clicked_

    useEffect(() => {
        localStorage.setItem('gps', JSON.stringify(gps))
        localStorage.setItem('growthPoints', JSON.stringify(growthPoints))
    },[gps, growthPoints])

_^^^here we use useEffect to save to localStorage. so it listens to the dependencies [gps, growthpoints] and saves whenever there is a change. REMEMBER to if saving something to localStorage to JSON.stringify it_

    return (
        <>
            <div>
                <button className="gPButnCont" onClick= {handleClick}><img className="sun" src={sunImg} alt="8bit sun"></img></button>
            </div>

_^^^Standard button stuff_

<div className={PointsCont.pointsCont}>
<h4 >Grow the Plant!</h4>
<h4 >Growth Points: </h4>
<h4 >{growthPoints}</h4>
<h4 >Growth P/S: {gps}</h4>
_^^^using {} to call the functions to get the results to render on screen_
</div>
<div>
<Gps onGpsUpdate= {handleGpsUpdate} />
_^^^a child component, see the Gps.jsx section
<StoreUpgrades
                growthPoints= {growthPoints}
                setGrowthPoints= {setGrowthPoints}
                gps= {gps}
                setGps= {setGps}/>
_^^^2nd child component, StoreUpgrades.jsx. This component gets the growthPoints, setGrowthPoints, gps and setGps as props. allows it to modify these values when the upgrades are purchased*
</div>
<GrowBoxLv1 growthPoints={growthPoints} />
<GrowBoxLv2 growthPoints={growthPoints} />
<GrowBoxLv3 growthPoints={growthPoints} />
<GrowBoxLv4 growthPoints={growthPoints} />
<GrowBoxLv5 growthPoints={growthPoints} />
*^^^3rd child components, GrowBoxLv1,2,3,4,5. These components are used for different levels, being boxes (gives the illusion that the plant is growing over time). the boxes disappear based on the number of growthPoints.\*
</>
)

}

---

### StoreUpgrades.jsx -export default func: StoreUpgrades

#### Child to: GrowthPoints.jsx - export default func: GrowthComponent

import { useEffect, useState } from "react";
_^^^importing all these React Hooks as we are using them within the StoreUpgrades component_
import StoreCont from './StoreStyle.module.css'
import UpgradesStyle from './StoreStyle.module.css'
import BuyButnCont from './StoreStyle.module.css'
import BuyButn from './StoreStyle.module.css'
_^^^these are imports for styling purposes_

export default function StoreUpgrades({ growthPoints, setGrowthPoints, setGps }) {
_^^^here we pass the following components: { growthPoints, setGrowthPoints, setGps } as props from the parent GrowthPoints.jsx._
_Buy why? well, growthPoints tells us what the available points to spend are, setGrowthPoints to update the number of growth points, setGps to update the growth points per second_

    const [upgradeArr, setUpgrades] = useState([])

_^^^upgradeArr is that array that holds all the upgrades. We'll use setUpgrades to update the list of upgrades_

useEffect(() => {
console.log("storeUpgrades mounted")

    const storedUpgrades = localStorage.getItem('upgrades');

_^^^As we've done before we get the upgrades from localStorage_

    console.log("stored upgrades:", storedUpgrades)

    if (storedUpgrades && storedUpgrades !== '[]') {

_^^^First, checks to see if there are any storedUpgrades in the localStorage. This is done by checking two conditions: 1st- storedUpgrades && storedUpgrades: in a && statement both sides must be met to be true. so basically we are double checking that storedUpgrades definiately has something in it (prevents potential bugs). 2nd- we are saying storedUpgrades MUST NOT BE EQUAL TO ( !== ) an empty array ( [] )_

        setUpgrades(JSON.parse(storedUpgrades));

_^^^IF YES: Loads stored upgrades into upgradeArr using setUpgrades. REMEMBER we can't directly update/change the upgradeArr._

    } else {
        async function fetchStoreUpgrades() {

_^^^As we are getting data from a outside source, aka a 3rd party API we need to use an async function_
const response = await fetch('https://wk6asgnmtapi.onrender.com/plantupgrades');
const upgrades = await response.json();
_^^^We then use in conjunction with async, await. basically saying load everything else first then come back to fetching the data_

                setUpgrades(upgrades);

_^^^IF NO: if no stored upgrades then we fetch the upgrades from the API URL then store them in the upgradeArr (aka setUpgrade)_
}
fetchStoreUpgrades();
}
},[]);

useEffect(() =>{

    if (upgradeArr.length > 0) {

_^^^By checking upgradeArr.length > 0, we ensure that only non-empty arrays (with at least 1 upgrade) are saved to localStorage._
localStorage.setItem('upgrades', JSON.stringify(upgradeArr));
}
}, [upgradeArr]);
_^^^having the upgradeArr in the dependency here means the useEffect hook only runs if upgradeArr changes_

    function handleBuy(upgrade) {

_^^^handleBuy is triggered when the user clicks the "Purchase" button for an upgrade. It checks if the user has enough growthPoints to buy the upgrade_

        if (growthPoints >= upgrade.cost) {

_^^^ if growthPoints is greater than the upgrade.cost (in the array) then do the following:_

            setGrowthPoints(prevPoints => prevPoints - upgrade.cost);

_^^^subtracts the setGrowthPoints (the prevPoints is a variable we've just made here, can be called anything like unicorn) from the upgrade.cost_
setGps(prevGps => prevGps + upgrade.increase);
_^^^adds the increase in GPS (using the made up variable prevGps)_

            setUpgrades(prevUpgrades =>

_^^^here we are now rendering the upgrades. we take our setUpgrades (upgradeArr) then assign a variable we created called prevUpgrades. this has the old state of array._
prevUpgrades.map(item =>
_^^^we then use .map() built in JS method to create a new array. we create the variable called item the item is represents each individual upgrade._
item.id === upgrade.id
_^^^checks to see if the item id matches that of the upgrade id being purchased_
? {
id: item.id,
name: item.name,
cost: item.cost,
increase: item.increase,
//mark upgrade when bought:
purchased: true,
}
: item
_^^^this Ternary operator is an if-else statement. This means create a new object within the array that has all the properties of item & also set purchased to be true (as we don't want users to be able to buy the same upgrade again). IF FALSE i.e. user hasn't purchased, then return just the original item._

**HERE WE CAN USE THE SPREAD OPERATOR: instead of writing out that whole object above, we can do this: {...item, purchased: true }. It copies all properties from item into a new object. This way we can keep all existing data, but easily add new ones or override ones. in this case we added purchased: true, to the object.**

                )
            );
        }
    }

    return (
        <div className={StoreCont.storeCont}>
            <h3>Upgrades</h3>
            {upgradeArr.map((upgrade)=> {

_^^^now we loop through the array and renders each of the following:_
return (

<div className={UpgradesStyle.upgradesStyle} key={upgrade.id}>
<h4>{upgrade.name}</h4>
<p>💲Cost: {upgrade.cost}</p>
<p>📈GPS Increase: {upgrade.increase}</p>

                        <div className={BuyButnCont.buyButnCont}>

                            <button className={BuyButn.buyButn} onClick={() => handleBuy(upgrade)}

_^^^this onClick ={() => runs the handleBuy function, passing the upgrade object as the argument_

                            disabled={growthPoints < upgrade.cost || upgrade.purchased}

_^^^ determines if the button is enabled or disabled by: button will be disabled if the user doesn't have enough growthPoints OR has already purchased the upgrade_ >
{upgrade.purchased ? "Purchased" : "Purchase"}
_^^^another Ternary Operator aka if-else. If upgrade.purchased is true, then button to show Purchased. if false, button to show Purchase._
</button>

</div>
</div>
)
})}
</div>
)

}

---

### GrowBoxLv1.jsx -export default func: GrowBoxLv1

#### Child to: GrowthPoints.jsx - export default func: GrowthComponent

**Following applys to all GrowBox functions, just change in points requirement**

import { useState, useEffect } from 'react';
\*^^^standard imports as usual as wel are using these React hooks

- import './GrowBoxLv1Style.css';
  _^^^import styling_

export default function GrowBoxLv1({ growthPoints }) {
_^^^Here we are getting the growthPoints prop from the parent GrowthComponent in GrowPoints.jsx. We need this when we start asking the question of if the user has x points hide the box etc._

    const [isVisible, setIsVisible] = useState(true);

_^^^This sets up local state for the component to track whether the box is visible or not. Previously we have set a starting integer like 0 or 1 for the useState. However this time we want a Boolean value of true/false, so starting we want true as we want the box to be visible._

    useEffect(() => {

_^^^this hook will be checking the value of growthPoints everytime it changes_

        if (growthPoints >= 1000) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [growthPoints]);

\*^^^If the growthPoints are greater than or equal to 1000, it hides the box by setting isVisible to false. Otherwise, it ensures that isVisible remains true. Within the dependancy array, the useEffect will run it's code everytime the growthPoints changes, Hence why growthPoints is in the array[].
if (!isVisible) {

        return null;
    }

_^^^this is crucial, we're saying here is: if NOT(!)isVisible, return nothing(null) to the DOM. this is so that it does not render anything and hides the box._
return (
<div className="boxlv1"></div>
);
}

---

**BRIEF REFLECTION**

**I Will write out a indepth reflection on 23/09/24. There are many notes I have yet to add to this readme, as I**
**would like to have this as a guide to layout exactly what the code is doing and why, for my benefit.**

**I haven't fully optimized it for desktop (such as the plant being too small), as I mainly focused on getting mobile sorted. however, my next step**
**would be to have the upgrades as a scrolling vertical menu, as it's looks naff going way beyond the screen.**

**I used figma alot more this time round and spent more time planning. This helpful during the styling phase.**

**A slight regret was spending nearly all day Friday finishing the 3rd party URL set up that I had made, then getting it to**
**fetch on my actual project. Because of this it set me back quite alot, meaning I ending up being behind on actually**
**working on the project itself.**

**However I did learn from my mistakes in getting it to work thanks to Sam explaining it to me.**

**I felt really as though I needed more time learning react in general, the amount of times I got lost as to why things weren't**
**working because I had fetched a component it too many times in different components when I didn't need to, or struggling to**
**work out what component to use to create a function in. I thought my previous week 3 project would come in use, and if**
**I'm honest it wasn't much use at all. The way React works in comparason to Vanilla JS is so much different in my opinion.**

**I will persist in practice of using React as it's a very popular, main stream tool. It's just going to be a mission getting to**
**grips with parent and child components, knowing where to call them and how you're going to pass data between them.**
