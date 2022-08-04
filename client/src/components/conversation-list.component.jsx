import {Stack} from '@mui/material';
import Conversation from './conversation.component';

const ConversationList = ({conversations}) => {
    return (
        <Stack  sx ={{mt:2 }}>
            {conversations.map(conversation=> <Conversation key={conversation.id} conversation = {conversation}/> )}
        </Stack>
    );
}

export default ConversationList;