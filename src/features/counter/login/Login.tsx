import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
loginAsync,

} from './loginSlice';
import styles from './Counter.module.css';

export function Login() {
  // const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
 
  return (
    <div> 
      <h1 style={{backgroundColor:"yellow"}}>Hello!</h1>
    username: <input onChange={(e)=> setusername(e.target.value)}></input><br></br>
    password: <input onChange={(e)=> setpassword(e.target.value)}></input><br></br>
    <button style={{backgroundColor:"yellow"}} onClick={()=> dispatch(loginAsync({
      username, password,
      id: 0
}))}>Login</button>

    </div>
  );
}