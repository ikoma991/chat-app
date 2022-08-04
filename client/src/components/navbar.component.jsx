import { useContext, useState } from "react";

import { AppBar, Box, Container, Menu, MenuItem, Toolbar, Typography, Button, Tooltip, IconButton, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';

import UserContext from "../context/userContext";



const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userContext = useContext(UserContext);
  const isAuthenticated = Object.keys(userContext.user).length !== 0;
  const pages = isAuthenticated ? ['Messages', 'Profile'] : ['Signin'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () =>{
    userContext.updateUser({});
    localStorage.removeItem('API_TOKEN');
  }
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to = "/"
            color = "common.white"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' },textDecoration:'none' }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/${page}`} component={RouterLink} underline="none" color="inherit"> {page} </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component ={RouterLink}
                to = {`/${page}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {
            isAuthenticated && 
             (
             <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open User Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="#" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={handleLogOut} textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
          )
          }
         
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;