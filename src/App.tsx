import React, { useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  loginAsync, selectLooged, logout
} from './features/counter/login/loginSlice';
import { Login } from './features/counter/login/Login';
import { Gal } from './features/counter/gal/Gal';
import Upl from './features/counter/gal/Upl';

function App() {
  const looged = useAppSelector(selectLooged);
  const dispatch = useAppDispatch();

  function refreshPage() {
    window.location.reload();
  }
  // useEffect(() => {
  //   axios.get("index/").then(res => console.log(res.data))
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        {looged ?
        <div>
        <button onClick={() => {dispatch(logout());refreshPage()}}>LogOut</button>
        <Gal/>
        <Upl></Upl>
        </div> :
        <Login/>}
      </header>
    </div>
  );
}

export default App;
