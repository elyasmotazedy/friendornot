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
import SearchIcon from "@material-ui/icons/Search";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import premium from "../../image/premium.png";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoomIcon from "@material-ui/icons/Room";
import CancelIcon from "@material-ui/icons/Cancel";

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
  premium: {
    backgroundSize: "unset",
  },
  media: {
    height: 140,
    backgroundSize: "unset",
    marginTop: theme.spacing(6),
  },

  check: {
    marginRight: theme.spacing(2),
    color: green["A700"],
  },
  cardContent: {
    padding: "30px 25px",
  },
  premiumBTN: {
    textAlign: "center",
  },

  card: {
    display: "flex",
    boxShadow: "none",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  mainAvatar: {
    width: "150px",
    height: "150px",
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
    findPerfectMatch({
      gender: gender,
      room: id,
      name: user.name,
      avatar: user.avatar,
    });
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
      <Grid xs={12} item>
        <AppBar position="static" className={classes.userNav}>
          <Container>
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
          </Container>
        </AppBar>
      </Grid>
      <Container>
        <Grid container justify="center">
          <Grid xs={12} item>
            {/* <h1>Dashboard</h1> */}
            <AlertMsg />
          </Grid>

          <Grid xs={9} item style={{ marginTop: "50px" }}>
            <div>
              <Card className={classes.card}>
                <Hidden xsDown>
                  <Avatar
                    alt={user && user.name}
                    src={user && user.avatar}
                    className={classes.mainAvatar}
                  />
                </Hidden>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {user && user.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {profile && profile.location.label}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {profile && profile.bio}
                    </Typography>
                    <div>
                      {profile &&
                        profile.hobbies.map((item) => (
                          <Chip
                            style={{ margin: "0 5px 5px 5px" }}
                            label={item}
                          />
                        ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
            <Grid xs={12} item align="center">
              <FormControl component="fieldset">
                <FormLabel component="legend">I want to chat with : </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => onChange(e)}
                  style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
              </FormControl>
              <p>{match.matchedUser !== null ? match.matchedUser.msg : ""}</p>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SearchIcon />}
                onClick={requestToChat}
              >
                Find a friend
              </Button>
              {match.matchedUser !== null && match.matchedUser.room ? (
                <Button
                  variant="contained"
                  color="secondary"
                  // endIcon={<CancelIcon/>}
                  onClick={cancelChat}
                >
                  cancel
                </Button>
              ) : (
                ""
              )}
            </Grid>
            {/* <Grid xs={12} item align="center">
              {match.matchedUser !== null && match.matchedUser.room ? (
                <Chat
                  room={match.matchedUser.room}
                  partnerName={user && user.name}
                  other={match.matchedUser}
                />
              ) : (
                ""
              )}
            </Grid> */}
          </Grid>
          <Grid xs={3} item style={{ marginTop: "50px" }}>
            <Card>
              <CardMedia
                className={classes.media}
                image={premium}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Upgrade to Pro
                </Typography>
                <Box display="flex" my={2}>
                  <CheckCircleIcon className={classes.check} />
                  <Typography variant="body1" component="p">
                    Lizards are a widespread
                  </Typography>
                </Box>
                <Box display="flex" my={2}>
                  <CheckCircleIcon className={classes.check} />
                  <Typography variant="body1" component="p">
                    Lizards are a widespread
                  </Typography>
                </Box>
                <Box display="flex" my={2}>
                  <CheckCircleIcon className={classes.check} />
                  <Typography variant="body1" component="p">
                    Lizards are a widespread
                  </Typography>
                </Box>
                <Box display="flex" my={2}>
                  <CheckCircleIcon className={classes.check} />
                  <Typography variant="body1" component="p">
                    Lizards are a widespread
                  </Typography>
                </Box>
                <Box align="center">
                  <Link to="/edit-profile" className={classes.premiumBTN}>
                    <Button variant="contained" color="default">
                      Upgrade Pro
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} item align="center">
            {match.matchedUser !== null && match.matchedUser.room ? (
              <Chat
                room={match.matchedUser.room}
                partnerName={user && user.name}
                other={match.matchedUser}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
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
