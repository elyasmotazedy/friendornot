import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Register from "../auth/Register";
import Login from "../auth/Login";
import AlertMsg from "../../components/layout/AlertMsg";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import BGLanding from "../image/landing-image.jpg";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const findTabIndex = (index) => {
  return {
    id: `auth-tab-${index}`,
    "aria-controls": `auth-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  intro: {
    position: "relative",
    color: "#fff",
    marginTop: theme.spacing(8),
    zIndex: 1,
  },
  image: {
    position: "relative",
    backgroundImage: `url(${BGLanding})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",

    "&::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "0",
      background: "#444",
      opacity: "0.5",
    },
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  authSection: {
    zIndex: 1,
  },
}));

const Landing = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={false} sm={5} md={8} className={classes.image}>
        <Box className={classes.intro}>
          <Typography variant="h1" component="h2" align="center">
            FRIEND OR NOT
          </Typography>
          <Typography variant="h4" component="h2" align="center">
            you have to find friend!!
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        className={classes.authSection}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          {/* <AlertMsg /> */}

          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                variant="fullWidth"
              >
                <Tab
                  icon={<MeetingRoomIcon />}
                  {...findTabIndex(0)}
                  label="Login"
                />
                <Tab
                  icon={<PersonPinIcon />}
                  {...findTabIndex(1)}
                  label="Register"
                />
              </Tabs>
            </AppBar>
            {/* Alert when error happens */}
            <AlertMsg />
            <TabPanel  value={value} index={0}>
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Register />
            </TabPanel>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Landing;
