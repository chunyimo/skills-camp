import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography'
import DraftsIcon from '@material-ui/icons/Drafts';
import DragSvg from '../assets/icons/drag.svg';
import MakeIcon from '../components/utlis/MakeIcon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none',
    },
    drawer: props => ({
        width: props.drawerWidth,
       
    }),
    drawerOpen: props => ({
        width: props.drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    closeIcon: {
        marginLeft: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    linkList: {
        width: '100%',
    },
    link: {
        textDecoration: 'none',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
        
    },
}))

function SiderbarLayout(props) { 
    const classes = useStyles(props);
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    function handleListItemClick(event, index) {
      setSelectedIndex(index);
    }
    return (
            <Drawer
                variant="permanent"
                className={clsx( {
                    [classes.drawerOpen]: props.isOpen,
                    [classes.drawerClose]: !props.isOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: props.isOpen,
                        [classes.drawerClose]: !props.isOpen,
                    }),
                }}
                open={props.isOpen}
            >
                <div className={classes.toolbar}>
                    <Typography  variant="h6" noWrap>
                                USB HOME
                    </Typography>
                    <IconButton onClick={props.close} className={classes.closeIcon} >
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Skills</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List component="nav" className={classes.linkList}>
                            <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={event => handleListItemClick(event, 0)}
                            >
                                <Link
                                    to='/reactdnd' 
                                    className={classes.link} 
                                >
                                    <ListItemIcon><MakeIcon picture={DragSvg}></MakeIcon></ListItemIcon>
                                    <Typography variant='h7' component='span' className={classes.linkName} >DND</Typography>
                                </Link>
                            </ListItem>
                            <ListItem
                            button
                            selected={selectedIndex === 1}
                            onClick={event => handleListItemClick(event, 1)}
                            >
                                
                                <Link 
                                to='/d3main'
                                className={classes.link}
                                >
                                    <ListItemIcon><MakeIcon picture={DragSvg}></MakeIcon></ListItemIcon>
                                    D3
                                </Link>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
            </Drawer>    
    
        
    )
}

SiderbarLayout.propTypes = {
    close: PropTypes.func.isRequired,
    drawerWidth: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired
}
export default SiderbarLayout;