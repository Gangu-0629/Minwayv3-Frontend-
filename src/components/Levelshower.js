import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import Api from '../Services/Api';

export default function Levelshower() {
  const location = useLocation();
  const navigate = useNavigate();
  const finish = [1, 2, 3, 4];
  let n = 0;
  let arr = [];
  const [username, setUsername] = useState("");
  const [prelevel, setLevel] = useState("");
  async function Getuser() {
    console.log("Called useffect in levelshow");
    const data = {
      email: localStorage.getItem("Minwayemail")
    }
    try {
      const rep = await Api.post("/info/getuser", data, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("Minwaytoken")}`,
          "Content-Type": "application/json"
        }
      }).then(rep => rep.data).then((rep) => {
        setUsername(rep.username);
        setLevel(prev => prev = rep.level);
        console.log(rep);
      })
    }
    catch (err) {
      console.log(err);
      localStorage.setItem("Minwayemail", "");
      localStorage.setItem("Minwaytoken", "");
      navigate("/");
    }
  }
  useEffect(() => { Getuser() }, [location])
  function level() {
    let content = [];
    for (let i = 1; i <= 10; i++) {

      if (i <= prelevel) {
        content.push(<> <div key={i} style={{ background: " rgba(26, 255, 0, 0.45)" }} onClick={() => { handle(i) }} className="levelButton"> {i}</div>
        </>
        )
      }
      else {
        content.push(
          <> <div key={i} /*style={{animation:`animate-${(Math.floor(Math.random() * 2))+1} 1.1s both `}}*/ onClick={() => {
            handle(i)
          }} className="levelButton"> {i}</div>
          </>
        )
      }
    }
    return content;
  }
  function handle(i) {
    // let last=finish[finish.length-1];
    // if(last!=i-1){
    //   return;
    // }
    if (i > { level } + 1) {
      return;
    } else {
      console.log(i);
      n = i;
      generate(n + 1);
      console.log("level ", n, " ", arr);
      navigate("/game", { state: { n: (n + 1), arr, attempts: 3 } });
    }
  }

  function generate(n) {
    console.log("inside ", n);
    for (let i = 0; i < (n * n); i++) {
      arr.push(Math.floor(Math.random() * 10) + 1);
    }
    console.log("inside ", arr);
  }
  return (
    <>

      <div className="levelCont">
        <>
          <div onClick={() => {
            localStorage.setItem("Minwayemail", "");
            localStorage.setItem("Minwaytoken", "");
            console.log("Logout");
            navigate("/");
          }} className="profiledropdown">

          </div>
        </>
        {level()}
        <button onClick={() => { navigate("/multiplayer", { state: { name: username } }) }}>Multiplayer</button>
      </div>
    </>
  )



}
