import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderLayout from './HeaderLayout';
import SiderbarLayout from './SiderbarLayout';
import MainContentContainer from './MainContentsContainer';
import { BrowserRouter as Router} from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

function MainPage() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <HeaderLayout open={handleDrawerOpen} drawerWidth={drawerWidth} isOpen={open}></HeaderLayout>
                <SiderbarLayout close={handleDrawerClose} drawerWidth={drawerWidth} isOpen={open}></SiderbarLayout>
                <MainContentContainer></MainContentContainer>
            </div>
        </Router>
    );
}

export default MainPage;
