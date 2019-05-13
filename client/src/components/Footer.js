import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';

const styles = () => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
});

function Footer(props) {
    const { classes } = props;
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <IconButton color="inherit">
                    <Link to="/" className="home-link"><HomeIcon fontSize="large" /></Link>
                </IconButton>
            </AppBar>
        </Fragment>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);