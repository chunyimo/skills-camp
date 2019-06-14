import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography'
import DragSvg from '../assets/icons/drag.svg';
import MakeIcon from '../barracks/utlis/MakeIcon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContextSvg from '../assets/icons/context.svg';
import EmitSvg from '../assets/icons/emit.svg';
import D3Svg from '../assets/icons/d3.svg';
import ReduxSvg from '../assets/icons/redux.svg';
import HookSvg from '../assets/icons/hook.svg';
import ScaleSvg from '../assets/icons/scale.svg';
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
    expansionPanelDetails : {
        padding: 0,
    }
}))

function SiderbarLayout(props) { 

    const links = [
        {
            index: 0,
            url: '/reactdnd',
            name: 'DND',
            iconsvg: DragSvg
        },
        {
            index: 2,
            url: '/d3main',
            name: 'D3',
            iconsvg: D3Svg
        },
        {
            index: 3,
            url: '/reactcontext',
            name: 'Context',
            iconsvg: ContextSvg
        },
        {
            index: 4,
            url: '/emit',
            name: 'Emit',
            iconsvg: EmitSvg
        },
        {
            index: 5,
            url: '/redux',
            name: 'Redux',
            iconsvg: ReduxSvg
        },
        {
            index: 6,
            url: '/hook',
            name: 'Hook',
            iconsvg: HookSvg
        },
        {
            index: 7,
            url: '/scale',
            name: 'Scale',
            iconsvg: ScaleSvg
        }
    ]

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
                    <ExpansionPanelDetails
                    className={classes.expansionPanelDetails}
                    >
                        <List component="nav" className={classes.linkList}>
                            {
                                links.map((item) => {
                                    return (
                                        <ListItem
                                        button
                                        selected={selectedIndex === item.index}
                                        onClick={event => handleListItemClick(event, item.index)}
                                        key={item.index}
                                        >
                                            <Link
                                                to= {item.url}
                                                className={classes.link} 
                                            >
                                                <ListItemIcon><MakeIcon picture={item.iconsvg}></MakeIcon></ListItemIcon>
                                                <Typography  component='span' className={classes.linkName} >
                                                    {item.name}
                                                </Typography>
                                            </Link>
                                        </ListItem>
                                    )
                                })
                            }
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