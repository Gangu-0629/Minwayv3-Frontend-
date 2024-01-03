import logo from './logo.svg';
import './App.css';
import { createContext, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import ProfileDropdown from './components/ProfileDropdown';
function App() {
  console.log("Mainrendered");
  const refer = useRef(null);
  const maincontext = createContext(null); 
  const [user,setUser]=useState(true);
  return (
    <>
  <div className="Maincontainer">
  {
      user && <> 
        <div className="profiledropdown">
          <ProfileDropdown />
        </div>
        </>
    }
        <Outlet />
      </div>
    </>
  );
}

export default App;
