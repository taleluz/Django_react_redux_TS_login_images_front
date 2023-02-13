import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {getImagesAsync,selectImages,delImageAsync,selectUpd} from './galSlice';
import styles from './Counter.module.css';
import { selectAccess, selectUsername } from '../login/loginSlice';
import Upl from './Upl';

export const Gal=()=> {
  const images = useAppSelector(selectImages);
  const upd = useAppSelector(selectUpd);
  const dispatch = useAppDispatch();
  const access = useAppSelector(selectAccess);
  const username = useAppSelector(selectUsername);
 

    useEffect(() => {
      dispatch(getImagesAsync(access)) }
      , [upd])

    useEffect(() => {
      console.log(images)
    }, [images])
    
  return (
    <div>
       <h1><center style={{backgroundColor:"green"}}>Welcome {username}</center></h1>
       <hr></hr>
        {images.map((img,i)=><div>Title: {img.title} <br></br> 
       Delete: <button onClick={()=>dispatch(delImageAsync({id:img.id, access}))}> {img.id}</button> <br></br>Desc:
        {img.description} <br></br><img src={`http://127.0.0.1:8000${img.image}`}></img></div>)}
    </div>
  );
}