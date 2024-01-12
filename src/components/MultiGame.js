import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

export default React.memo(function MultiGame(props) {
  // const locate=useLocation();
  const n = 7;
  const arr = props.arr;
  const players = props.players;
  const stompclient = props.stompclient;

  const [path, setPath] = useState([0]);
  const [pres, setpres] = useState(0);
  const [prev, setprev] = useState(-1);
  const [score, setScore] = useState(0);
  const [OtherPath, setOtherPath] = useState([0]);
  const [otherPres, setOtherPres] = useState(0);
  console.log("players ;", players);
  console.log("stomp : ", stompclient);

  const onReceingPath = (payload) => {
    console.log("Received : ", payload.body);
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    setOtherPath(pre => pre = payloadData.path);
    setOtherPres(pre => pre = payloadData.pres);
  }
  useEffect(() => {
    setTimeout(()=>stompclient.subscribe("/user/" + players.player1 + "/receiveotherpath", onReceingPath),500);
  }, [players])


  useEffect(() => {
    stompclient.send("/app/sendMyPath", {}, JSON.stringify({
      player1: players.player1,
      player2: players.player2,
      path: path,
      pres: pres
    }))
  }, [path, prev, pres]);
  const change = useMemo(() => {
    setPath([0]);
    setpres(0);
    setScore(0);
    setprev(-1);
    setOtherPath([0]);
    setOtherPres(0);
  }, [arr]);

  const FinalScore = useMemo(() => {
    console.log("Usememo");
    const duparr = [];
    for (let i = 0; i < n; i++) {
      duparr[i] = [];
      for (let j = 0; j < n; j++) {
        duparr[i][j] = arr[((i * n) + j)];
      }
    }
    return minpath(duparr, n)
  }, [arr, n]);
  function minpath(arr, n) {
    console.log("INside");
    let mi = n;
    let ni = n;
    const dp = Array.from(Array(mi), () => new Array(ni).fill(0));
    console.log(mi, "  ", ni);
    console.log(arr);
    for (let i = mi - 1; i >= 0; i--) {
      for (let j = ni - 1; j >= 0; j--) {
        if (i == mi - 1 && j == ni - 1) {
          dp[i][j] = arr[i][j];
        }
        else {
          let r = 1e8, d = 1e8;
          if (i + 1 < mi) {
            r = arr[i][j] + dp[i + 1][j];
          }
          if (j + 1 < ni) {
            d = arr[i][j] + dp[i][j + 1];
          }
          dp[i][j] = Math.min(r, d);
        }
      }
    }
    console.log(dp[0][0]);
    return dp[0][0];
  }
  return (
    <div>
      <div className="board">
        {boardcreater(n)}
      </div>
    </div>
  )
  function boardcreater(n) {
    let content = [];
    for (let i = 0; i < n; i++) {

      content.push(
        <>
          <div key={i} className="rowboxes">
            {rowcreater(n, i)}
          </div>
        </>
      );
    }
    return content;
  }
  function rowcreater(n, pres) {
    let content = [];
    for (let i = 0; i < n; i++) {
      content.push(
        <>
          {button((pres * n + i))}

        </>
      )
    }
    return content;
  }
  function button(idx) {
    if (idx == pres) {
      return <> <div key={idx} onClick={() => handleClick(idx)} className="boxes presentButton">
      </div>
      </>
    }
    if (idx == otherPres) {
      return <> <div key={idx} onClick={() => handleClick(idx)} className="boxes presentButton">
      </div>
      </>
    }
    const che = path.includes(idx);
    if (che) {
      return <> <div key={idx + arr[idx]} style={{ backgroundColor: "Green" }} onClick={() => handleClick(idx)} className="boxes">
        {arr[idx]}
      </div>
      </>
    }

    const otheche = OtherPath.includes(idx);
    if (otheche) {
      return <> <div key={idx + arr[idx]} style={{ backgroundColor: "red" }} onClick={() => handleClick(idx)} className="boxes">
        {arr[idx]}
      </div>
      </>
    }
    else {
      return <>
        <div key={idx} onClick={() => handleClick(idx)} className="boxes"> {arr[idx]}</div>
      </>
    }
  }
  function handleClick(idx) {
    console.log(idx);

    if (idx === prev) {
      setPath(path.filter((e) => e !== pres));
      let last = path[path.length - 3];
      setScore(prev => prev - arr[pres]);
      setpres(prev);
      setprev(last);
      return;
    }
    else if (idx != pres && path.includes(idx)) {
      console.log("Invalid");
    }
    else if (idx == 0 || ((idx % n != 0 && idx == pres + 1) || idx == pres + n)) {

      setPath([...path, idx]);
      setprev(pres);
      setpres(idx);
      setScore(prev => prev + arr[idx]);
      if (idx == ((n * n) - 1)) {
        console.log(score, "--", FinalScore);
        if (score + arr[idx] == FinalScore) {
          console.log("Success");
        }
      }
    }
    else {
      console.log("invalid");
    }
  }
}
);

