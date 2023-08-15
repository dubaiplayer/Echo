import React from 'react'
import "./App.css"
import { Link } from "react-router-dom";

export const Homepage = () => {

  return (
    <>
      <div>
      </div>
      <h1 className="text">Welcome to Echo!</h1>
      <div className="signCard">
        <Link to="/Signin">
        <button className='homeButton'>Sign into your Account</button>
        </Link>    

      </div>
      <p className="subtext">
        Share your thoughts with the world!
      </p>
    </>
  )
}
