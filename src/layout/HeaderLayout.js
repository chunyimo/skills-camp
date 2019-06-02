import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, InputBase, Badge,  } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import logo from '../assets/logo/usblogo.svg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'marign'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: props => ({
        marginLeft: props.drawerWidth,
        width: `calc(100% - ${props.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'marign'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }),
    menuButton: {
        marginRight: 36,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, .15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, .25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
    },
    logo: {
        width: '50px',
        height: '50px',
    }
}))

function HeaderLayout(props) {
    const classes = useStyles(props);
    const open = true;
    function handleDrawerOpen() {
        props.open();
        console.log(props)
    }
    function handleProfileMenuOpen(event) {

    }
    return (
        <div className={classes.root}>
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.isOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                          [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <img className={classes.logo} src={logo} alt="logo" />
                    </div>
                    
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.grow}></div>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

HeaderLayout.propTypes = {
    open: PropTypes.func.isRequired,
    drawerWidth: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default HeaderLayout;