import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup_in() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  console.log("Signin rendered");
  return (
    <>
      <div className="signincont">
        <div className="logincont">
         <div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input onChange={(e)=>setEmail(e.target.vale)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input style={{width:"100%"}} onChange={(e)=>setPassword(e.target.value)}type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button onClick={()=>{navigate("register")}} type="button" className="btn btn-dark">Register</button>
            </div>
            </div>
        </div>
        <div className="picont"></div>

      </div>
    </>
  )
}
