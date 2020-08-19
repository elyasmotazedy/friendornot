import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { countries } from "../../utils/countries";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { createProfile } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  createProfile,
  history,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    gender: "",
    birthday: new Date("2014-08-18T21:11:54"),
    password: "",
    password2: "",
  });

  const {
    name,
    email,
    location,
    birthday,
    gender,
    password,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "error");
    } else {
      register({ name, email, birthday, password, location, gender, history });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                onChange={(e, newValue) => {
                  setFormData({ ...formData, location: newValue });
                }}
                id="location"
                options={countries}
                classes={{
                  option: classes.option,
                }}
                value={location}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <Fragment>
                    {/* <span>{countryToFlag(option.code)}</span> */}
                    {option.label} ({option.code}) +{option.phone}
                  </Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="birthday"
                id="birthday"
                label="Birthday"
                fullWidth
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                value={birthday}
                onChange={(e) => onChange(e)}
              />
            </Grid>

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
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Gender</FormLabel>
                
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => onChange(e)}
                    
                  >
                    <Box flexDirection="unset">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                    </Box>
                  </RadioGroup>
        
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, createProfile })(
  withRouter(Register)
);
