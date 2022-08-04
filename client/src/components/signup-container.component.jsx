import { useContext, useState } from 'react';

import {Box, Button, Container, Grid, Stack, TextField, Typography} from '@mui/material';

import fetchAxios from '../utilities/fetch';

import UserContext from '../context/userContext';

const SignUpContainer = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const userContext = useContext(UserContext);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    const checkEmpty = val => (val === "");
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if( !checkEmpty(name) && !checkEmpty(email) && !checkEmpty(password) && !checkEmpty(confirmPassword) && confirmPassword === password) {
            const data = {name,email,password}
            const register = await fetchAxios.post('/register',data);
            if(register.data){
                userContext.updateUser(register.data);
                localStorage.setItem('API_TOKEN',register.data.token);
            }
            
        }
    }

    return (
        <Grid item xs={4}>
            <Container sx={{marginTop:'2.5em'}}>
                <Typography variant="h5" sx={{marginBottom:'1em'}}> Create an account</Typography>
                <Box component='form' onSubmit={handleFormSubmit}>
                    <Stack spacing={2}>
                        <TextField
                        required
                        error = { name===""}
                        helperText = {name === "" ? "Name is Required!" : "" }
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        />
                        <TextField
                        required
                        error = { email==="" }
                        helperText = {email === "" ? "Email is Required!" : "" }
                        type='email'
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        />
                        <TextField
                        required
                        error = { (password==="") || (password?.length < 5 ? true:false) }
                        helperText = {(password === "" ? "Password is Required!" : "") || (password?.length < 5 ? "Password must be atleast 5 characters long! ":"") }
                        type='password'
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        inputProps={{minLength:5}}
                        />
                        <TextField
                        required
                        error = {confirmPassword !== password ? true : false    }
                        helperText = { confirmPassword !== password ? "Passwords must match!" : "" }
                        type='password'
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        inputProps={{minLength:5}}
                        />
                        <Button variant="contained" color='primary' type='submit'>SIGNUP</Button>
                    </Stack>
                </Box>
            </Container>
        </Grid>
    )
}

export default SignUpContainer