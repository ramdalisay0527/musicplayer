import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { Speaker } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}));


function Header() {
    const classes = useStyles()
    return (
        <>
        <AppBar color="secondary" position='fixed'>
            <Toolbar>
                <Speaker />
                <Typography className={classes.title} variant="h6" component="h1">
                    Apollo Music Share
                </Typography>
            </Toolbar>

        </AppBar> 
        </>
    )
}

export default Header;