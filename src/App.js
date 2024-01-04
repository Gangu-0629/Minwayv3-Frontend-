import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import ProfileDropdown from './components/ProfileDropdown';
function App() {
  console.log("Mainrendered");
  const navigate = useNavigate();
  const refer = useRef(null);
  const maincontext = createContext(null);
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, [])
  return (
    <>
      <div className="Maincontainer">
        <Outlet />
      </div>
    </>
  );
}

export default App;
