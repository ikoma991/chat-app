import {Stack,Skeleton} from '@mui/material';
import Conversation from './conversation.component';

const ConversationList = ({conversations}) => {
    return (
        <Stack  sx ={{mt:2 }}>
            { conversations.length !== 0 ? (conversations.map(conversation=> <Conversation key={conversation.id} conversation = {conversation}/> )) : <Skeleton variant = "rectangular" width={210} height={490} />}
        </Stack>
    );
}

export default ConversationList;