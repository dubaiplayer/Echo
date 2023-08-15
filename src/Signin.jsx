import React from 'react'
import { useState } from 'react'
import { Chat } from "./Chat"
import "./Signin.css"
import {auth, provider} from "./Firebase"
import {signInWithPopup} from "firebase/auth"
import { Link } from "react-router-dom";
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const Signin = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  const signInWithGoogle = async () => {
    try{
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      cookies.set("auth-token", result.user.refreshToken)

      window.open("/Chat", "_blank")

    } catch(err){
      console.error(err)
    }

  }

  if (!isAuth){

  return (
    <div>
        <h1 className='text'>Sign in to Continue</h1>
        <button className="signButton" onClick={signInWithGoogle}>Sign in with Google</button>
        <Link to="/Chat"><button className="signButton">Continue</button></Link>
        
    </div>
  )
  } else{
    return(
      <div>
        <Link to="/Chat"><button className="signButton">Continue</button></Link>
      </div>

    )
  }
}


