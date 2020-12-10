import React from 'react';
import { Switch, Typography, Button, AppBar, Toolbar, IconButton, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const Home = () => {
    const [darkMode, setDarkMode] = useState(true);
    const lightTheme = createMuiTheme({
        palette: {
            type: "light",
        },
    });
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
        },
    });
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Paper style={{ height: "100vh" }} square={true} spacing={0}>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">
                                CET
                </Typography>
                            <Button color="inherit">Login</Button>
                            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                        </Toolbar>
                    </AppBar>
                    <Typography variant="h2" component="h1">CET</Typography>
                </div>
            </Paper>
        </ThemeProvider >
    );
}

export default Home;