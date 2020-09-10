import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import Nav from "../Nav/Nav";
import Premium from "../Premium/Premium";
import UserInfo from "./UserInfo";
import FindFriend from "./FindFriend";
import { getCurrentProfile } from "../../actions/profile";
import AlertMsg from "../../components/layout/AlertMsg";

import Chat from "../Chat/Chat";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import "./Dashboard.css";

const useStyles = makeStyles((theme) => ({}));

const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  match,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);


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
})(Dashboard);
