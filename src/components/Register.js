import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../Services/Api';

export default function Register() {
  const navigate = useNavigate();
  const [username,setUserName]=useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    
  async function registerUser()
  {
    const data={
      name:username,
      email:email,
      password:password,
    }
    try{
      const rep= await Api.post("/auth/register",data).then((res)=>{
        console.log(res);
        return res.data});
      navigate("/");
    } catch(err){
      console.log("Error");
      console.log(err);
        navigate("/register");
    }  
    setEmail("");
    setPassword("");
    setUserName("");
    }
  return (
    <>
      <div className="registercon">
      <div className="picont2"></div>
          <div className="logincont">
            <div>
            <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                <input onChange={(e) => setUserName(e.target.value)} value={username} type="email" className="form-control" id="username1" aria-describedby="emailHelp" />

              </div>
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

              </div>
              <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input style={{ width: "100%" }} onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" id="exampleInputPassword1" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="submit" onClick={()=>{registerUser()}} className="btn btn-primary">Register</button>
                <button onClick={() => { navigate("/") }} type="button" className="btn btn-dark">Login</button>
              </div>
            </div>
          </div>

        </div>
    </>
  )
}
