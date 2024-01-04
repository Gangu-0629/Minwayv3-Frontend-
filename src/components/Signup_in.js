import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../Services/Api';

export default function Signup_in() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

        console.log(rep);
        navigate("/levelshow");
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
  async function Signin() {
    const data = {
      email: email,
      password: password
    }
    try {
      const rep = await Api.post("/auth/Userlogin", data).then((rep) => {
        console.log(rep);
        return rep.data
      }).then((rep) => {
        console.log(rep);
        localStorage.setItem("Minwaytoken", rep.token);
        localStorage.setItem("Minwayemail", rep.email);
      });
      console.log(rep);
      navigate("/levelshow");
    }
    catch (Error) {
      console.log("Error");
      console.log(Error);
      navigate("/");
    }
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className="signincont">
        <div className="logincont">
          <div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input style={{ width: "100%" }} onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" id="exampleInputPassword1" />
            </div>
            <p style={{ textAlign: "right" }}>   <Link to={"/changePassword"} style={{ color: "red" }}>forgotPassword</Link></p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => { Signin() }} type="submit" className="btn btn-primary">Submit</button>
              <button onClick={() => { navigate("register") }} type="button" className="btn btn-dark">Register</button>
            </div>
          </div>
        </div>
        <div className="picont"></div>

      </div>
    </>
  )
}
