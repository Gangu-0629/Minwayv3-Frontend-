import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Api from '../Services/Api';

export default function Levelshower() {
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
        setLevel(rep.level);
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
  useEffect(() => { Getuser() }, [])
  function level() {
    let content = [];
    for (let i = 1; i <= 10; i++) {

      if (i <= prelevel) {
        content.push(<> <div style={{ background: " rgba(26, 255, 0, 0.45)" }} onClick={() => { handle(i) }} className="levelButton"> {i}</div>
        </>
        )
      }
      else {
        content.push(
          <> <div /*style={{animation:`animate-${(Math.floor(Math.random() * 2))+1} 1.1s both `}}*/ onClick={() => {
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
    console.log(i);
    n = i;
    generate(n + 1);
    console.log("level ", n, " ", arr);
    navigate("/game", { state: { n: (n + 1), arr, attempts: 3 } });
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
      {
        <>
          <div className="profiledropdown">
            <button type="button" style={{ padding: "5px", backgroundColor: "blue", borderRadius: "20%" }} data-toggle="button" onClick={() => {
              localStorage.setItem("Minwayemail", "");
              localStorage.setItem("Minwaytoken", "");
              console.log("Logout");
              navigate("/");
            }} aria-pressed="false" autocomplete="off"> logout </button>
          </div>
        </>
      }
      <div className="levelCont">
        {level()}
      </div>
    </>
  )
}
