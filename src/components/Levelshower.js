import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Levelshower() {
  const navigate = useNavigate();
  const finish = [1, 2, 3, 4];
  let n = 0;
  let arr = [];


  function level() {
    let content = [];
    for (let i = 1; i <= 10; i++) {
      // if(finish.includes(i)){
      //   content.push(<> <div style={{background:" rgba(26, 255, 0, 0.45)"}} onClick={(i)=>{handle(i)}} className="levelButton"> {i}</div>
      //   </>
      //   )
      // }
      // else{
      content.push(
        <> <div /*style={{animation:`animate-${(Math.floor(Math.random() * 2))+1} 1.1s both `}}*/ onClick={() => {

          handle(i)
        }} className="levelButton"> {i}</div>
        </>
      )
    }

    return content;
  }

  function handle(i) {
    // let last=finish[finish.length-1];
    // if(last!=i-1){
    //   return;
    // }
    console.log(i);
    n = i;
    generate(n + 1);
    console.log("level ", n, " ", arr);
    ;
    navigate("/game", { state: { n: (n + 1), arr } });
  }

  function generate(n) {
    console.log("inside ", n);
    for (let i = 0; i < (n * n); i++) {
      arr.push(Math.floor(Math.random() * 10)+1);
    }
    console.log("inside ", arr);
  }

  return (
    <>
      <div className="levelCont">
        {level()}
      </div>

    </>
  )

}
