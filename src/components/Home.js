import React from 'react'
import Levelshower from './Levelshower'
import Gameboard from './Gameboard'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  let n=7;
  let arr=[];
  let path=[];
  const navigate=useNavigate();
function generate(){
  for(let i=0;i<(n*n);i++){
    arr.push(Math.floor(Math.random()*10));
  }
}
  return (
  <>
  <div className="homeCont">
    {generate()}
    <button onClick={()=>{navigate("/game",{state:{n,arr}})}}>to go game</button>
  </div>
  </>
  )
}
