import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProfileDropdown(props) {
    const navigate=useNavigate();
   
  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle style={{
        backgroundColor:"red",
        borderRadius:"100%",
        }} variant="success" id="dropdown-basic">
      user
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{navigate("/levelshow")}} >
          level show
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>
  )
}
