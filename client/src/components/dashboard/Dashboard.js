import React, { useState, useEffect, Fragment } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import Nav from "../Nav/Nav";
import Premium from "../Premium/Premium";
import UserInfo from "./UserInfo";
import FindFriend from "./FindFriend";
import { getCurrentProfile } from "../../actions/profile";
import AlertMsg from "../../components/layout/AlertMsg";
import { cancelMatch } from "../../actions/match";

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

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Grid xs={12} item>
        <Nav />
      </Grid>
      <Container>
        <Grid container justify="center">
          <Grid xs={12} sm={8} item style={{ marginTop: "10px" }}>
            <AlertMsg />
          </Grid>

          <Grid xs={12} sm={12} md={8} item style={{ marginTop: "50px" }}>
            <UserInfo />
            {!match.partnerFinded ? <FindFriend /> : ""}
            <br/>
            {match.matchedUser !== null && match.matchedUser.room ? (
              <Chat />
            ) : (
              ""
            )}
          </Grid>
          {/* <Premium /> */}
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
  cancelMatch,
})(Dashboard);
