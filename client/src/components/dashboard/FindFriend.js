import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import {
  findPerfectMatch,
  cancelMatch,
  getAvailableChat,
} from "../../actions/match";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  findGender: {
    background: "#fff",
    padding: "20px 0",
    marginTop: "20px",
  },
}));

const FindFriend = ({
  auth: { user },
  findPerfectMatch,
  cancelMatch,
  match,
  getAvailableChat,
}) => {
  const classes = useStyles();
  const [gender, setFormData] = useState("");

  const requestToChat = () => {
    const id = uuid.v4();
    findPerfectMatch({
      gender: gender,
      room: id,
      name: user.name,
      avatar: user.avatar,
    });
  };
  useEffect(() => {
    getAvailableChat();
  }, []);

  const cancelChat = () => {
    cancelMatch({ user: user.id });
  };

  const onChange = (e) => {
    setFormData(e.target.value);
  };
  console.log(match)
  return (
    <Grid xs={12} item align="center" className={classes.findGender}>
      <FormControl component="fieldset">
        <FormLabel component="legend">I want to chat with : </FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={
            (match.availableChat !== null && match.availableChat.gender) ||
            gender
          }
          onChange={(e) => onChange(e)}
          style={{ flexDirection: "row" }}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>

      <p>{match.matchedUser !== null ? match.matchedUser.msg : ""}</p>
      {match.availableChat !== null ||
      (match.matchedUser !== null && match.matchedUser.room) ? (
        <Fragment>
          <div xs={12} item align="center">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <Button
            variant="contained"
            color="secondary"
            // endIcon={<CancelIcon/>}
            onClick={cancelChat}
          >
            cancel
          </Button>
        </Fragment>
      ) : (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SearchIcon />}
          onClick={requestToChat}
        >
          Find a friend
        </Button>
      )}
    </Grid>
  );
};

FindFriend.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  matchedUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  getAvailableChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  match: state.match,
});

export default connect(mapStateToProps, {
  findPerfectMatch,
  cancelMatch,
  getAvailableChat,
})(FindFriend);
