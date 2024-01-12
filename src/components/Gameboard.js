import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Api from '../Services/Api';

export default function Gameboard() {


    const location = useLocation();
    const n = location.state.n;
    const arr = location.state.arr;
    const [attempt, setAttempt] = useState(location.state.attempts);
    const navigate = useNavigate();
    arr[0] = 0;
    const [path, setPath] = useState([0]);
    const [pres, setpres] = useState(0);
    const [prev, setprev] = useState(-1);
    const [score, setScore] = useState(0);
    const change = useMemo(() => {
        setPath([0]);
        setpres(0);
        setScore(0);
    }, [arr, attempt]);
    console.log("score ", score);
 
    async function handleUpdatelevel(){
        const data = {
            email: localStorage.getItem("Minwayemail")
          }
        try{
            const rep=await Api.post("/info/adddata",data, {
                headers: {
                  "Accept": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("Minwaytoken")}`,
                  "Content-Type": "application/json"
                }
              }).then(res=>res.data).then(res=>{
                console.log("res  ",res);
              })
        }
        catch(err){
            navigate("/");
        }
    }
    async function handledecreaselevel(){
        const data = {
            email: localStorage.getItem("Minwayemail")
          }
        try{
            const rep=await Api.post("/info/decreasedata",data, {
                headers: {
                  "Accept": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("Minwaytoken")}`,
                  "Content-Type": "application/json"
                }
              }).then(res=>res.data).then(res=>{
                console.log(res);
              
              })
        }
        catch(err){
            navigate("/");
        }
    }

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
        <>
            {console.log("final ", FinalScore)}


            <div className="gamecont">
                <div onClick={() => {

                    navigate("/levelshow");
                }} className="backStyle"> </div>
                <div className="board">
                    {boardcreater(n)}
                </div>

                <div className="scorecard">

                    {score}
                </div>

            </div>
        </>
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
                    {  button((pres * n + i))}

                </>
            )
        }
        return content;
    }
    function button(idx) {
        if (idx == pres) {
            return <> <div key={idx}  onClick={() => handleClick(idx)} className="boxes presentButton">
            </div>
            </>
        }
        const che = path.includes(idx);
        if (che) {
            return <> <div key={idx+arr[idx]} style={{ backgroundColor: "Green" }} onClick={() => handleClick(idx)} className="boxes">
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
                    handleUpdatelevel();
                    navigate("/levelshow");
                }
                else {

                    console.log("Failure attempt : ", attempt);
                    if (attempt == 1) {
                        console.log("Attempt over");
                        handledecreaselevel().then(()=> navigate("/levelshow"));
                       
                    }
                    else {
                        setAttempt((prev) => prev - 1);
                    }
                }
            }
        }
        else {
            console.log("invalid");
        }
    }
}
