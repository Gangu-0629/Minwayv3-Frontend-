import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { over } from 'stompjs';
import * as sockjs from 'sockjs-client';

var stompclient = null;
export default function Notifymultiplayer() {
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
  }, [locate]);
  const onConnected = () => 
  {
    stompclient.subscribe("/user/"+notify.sender+"/notification",onReceivingNotification);
    stompclient.subscribe("/user/"+notify.sender+"/acceptance",onReceivingAcceptance);
  }
  const onReceivingNotification=(payload)=>
  {
    let payloaddata=JSON.parse(payload.body);
    setReceiver(prev=>prev=payloaddata.sender);
    setNotification(true);
    setWaiting(false);
    setAccept(false);
  }
  const onReceivingAcceptance=(payload)=>
  {
    let payloadata=JSON.parse(payload.body);
     setPlayers({...players,"player2":payloadata.sender});
     setNotification(false);
     setAccept(true);
     setWaiting(false);
  }
  const onError = (err) => {
    console.log(err);
  }

  const handleSendNotification=()=>
  {
    if(stompclient!=null){
      setNotify({...notify,"receiver":receiver});
      console.log(notify);
      stompclient.send("/app/sendNotifiaction",{},JSON.stringify({
        sender:username,
        receiver:receiver
      }));
      setWaiting(true);
      setReceiver("");
    }
  }
  const handleAccept=()=>
  {
    if(stompclient!=null){
   
      stompclient.send("/app/sendAcceptance",{},JSON.stringify(
        {
          sender:username,
          receiver:receiver
        }
      ));
      setPlayers({
        player1:username,
        player2:receiver
      })
      setWaiting(false);
      setAccept(true);
         setReceiver("");
      setNotification(false);
    }
  }
  return (
    <>
      <div className="notificationbox">


   <h1>{username}</h1>
        {
          notification && <>
          <h1>Notification from {receiver}</h1>
          <button onClick={handleAccept}>Accept</button>
          </>
        }
        {
          accept && <><h1>{JSON.stringify(players)}</h1></>
        }
        {
          waiting && <><h1>Send the request waiting for acceptance</h1></>
        }
        {
          notification == false && accept == false && waiting == false &&
          <>
            <input onChange={(e)=>{
              setReceiver(e.target.value);
            }} value={receiver} placeholder="Enter the player" type="text" />
            <button onClick={handleSendNotification} >send request</button>
          </>
        }
      </div>
    </>

  )
}
