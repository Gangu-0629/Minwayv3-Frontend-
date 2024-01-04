import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Api from '../Services/Api';

export default function ForgotPassword() {
    const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  async function changePassward(){
    const data={email:email,password:password};
    try{
        const rep=await Api.post("/auth/changePassword",data).then(res=>res.data).then((res)=>{
            console.log(res);
            navigate("/");
        })
    }
    catch( err){
            navigate("/register");
    }

  }
  return (
    <>
    <div className="signincont">
      <div className="logincont">
       <div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter registered Email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input style={{width:"100%"}} onChange={(e)=>setPassword(e.target.value)}type="password" value={password} className="form-control" id="exampleInputPassword1" />
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <button onClick={()=>{changePassward()}} type="submit" className="btn btn-primary">Change passward</button>
          
          </div>
          </div>
      </div>
      <div className="picont"></div>

    </div>
  </>
  )
}
