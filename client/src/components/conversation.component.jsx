import { useCallback } from 'react';
import {useNavigate,useParams} from 'react-router-dom';

import {Grid,Avatar,Typography,Box,Badge} from '@mui/material';



const Conversation = ({conversation}) => {
    const {id,name,img,message,unread} =conversation;
    const shortenedNameAndMessage = (text,size) => text.length>=size ? text.substr(0,size)+'...' : text ;
    const SHORTENED_LENGTH = 32;
    const navigate = useNavigate();
    const {id:paramId} = useParams();
    const navigateToConversation = useCallback(() => navigate(`/Messages/${id}`, {replace: true}), [navigate,id]);
    const checkActive = () => id === parseInt(paramId) ? ({backgroundColor:'primary.main',color:'common.white'}) : ({}); 
    const activeStyles = checkActive();
    //Contains
    //Name
    //Picture
    //Message
    //If unread then display red badge with number of unread messages
    return (
        <Box sx={{overflow:'hidden',textDecoration:'none','&:last-child':{marginBottom:'2em'} }}  >
            <Grid 
                container
                alignItems="center"
                spacing= {1}
                sx={{...activeStyles, '&:hover':{background:'#79bef6',cursor:'pointer',color:'common.white',transition:'all .3s'},padding:'1em 0.5em'}}
                onClick = {navigateToConversation}
            >
                <Grid item xs={2}>
                    <Avatar src={img} alt="Profile Picture" />
                </Grid>
                <Grid item  xs={10}>

                    <Typography variant="subtitle2" component="h6">{shortenedNameAndMessage(name,SHORTENED_LENGTH)} </Typography>
                    
                    <Badge 
                    badgeContent ={unread}
                    sx={{ 
                    "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "red",
                    right:-13,
                    top:9
                        }
                    }}
                    >
                        <Typography variant="caption" component="p">{shortenedNameAndMessage(message,SHORTENED_LENGTH)}</Typography>
                    </Badge>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Conversation;