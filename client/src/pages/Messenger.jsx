
import {Grid} from '@mui/material/';


import ChatBoxContainer from '../components/chatbox-container.component';


import ConversationContainer from '../components/conversation-container.component';



const Messenger = () => {
    return (
        <Grid container >
            <ConversationContainer/>
            <ChatBoxContainer/>            
        </Grid>
    );
}

export default Messenger;