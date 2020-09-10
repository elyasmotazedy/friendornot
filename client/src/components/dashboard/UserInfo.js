import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";

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
  auth: { user },
  profile: { profile, loading },
}) => {
  const classes = useStyles();

  return (
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
                <Chip key={item} style={{ margin: "0 5px 5px 5px" }} label={item} />
              ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

UserInfo.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(UserInfo);
