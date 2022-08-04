import { useContext } from 'react';


import {Box,Avatar,Typography,Container} from '@mui/material';

import UserContext from '../context/userContext';

const Message = ({senderData}) => {
const userContext = useContext(UserContext);
const user = userContext.user;
const {imgUrl, message, userId,date} = senderData;
const stylesMessageBox = user.id !== userId ? {backgroundColor:'primary.main',color:'white'} : {backgroundColor:'#f9f9f9'};
const stylesMessageContainer = user.id !== userId ? {} : {flexDirection:'row-reverse',alignSelf:'flex-end'};
return (
    <Box sx ={{display:'flex',...stylesMessageContainer}}>
        <Avatar src = {imgUrl} alt = 'profile picture'/>
        <Container>
            <Box sx={{...stylesMessageBox,padding:'.6em',borderRadius:'5px',maxWidth:'350px'}}>
                <Typography variant="body2">{message}</Typography>
            </Box>
            <Typography variant="caption" color="initial">
                {date}
            </Typography>
        </Container>
    </Box>
)
}

export default Message;