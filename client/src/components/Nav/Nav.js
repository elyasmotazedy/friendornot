import React, { useState } from "react";
import { Link ,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  userNav: {
    // marginTop: theme.spacing(4),
    // borderRadius: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
  navItemContainer: {
    display: "block",
    "&:hover": {
      background: "unset",
    },
  },
  navItem: {
    display: "block",
  },
}));

const Nav = ({ auth: { user }, logout , history}) => {
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" className={classes.userNav}>
      <Container>
        <Toolbar>
          <Box display="inline-block" textAlign="center" position="relative">
            <Avatar
              alt={user && user.name}
              src={user && user.avatar}
              className={classes.avatar}
            />
          </Box>
          <Typography variant="h6" className={classes.title}>
            Dashboard - Welcome {user && user.name}
          </Typography>

          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon style={{ color: "#fff" }} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                className={classes.navItemContainer}
              >
                <Link to="/edit-profile" className={classes.navItem}>
                  <Button
                    // variant="contained"
                    color="default"
                    startIcon={<SettingsIcon />}
                  >
                    Edit profile
                  </Button>
                </Link>
                {/* <a onClick={() =>logout(history)} href='#'>logout</a> */}
                {/* <Link to="/logout" className={classes.navItem}> */}
                  <Button
                    // variant="contained"
                    color="default"
                    startIcon={<PowerSettingsNewIcon />}
                    onClick={() =>logout(history)}
                  >
                    Logout
                  </Button>
                {/* </Link> */}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Nav.prototypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logout})(withRouter(Nav));
