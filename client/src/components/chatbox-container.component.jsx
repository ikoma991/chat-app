import { useState,useEffect } from 'react';
import { useContext } from 'react';

import { useParams } from 'react-router-dom';

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
    useEffect(()=>{
        //api call to receive current conversation message list as well as user/conversation name
        setMessageList([
            {id:1,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:2},
            {id:2,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:1},
            {id:3,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:2},
            {id:4,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:1},
            {id:5,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:1},
            {id:6,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:1},
            {id:7,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:2},
            {id:8,message:'sfaasfasfas',imgUrl:'',date:new Date().toDateString(),userId:2},
        ])
    },[])


    const onMessageSend = e => {
        e.preventDefault();
        const messageFiltered =message.trim();
        if(messageFiltered !== '') {
            //api call to send message
            console.log(messageFiltered);
            setMessageList([...messageList,{id:(messageList[messageList.length-1].id+1),message:messageFiltered,imgUrl:'',date:new Date().toDateString(),userId: userContext.user.id }])
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
              <Typography variant="h6" sx={{marginLeft:'1em'}}>NAME</Typography>
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