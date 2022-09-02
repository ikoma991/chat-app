import { useState,useEffect } from 'react';

import { useParams } from 'react-router-dom';

import fetchAxios from '../utilities/fetch';

import {Grid, Container, Avatar, Typography,Box,TextField,IconButton,InputAdornment} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import MessageDisplay from './message-display.component';

import UserContext from '../context/userContext';
import { useContext } from 'react';

const ChatBoxContainer = ({socket}) => {
    //Receiver's info
    //Actual Chatbox
    //Message area to

    const {id} = useParams();
    const [conversationName,setConversationName] = useState('');
    const [messageList,setMessageList] = useState([]); 
    const [message,setMessage] = useState('');
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const userContext = useContext(UserContext);
    useEffect(()=>{
    if (typeof socket !== "undefined") {
      if (socket.connected === true) {
         socket.on("getMessage", (data) => {
                setArrivalMessage({
                    id:data.id,
                    userId: data.senderId,
                    message: data.message,
                    date: data.date,
                    imgUrl:data.imgUrl
                });
                });
      }
    }
    },[socket])
    useEffect(() => {
        arrivalMessage &&
        setMessageList((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage,setMessageList]);

    useEffect(()=>{
        const getConversationMessages = async (conversationId) => {
        if(conversationId == null) {
            return;
        }
        const resConvoName = await fetchAxios.post('/getConversationName', {conversationId});
        const conversationNameData = resConvoName.data.conversationName;
        setConversationName(conversationNameData);
        const res = await fetchAxios.get(`/getMessages/${conversationId}`);
        const data = res.data.organizedData;
        if(data.messagesList.length !== 0) {
            setMessageList(data.messagesList);
        }else {
            setMessageList([]);
        }
    }     
        getConversationMessages(id);
    },[id,setMessageList])

    
    const handleMessageField = e => {
        setMessage(e.target.value);
    }
    const handleMessageEnter = e => {
        if(e.key === 'Enter'){
            onMessageSend(e);
            e.preventDefault();
        }
    }

    const onMessageSend = async e => {
        e.preventDefault();
        const messageFiltered =message.trim();
        if(messageFiltered !== '') {
            const userId = userContext.user.id;
            //api call to send message
            const response = await fetchAxios.post('/sendMessage',{conversationId:id,message:messageFiltered,userId});
            if(response){
                const messageId = response.data.id;
                const {message,imageUrl,date,userId} = response.data;
                socket.emit("sendMessage", {
                    id:messageId,
                    senderId: userId,
                    receiverId: response.data.members[0],
                    message,
                    imgUrl:imageUrl,
                    date:date
                });

                setMessageList([...messageList,{id:messageId,message:message,imgUrl:imageUrl,date:date,userId}]);
            }
            setMessage('');
        }
        
    }

    return(
        id === undefined ? (<div></div>) : (
        <Grid item xs={9} >
            <Container  sx={{display:'flex',paddingTop:'1.5em',paddingBottom:'1.5em'}} >
              <Avatar src='' alt="Profile Picture" />
              <Typography variant="h6" sx={{marginLeft:'1em'}}>{conversationName}</Typography>
            </Container>

            <MessageDisplay messageList ={messageList ? messageList : []} />

            <Container sx={{marginLeft:'.5em',marginTop:'.8em'}} maxWidth='md'>
                <Box component='form' noValidate onSubmit={onMessageSend}>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    multiline
                    value = {message}
                    rows={3}
                    onKeyDown={handleMessageEnter}
                    onChange={handleMessageField}
                    InputProps={{
                    endAdornment:
                    <InputAdornment position = 'end'>
                        <IconButton aria-label="Send Message" type='submit'>
                            <SendIcon color='primary' />
                        </IconButton>
                    </InputAdornment>
                    
                    }}
                />

                </Box>
            </Container>


        </Grid>
        )
    )
}

export default ChatBoxContainer;