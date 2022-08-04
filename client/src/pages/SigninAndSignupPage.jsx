import { Container, Grid } from "@mui/material";

import SignInContainer from "../components/signin-container.component";
import SignUpContainer from "../components/signup-container.component";

const SigninAndSignupPage = () => {
    return (
        <Container>
            <Grid container spacing={3} sx={{justifyContent:'center'}}>
                <SignUpContainer/>
                <SignInContainer/>
            </Grid>
        </Container>
    );
}

export default SigninAndSignupPage;