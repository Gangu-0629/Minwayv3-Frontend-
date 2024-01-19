import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router';
import { over } from 'stompjs';
import * as sockjs from 'sockjs-client';
import MultiGame from './MultiGame';

var stompclient = null;
export default function Notifymultiplayer() {
  const n = 2;
  let arr = [];
  const [forward, setForward] = useState([]);
  const navigate = useNavigate();
  const locate = useLocation();
  const username = locate.state.name;
  const [waiting, setWaiting] = useState(false);
  const [notification, setNotification] = useState(false);
  const [accept, setAccept] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [notify, setNotify] = useState({
    sender: username,
    receiver: ""
  })
  const [players, setPlayers] = useState({
    player1: username,
    player2: ""
  })
  useEffect(() => {
    let sock = new sockjs("http://localhost:8081/ws");
    stompclient = over(sock);
    stompclient.connect({}, onConnected, onError);
  }, [username]);
  const onConnected = () => {

    setTimeout(() => stompclient.subscribe("/user/" + notify.sender + "/notification", onReceivingNotification), 500);
    setTimeout(() => stompclient.subscribe("/user/" + notify.sender + "/acceptance", onReceivingAcceptance), 500);
  }
  const onReceivingNotification = (payload) => {
    let payloaddata = JSON.parse(payload.body);
    setReceiver(prev => prev = payloaddata.sender);
    setNotification(true);
    setWaiting(false);
    setAccept(false);
  }
  const onReceivingAcceptance = (payload) => {
    let payloadata = JSON.parse(payload.body);
    setPlayers({ ...players, "player2": payloadata.sender });
    setForward(prev => prev = payloadata.arr);
    console.log("accepatance ", arr);
    setAccept(true);
    setNotification(false);

    setWaiting(false);
    console.log("accepted");

  }
  const onError = (err) => {
    console.log(err);
  }

  const handleSendNotification = () => {
    if (stompclient != null) {
      setNotify({ ...notify, "receiver": receiver });
      console.log(notify);
      stompclient.send("/app/sendNotifiaction", {}, JSON.stringify({
        sender: username,
        receiver: receiver
      }));
      setWaiting(true);
      setReceiver("");
    }
  }
  const handleAccept = () => {
    if (stompclient != null) {
      generate(n);
      setForward(prev => prev = arr);
      stompclient.send("/app/sendAcceptance", {}, JSON.stringify(
        {
          sender: username,
          receiver: receiver,
          arr: arr
        }
      ));
      setPlayers({
        player1: username,
        player2: receiver
      })
      setWaiting(false);
      setAccept(true);
      setReceiver("");
      setNotification(false);
      console.log("acceptance", arr);
      console.log("Accepted");
    }
  }

  function generate(n) {
    console.log("inside ", n);
    for (let i = 0; i < (n * n); i++) {
      arr.push(Math.floor(Math.random() * 10) + 1);
    }
    console.log("inside ", arr);
  }

  return (
    <>
      <div className="notificationbox">

        {
          notification && <>
            <div className="acceptdiv">
              <h1> Notification from {receiver}</h1>
              <button onClick={handleAccept}>Accept</button>
            </div>
          </>
        }
        {
          accept && <>
            {console.log("arr ", arr)}
            <MultiGame players={players} n={n} stompclient={stompclient} arr={forward} /> </>
        }
        {
          waiting && <><h1 className="WaitingStage">Send the request waiting for acceptance....</h1></>
        }
        {
          notification == false && accept == false && waiting == false &&
          <>
            <div className="NotifyRequestcon">
              <input className="requestnameinput" onChange={(e) => {
                setReceiver(e.target.value);
              }} value={receiver} placeholder="Enter the player" type="text" />
              <button className="SendNotifyButton" onClick={handleSendNotification} >send request</button>
            </div>
          </>
        }

      </div>
    </>

  )
}
