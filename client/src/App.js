
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {useState} from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {blue} from '@mui/material/colors';

import UserContext from "./context/userContext";

import Messenger from './pages/Messenger';
import Profile from "./pages/Profile";
import SigninAndSignupPage from "./pages/SigninAndSignupPage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./utilities/protectectRoute";

import Navbar from "./components/navbar.component";

import './App.css';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  const [user,setUser] = useState({});
  const updateUser = (userData) => {
    setUser(userData);
  }
  
  return (

    <div>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value = {{user,updateUser}}>
          <Navbar/>
          <Routes>
         
            <Route path = '/messages' element= {
            <ProtectedRoute user={user}>
              <Messenger/>
            </ProtectedRoute>
            } />
            <Route path = '/messages/:id' element= {
            <ProtectedRoute user={user}>
             <Messenger/>
            </ProtectedRoute>
            
            } />
            <Route path = '/profile' element = {
            <ProtectedRoute user={user}>
              <Profile/>
            </ProtectedRoute>
            
            } />
 
            <Route path = '/signin' element = {
            Object.keys(user).length === 0 ?
            <SigninAndSignupPage/> :
            <Navigate replace to = "/"/>
            
            } />
            <Route path = '/' element={<HomePage/>} />
            <Route path="*" element={<p>PAGE NOT FOUND!: 404!</p>} />
          </Routes>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
