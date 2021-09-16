import { makeStyles } from '@material-ui/core';
import React from 'react';
import HeaderBar from './HeaderBar';
const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    page: { 
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
export default function Layout ({children}){
    const classes = useStyles();
    return (
        <>
            {/*Header AppBar*/}
            <HeaderBar/>

            {/* Drawer For Cart and WishList */}

            {/* Children content goes here */}
            <div className={classes.page}>
                <div className={classes.toolbar}>{children}</div>
            </div>
        </>
    );
}