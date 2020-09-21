import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Spinner from "../../components/layout/Spinner";
import Nav from "../Nav/Nav";
import Premium from "../Premium/Premium";
import UserInfo from "./UserInfo";
import FindFriend from "./FindFriend";
import { getCurrentProfile } from "../../actions/profile";
import AlertMsg from "../../components/layout/AlertMsg";
import {
  cancelMatch
} from "../../actions/match";

import Chat from "../Chat/Chat";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import "./Dashboard.css";

const useStyles = makeStyles((theme) => ({}));

const Dashboard = ({
  getCurrentProfile,
  cancelMatch,
  profile: { profile, loading },
  match,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}


  // console.log(match)
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Grid xs={12} item>
        <Nav />
      </Grid>
      <Container>
        <Grid container justify="center">
          <Grid xs={12} item>
            <AlertMsg />
          </Grid>

          <Grid xs={9} item style={{ marginTop: "50px", padding: "0 30px" }}>
            <UserInfo />
            {!match.partnerFinded ? <FindFriend /> : ""}
            {/* <FindFriend /> */}
            {/* <CountdownCircleTimer
              isPlaying
              duration={10}
              size={100}
              strokeWidth={3}
              strokeLinecap="square"
              trailColor="#ffe278"
              colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
              ]}
              onComplete={() => {
                // do your stuff here
                cancelMatch({ user: profile && profile.user._id})
                console.log('done')
              }}
            >
              {({ remainingTime }) => secondsToHms(remainingTime)}
            </CountdownCircleTimer> */}
            {match.matchedUser !== null && match.matchedUser.room ? (
              <Chat />
            ) : (
              ""
            )}
            {/* {match.matchedUser !== null && match.matchedUser.room ? (
              <Chat
              // room={match.matchedUser.room}
              // partnerName={user && user.name}
              // other={match.matchedUser}
              />
            ) : (
              ""
            )} */}
          </Grid>
          <Premium />
        </Grid>
      </Container>
    </Fragment>
  );
};

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  match: state.match,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  cancelMatch
})(Dashboard);
