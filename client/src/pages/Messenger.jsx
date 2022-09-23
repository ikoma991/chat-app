
import {Grid} from '@mui/material/';


import ChatBoxContainer from '../components/chatbox-container.component';


import ConversationContainer from '../components/conversation-container.component';

import {io} from 'socket.io-client';
// import { useRef } from 'react';
import { useEffect,useContext,useRef } from 'react';


import UserContext from '../context/userContext';

const Messenger = () => {
    const userContext = useContext(UserContext);
    const socketRef = useRef();
    useEffect(()=>{
        socketRef.current = io("ws://localhost:5000");
        
    },[])
    useEffect(()=>{
        socketRef.current.emit("addUser",userContext.user.id);
        socketRef.current.on("getUsers", users=> {
            
        })
    },[userContext.user.id])
    return (
        <Grid container >
            <ConversationContainer/>
            <ChatBoxContainer socket={socketRef.current} />            
        </Grid>
    );
}

export default Messenger;