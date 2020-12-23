import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { forgetPassword } from "../../actions/auth";
import { useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setAlert } from "../../actions/alert";
import { resetPassword } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import AlertMsg from "../../components/layout/AlertMsg";
const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "70px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Reset = ({setAlert,resetPassword}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { id } = useParams();
  const { password, password2 } = formData;
  //   if (isAuthenticated) {
  //     return <Redirect to="/dashboard" />;
  //   }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("passwords do not match", "error");
    } else {
        resetPassword(id,password);
    }
  };




  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <MeetingRoomIcon />
        </Avatar> */}
        <AlertMsg />
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)} method='post' >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => onChange(e)}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password2"
              label="Re-Enter password"
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset password
        </Button>
        </form>
      </div>
    </Container>
  );
};

Reset.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};


export default connect(null, { setAlert,resetPassword })(Reset);
