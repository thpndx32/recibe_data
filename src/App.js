import logo from './logo.svg';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App({
  setUID, uid
}) {
  useEffect(()=>{
    if(!uid) setUID(uuidv4());
  },[])
  useEffect(()=>{
    console.log("uid",uid);
    sessionStorage.setItem("uid", uid);
},[uid])
  return (
    <div className="App">
      {uid&&<Navigate to={`/${uid}/geolocator`} replace={true}/>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
