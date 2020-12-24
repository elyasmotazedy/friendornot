import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";


import "./Dashboard.css";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    boxShadow: "none",
    padding: "20px",
  },

  mainAvatar: {
    width: "150px",
    height: "150px",
  },
  cardDetails: {
    flex: 1,
  },
}));



const UserInfo = ({
  auth: { userInfo },
  profile: { profile, loading },
  match: { partner, matchedUser },
}) => {
  const classes = useStyles();
  const { user } = userInfo !== null ? userInfo : "";
  const [active, setActive] = useState("me");
  return (
    <Card className={classes.card}>
      <div>
        <Avatar
          alt={(partner && partner.name) || (user && user.name)}
          src={(partner && partner.avatar) || (user && user.avatar)}
          className={classes.mainAvatar}
        />
      </div>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {(partner && partner.name) || (user && user.name)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {(partner && partner.profile.location.label) ||
              (profile && profile.location.label)}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {(partner && partner.profile.bio) || (profile && profile.bio)}
          </Typography>
          <div>
            {(partner &&
              partner.profile.hobbies.map((item) => (
                <Chip
                  key={item}
                  style={{ margin: "0 5px 5px 5px" }}
                  label={item}
                />
              ))) ||
              (profile &&
                profile.hobbies.map((item) => (
                  <Chip
                    key={item}
                    style={{ margin: "0 5px 5px 5px" }}
                    label={item}
                  />
                )))}
          </div>
        </CardContent>
      </div>

      {/* <section className="forms-section">
        <div className="forms">
          <div onClick={() => setActive("me")} className={`form-wrapper ${active === "me" ? "is-active" : ""}`}>
            <button
              type="button"
              onClick={() => setActive("me")}
              className="switcher switcher-login"
            >
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login">this is me </form>
          </div>
          <div
            className={`form-wrapper ${
              active === "partner" ? "is-active" : ""
            }`}
            onClick={() => setActive("partner")}
          >
            <button
              type="button"
              onClick={() => setActive("partner")}
              className="switcher switcher-signup"
            >
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup">this is my parner</form>
          </div>
        </div>
      </section> */}

    </Card>
  );
};

UserInfo.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  match: state.match,
});

export default connect(mapStateToProps)(UserInfo);
