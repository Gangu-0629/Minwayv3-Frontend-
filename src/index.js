import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Gameboard from './components/Gameboard';
import Home from './components/Home';
import Signup_in from './components/Signup_in';
import Register from './components/Register';
import Levelshower from './components/Levelshower';
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Signup_in />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "levelshow",
        element: <Levelshower />
      }
      ,
      {
        path: "game",
        element: <Gameboard />
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
