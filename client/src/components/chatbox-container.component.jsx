import { useState,useEffect,useContext } from 'react';

import { useParams } from 'react-router-dom';

import fetchAxios from '../utilities/fetch';

import {Grid, Container, Avatar, Typography,Box,TextField,IconButton,InputAdornment} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import MessageDisplay from './message-display.component';

import UserContext from '../context/userContext';

const ChatBoxContainer = () => {
    //Receiver's info
    //Actual Chatbox
    //Message area to
    const {id} = useParams();
    const userContext = useContext(UserContext);
    const [messageList,setMessageList] = useState([]); 
    const [message,setMessage] = useState('');
    const [conversationName,setConversationName] = useState('');
    const getConversationMessages = async (conversationId,userId) => {
        if(conversationId == null) {
            return;
        }
        const resConvoName = await fetchAxios.post('/getConversationName', {conversationId,userId});
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

    useEffect(()=>{
        getConversationMessages(id,userContext.user.id);
    },[id,userContext.user.id])


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
                setMessageList([...messageList,{id:messageId,message:message,imgUrl:imageUrl,date:date,userId}]);
            }
            setMessage('');
        }
        
    }
    const handleMessageField = e => {
        setMessage(e.target.value);
    }
    const handleMessageEnter = e => {
        if(e.key === 'Enter'){
            onMessageSend(e);
            e.preventDefault();
        }
    }
    return(
        id === undefined ? (<div></div>) : (
        <Grid item xs={9} >
            <Container  sx={{display:'flex',paddingTop:'1.5em',paddingBottom:'1.5em'}} >
              <Avatar src='' alt="Profile Picture" />
              <Typography variant="h6" sx={{marginLeft:'1em'}}>{conversationName}</Typography>
            </Container>

            <MessageDisplay messageList ={messageList} />

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