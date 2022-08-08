import fetchAxios from "../utilities/fetch";
import { useEffect, useState } from "react";

import { Search } from "@mui/icons-material";
import { Container, Grid,TextField,IconButton,InputAdornment,Typography,Box } from "@mui/material";
import ConversationList from "./conversation-list.component";



import UserContext from "../context/userContext";
import { useContext } from "react";

const ConversationContainer = () => {
    const userContext = useContext(UserContext);
    const user = userContext.user;
    //Actual conversations
    const [searchName,setSearchName] = useState("");
    const [conversations,setConversations] = useState([]);
    const [filteredConvo,setFilteredConvo] = useState([]);

    const handleSeachField = (e) => {
        if(conversations.length !== 0) {
            setSearchName(e.target.value);
            setSearchName((state)=> {
                const filteredConversations = conversations.filter(con => con.name.toLowerCase().includes(state.toLowerCase()) );
                setFilteredConvo(filteredConversations);
                return state
            });
        }
    }
        const getConversations = async (usr) => {
            const id = usr.id;
            const conversationData = await fetchAxios.post("/getConversations",{userId:id});
            const allConversations = conversationData.data.conversations;
            const orderedConversationData = allConversations.map(conv => ({id:conv.id,name:conv.name,message:conv.lastMessage,img:conv.imageUrl,unread:conv.unreadCount}) )
            setConversations(orderedConversationData);
        }
    useEffect(() => {
        getConversations(user);
    }, [user,conversations])
    


    return (
        <Grid item xs={3} 
            >
            <Container sx={{mt:3}} >
                <Typography variant="h6">CONVERSATIONS</Typography>
                 {/* search box */}
                <div>
                    <TextField margin="dense" id="standard-basic" label="Search" variant="standard"
                    onChange= {handleSeachField}
                    value={searchName}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="search">
                                <Search/>
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    />
                </div>
                <Box sx={{ 
                    maxHeight:'100vh',
                    overflow:'auto',
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius:'10px',
                        backgroundColor: 'rgba(0,0,0,.1)',
                    }
            }}
            >
                    <ConversationList conversations={ filteredConvo.length === 0  ? conversations : filteredConvo  }/>
                </Box>

            </Container>
        </Grid>
    );
}

export default ConversationContainer;