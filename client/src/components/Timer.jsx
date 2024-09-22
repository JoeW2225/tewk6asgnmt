//! An example of using clearInterval()
//? The code will now run once, which means the count goes up by just 1 now

//!!!!!!!IGNORE, LESSON EXERCISE, THIS IS NOT USED

import { useState, useEffect } from "react"

export default function Timer() {
    const [cookies, setCookies] = useState(0)

    // set interval- run this function every second (done in miliseconds 1000 (1sec), 2000 (2sec), 3000(3sec) etc)
    
    // we're going to use useEffect to make sure that we only create one interval in our app

    useEffect(() =>{
        // storing the interval as a const so i can reference later:
        const myInterval = setInterval(() => {
            setCookies(cookies => cookies + 1)
        },1000)


    // when the component unmounts between creating the code, we can return a cleanup function from the useEffect

    // what this does- useEffect will run the cleanup function 'below' when the component unmounts. For us, it will stop
    // runnning the myInterval.
    // clearInterval() is a preset function created by React, not made-up
    
    return () => {clearInterval(myInterval)}
    },[])

    return (
        <div>
            <p>Clean Count: {cookies}</p>
        </div>
    )
}