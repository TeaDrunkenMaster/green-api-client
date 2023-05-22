import React from 'react';
import apiGreen from '../../api/apiGreen'
import styled from 'styled-components'
import {useEffect} from 'react';
import { useRef } from 'react';

function ChatComponent() { 
  



  const [api, setApi] = React.useState(null);
  const idInstanceRef = useRef();
  const apiTokenInstanceRef= useRef();
  const chatIdRef =  useRef();
  const [chatId, setChatId] =  React.useState('');
  const messageRef =  useRef();
  const [showConnectSettings, setShowConnectSettings] = React.useState(true);
  const [enterChat, setEnterChat] = React.useState(false);
  const chatPanelRef =  useRef();
  const [chatMessages, UpdateChatMessages] = React.useState([]);



  useEffect(()=> {

    const interval = setInterval(() => {
      //TODO: chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight
       if (enterChat && api!=null)
       {
         
          const getMessage=async()=>{
          const message=await api.ReceiveMessage();
          if (message!=null && message.body!=null){
            if (message.body.senderData.chatId.replace('@c.us','')===chatId)
            {
             
              api.DeleteMessage(message.receiptId);
              if (message.body.messageData.textMessageData!=null)
              {
                if (!chatMessages.some(x=>x.id===message.body.idMessage))
                { 
                  let date=new Date(message.body.timestamp);
                  let time=' ('+date.getHours().toString().padStart(2, '0')+':'+date.getMinutes().toString().padStart(2, '0')+')';
                  UpdateChatMessages(messages=> [...messages,{id:message.messageId, messageAuthor: message.body.senderData.senderName,direction:'notmy',message:message.body.messageData.textMessageData.textMessage + time}]);}
                }
              else
              {
                if (!chatMessages.some(x=>x.id===message.body.idMessage))
                {
                let now = new Date();
                let time=' ('+now.getHours().toString().padStart(2, '0')+':'+now.getMinutes().toString().padStart(2, '0')+')';
                UpdateChatMessages(messages=> [...messages,{id:message.messageId, messageAuthor: 'Вы', direction:'my', message:messageRef.current.value+time}]);
                }
              }
             
            }
          }
        }
         
        getMessage();   
       }
  
  
    }, 3000);
    return () => clearInterval(interval);
  }, [enterChat, api]);

function btnConnect_Click(){  
  setApi(new apiGreen({idInstance:idInstanceRef.current.value, apiTokenInstance:apiTokenInstanceRef.current.value}));
  setShowConnectSettings(false);
}

function btnEnterChat_Click(){  
  setChatId(chatIdRef.current.value)
  setEnterChat(true);
}
 
function btnSend_Click()
{
  
  const sendMessage=async()=>{
      const request={chatId:chatId+'@c.us',message:messageRef.current.value}; 
     const sendMessage=await api.SendMessage(request);
     }
  sendMessage();
}


const FullWindow = styled.div`
  padding:50px;
  width:500px;
`;

const ChatPanel = styled.div`
  text-align: bottom;
  content-align:bottom;
  height:500px;
  border:1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MyMessage=styled.div`
display:inling-block;
   width:100%;
   text-align:right;
`;

const ForeignMessage=styled.div`
display:inling-block;
padding-left:5px;
width:100%;
text-align:left;
`;

const ButtonsPanel = styled.div`
 display:inling-block; 
  padding-right:5px;
  text-align:right;
  padding 10px;
`;



return (
  <FullWindow>  
      <div>Phone Number: {chatId}</div>
      <ChatPanel name="chatPanel" ref={chatPanelRef}>
         {chatMessages.map(((msg,i)=>(msg.direction==='my')?<MyMessage>{msg.messageAuthor}: {msg.message}<br/></MyMessage>: <ForeignMessage>{msg.messageAuthor}: {msg.message}<br/></ForeignMessage>))}
      </ChatPanel>
      <ButtonsPanel>
      {showConnectSettings && 
       <>
       <input type="text" ref={idInstanceRef}  name="idInstance" placeholder='IdInstance' defaultValue='' /><br/>  
       <input type="text" ref={apiTokenInstanceRef} placeholder='ApiTokenInstance' defaultValue=''/><br/>
       <button name="btnConnect" onClick={btnConnect_Click}>Connect</button>
       </>
       }               
       {!showConnectSettings && !enterChat &&
       <>
       <input type="text" ref={chatIdRef} name="chatId" placeholder='Phone Number' defaultValue=''></input><br/>
       <button name="btnEnterChat" onClick={btnEnterChat_Click}>Enter chat</button>
       </>}
       {!showConnectSettings && enterChat &&
       <>
       <input type="text" ref={messageRef} name="message" placeholder='Message'></input><br/>
       <button name="btnSend" onClick={btnSend_Click}>Send</button>
       </>}
       </ButtonsPanel>
  </FullWindow>
);
}


export default ChatComponent;
