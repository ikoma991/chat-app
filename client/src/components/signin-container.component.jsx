import {useState} from 'react';

import {Link as RouterLink} from 'react-router-dom';

import { Grid,Typography,Container,Box,Stack,TextField,Button,Link } from "@mui/material";


import fetchAxios from '../utilities/fetch';


import { useContext } from 'react';
import UserContext from '../context/userContext';

const SignInContainer = () => {
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const userContext = useContext(UserContext);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(password !== "" && email !== ""){
            const login = await fetchAxios.post("/login",{email,password});
            if(login.data) {
                userContext.updateUser(login.data);
                localStorage.setItem('API_TOKEN',login.data.token);
            }
        }

    }

    return (
    <Grid item xs={4}>
        <Container sx={{marginTop:'2.5em'}}>
                <Typography variant="h5" sx={{marginBottom:'1em'}}> Already have an account?</Typography>
                <Box component='form' onSubmit={handleFormSubmit}>
                    <Stack spacing={2}>
                        <TextField
                        required
                        type='email'
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        />
                        <TextField
                        required
                        type='password'
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        inputProps={{minLength:5}}
                        />
                        <Link to = "/forgotpass" component={RouterLink} >Forgot Password? </Link>
                        <Button variant="contained" color='primary' type='submit'>LOGIN</Button>
                    </Stack>
                </Box>
            </Container>
    </Grid>
    )
}

export default SignInContainer;