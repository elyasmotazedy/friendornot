import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";
import Spinner from "../../components/layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { findPerfectMatch, cancelMatch } from "../../actions/match";
import AlertMsg from "../../components/layout/AlertMsg";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Chat from "../Chat/Chat";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  userNav: {
    marginTop: theme.spacing(5),
    borderRadius: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
  userName: {
    display: "inline-block",
    background: "#f1f1f1",
    width: "55px",
    borderRadius: "5px",
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "-2px",
    margin: "auto",
    padding: "5px",
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

const Dashboard = ({
  getCurrentProfile,
  findPerfectMatch,
  cancelMatch,
  match,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [gender, setFormData] = useState("");
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const requestToChat = () => {
    const id = uuid.v4();
    findPerfectMatch({ gender: gender, room: id });
  };

  const cancelChat = () => {
    cancelMatch({ user: user.id });
  };

  const onChange = (e) => {
    setFormData(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <Grid container justify="center">
          <Grid xs={12} item>
            <AppBar position="static" className={classes.userNav}>
              <Toolbar>
                <Box
                  display="inline-block"
                  textAlign="center"
                  position="relative"
                >
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
                      <Link to="/edit-profile" className={classes.navItem}>
                        <Button
                          // variant="contained"
                          color="default"
                          startIcon={<PowerSettingsNewIcon />}
                        >
                          Logout
                        </Button>
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid xs={12} item>
            <h1>Dashboard</h1>
            <AlertMsg />
          </Grid>
          <Grid xs={12} item align="center">
            <Box display="inline-block" textAlign="center" position="relative">
              <Avatar
                alt={user && user.name}
                src={user && user.avatar}
                className={classes.avatar}
              />
              <span className={classes.userName}>{user && user.name}</span>
            </Box>
          </Grid>
          <Link to="/edit-profile">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SettingsIcon />}
            >
              Edit profile
            </Button>
          </Link>
        </Grid>

        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={(e) => onChange(e)}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <p>{match.matchedUser !== null ? match.matchedUser.msg : ""}</p>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={requestToChat}
        >
          Send
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<DeleteIcon>send</DeleteIcon>}
          onClick={cancelChat}
        >
          cancel
        </Button>
        {match.matchedUser !== null && match.matchedUser.room ? (
          <Chat room={match.matchedUser.room} />
        ) : (
          ""
        )}
      </Container>
    </Fragment>
  );
};

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  findPerfectMatch: PropTypes.func.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  matchedUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  match: state.match,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  findPerfectMatch,
  cancelMatch,
})(Dashboard);
