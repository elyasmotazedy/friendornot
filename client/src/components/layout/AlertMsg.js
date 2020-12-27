import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Fade } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const AlertMeg = ({ alerts }) =>
  alerts !== undefined &&
  alerts.length !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Snackbar
      key={alert.id}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={true}
      TransitionComponent={TransitionLeft}
      severity={alert.alertType}
    >
        <Alert severity={alert.alertType} >{alert.msg}</Alert>
    </Snackbar>
  ));

Alert.protoTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertMeg);
