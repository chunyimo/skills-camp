import React from 'react';
import { BrowserRouter as Routers, Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MainContentRoutes from '../Routes/MainContentRoutes';
const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        width: '24px',
        height: '24px'
    },
}))

function MainContentContainer(props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}></div>
            <MainContentRoutes></MainContentRoutes>
        </main>
    )
}

export default MainContentContainer;