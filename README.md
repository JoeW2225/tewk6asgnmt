# Project Reflection/Comments/Sources

---

## Section 1: guides and comments

## Section 2: sources

## Section 3: reflection

---

**PLEASE WAIT 30S/1MIN FOR UPGRADES TO LOAD, THIS IS FETCHED FROM AN EXTERNAL SERVER**

### BREAKDOWN OF: App.jsx, Gps.jsx, GrowthPoints.jsx, StoreUpgrades.jsx, GrowBoxes

---

**React Hooks:**

######useState:
When you use useState, you tell React to remember a specific value for this component, and you get back two things: the current value and a function to update that value.

an example: const [count, setCount] = useState(0);

count is the current value (initially 0), and setCount is the function to update it.
we use setCount to update count, we don't update count directly.

######useEffect:
It allows you to perform side effects in your components. Side effects are actions like fetching data, manually updating the DOM.

useEffect runs after the component renders. You can think of it as a way to handle what needs to happen when the component loads or when certain values change.

an example: useEffect(() => {
console.log("Component mounted or updated");
}, [dependency]);

Here, the code inside useEffect runs after rendering. It will run again whenever the dependency changes.

######useCallback:

---

### Gps.jsx -export default func: Gps

#### (Child to GrowthPoints.jsx - export default func: GrowthComponent)

import { useEffect } from "react"

export default function Gps({ onGpsUpdate }) {

^^^This is a React functional component called Gps. It receives a prop called onGpsUpdate (from parent GrowthPoints.jsx)

    useEffect(() => {
        const gpsInterval = setInterval(() => {
            //! updating gps is done by the parent (GrowthPoints.jsx)
            onGpsUpdate()
        },1000);

        return () => clearInterval(gpsInterval)
    },[onGpsUpdate])

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
