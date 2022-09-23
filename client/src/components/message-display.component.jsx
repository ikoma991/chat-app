import {useRef,useEffect} from 'react';

import {Container,Stack,Skeleton} from '@mui/material'

import Message from './message.component';

const MessageDisplay = ({messageList}) =>{
const bottomEl = useRef(null);
useEffect(()=> {
bottomEl.current?.scrollIntoView({behavior:'smooth',block:'nearest'})
},[messageList])

return (
    <Container sx ={{padding:'1em',marginLeft:'.5em',height:'60vh',overflow:'auto','&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius:'10px',
                        backgroundColor: 'rgba(0,0,0,.1)',
                    }}} maxWidth='md'>
        <Stack spacing={2}>
            {
                messageList.length !== 0 ?
            (messageList.map(messageData => <Message key = {messageData.id} senderData = {messageData} /> ))
            :
            (<Skeleton variant="rounded" width={800} height={400} />)
            }
            <div ref = {bottomEl}></div>
        </Stack>
    </Container>
)
}

export default MessageDisplay