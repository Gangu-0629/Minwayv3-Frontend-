import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export default function Gameboard() {

    const stylepresent={
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 90%",
        backgroundPosition: "center"
    }

  console.log("rendered");
    const location = useLocation();
    const n = location.state.n;
    const arr = location.state.arr;
    const [path, setPath] = useState([0]);
    const [pres, setpres] = useState(0);
    const [prev,setprev]=useState(-1);
    const change = useMemo(() => {
        setPath([0]);
        setpres(0);
    }, arr);
    
    return (
        <>
              <div className="gamecont">
                <div className="board">
                    {boardcreater(n)}
                </div>
                <div><h1>The heading</h1></div>
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
                    {button((pres * n + i))}

                </>
            )
        }
        return content;
    }
    function button(idx) {
        if(idx==pres){
            return <> <div key={idx}  style={{
                backgroundColor:'green'

            }} onClick={() => handleClick(idx)} className="boxes">
             Here
        </div>
        </>
        }
        const che = path.includes(idx);
        if (che) {
            return <> <div key={idx} style={{ backgroundColor: "Green" }} onClick={() => handleClick(idx)} className="boxes">
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
        }
        else {
            console.log("invalid");
        }
    }
}
