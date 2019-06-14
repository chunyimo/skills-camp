import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const useStyles = makeStyles(theme => ({
    icon: {
        width: '24px',
        height: '24px',
        margin: theme.spacing(1)
    },
}))

const MakeIcon = (props) => {
    const classes = useStyles();
    return (
        <img src={props.picture} className={classes.icon} alt={`${props.picture}`}></img>
    )
}

MakeIcon.protoType = {
    picture: PropTypes.object.isRequired
}

export default MakeIcon;