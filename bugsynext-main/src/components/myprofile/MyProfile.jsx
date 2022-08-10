import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const MyProfile = (props) => {

  const count = useSelector((store) => store.auth.count);

  // Similar to componentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    console.log('componentDidMount!');
  }, []);

  // componentDidUpdate
  useEffect(() => {
    // Update the document title using the browser API
    console.log('componentDidUpdate on Props count!!');
  }, [count]);


    return (
        <>
        
        <div>My Profile!</div>
        <h1>{count}</h1>
        {/* <button onClick={() => setCount((prevState) => prevState + 1)}>Increment</button>
         */}
        </>
    )
}


export default MyProfile;
