import React, { useState,useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";
import Spinner from "../../components/layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { findPerfectMatch , cancelMatch  } from "../../actions/match";
import AlertMsg from "../../components/layout/AlertMsg";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from '@material-ui/icons/Delete';
import Chat from "../Chat/Chat";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';





const Dashboard = ({
  getCurrentProfile,
  findPerfectMatch,
  cancelMatch,
  match,
  auth: { user },
  profile: { profile, loading },
}) => {

  const [gender, setFormData] = useState('');
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const requestToChat = () => {
    const id = uuid.v4();
    findPerfectMatch({ gender: gender, room: id });
  };


  const cancelChat = () => {
    cancelMatch({ user : user.id });
  };


  const onChange = (e) =>{
   setFormData(e.target.value)
  }


  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <AlertMsg />
      <p>{user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          has
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
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
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
          {match.matchedUser !== null ? (
            <Chat room={match.matchedUser.room} />
          ) : (
            ""
          )}
        </Fragment>
      ) : (
        <Fragment>
          has not
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={findPerfectMatch}
          >
            Send
          </Button>
          <Chat room="js" />
        </Fragment>
      )}
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
  cancelMatch
})(Dashboard);
