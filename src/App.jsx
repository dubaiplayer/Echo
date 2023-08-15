import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./Homepage"
import { Signin } from "./Signin"
import { Chat } from "./Chat"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const Routing = () => {
    
    return (
      <Routes>
        <Route path="/" index={true} element={<Homepage />} />
        <Route path="/Signin" index={true} element={<Signin />} />
        <Route path="/Chat" index={true} element={<Chat />} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App
