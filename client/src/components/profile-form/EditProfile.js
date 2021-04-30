import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import AlertMsg from '../../components/layout/AlertMsg';
import Spinner from '../../components/layout/Spinner';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Nav from '../Nav/Nav';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import LanguageIcon from '@material-ui/icons/Language';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import { countries } from '../../utils/countries';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  BackBtn: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const classes = useStyles();

  const [selectedDay, setSelectedDay] = React.useState(null);
  const [formData, setFormData] = useState({
    location: '',
    hobbies: '',
    birthday: '',
    bio: '',
    name: '',
    gender: '',
    website: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      hobbies: loading || !profile.hobbies ? '' : profile.hobbies,
      bio: loading || !profile.bio ? '' : profile.bio,
      birthday: loading || !profile.user.birthday ? '' : profile.user.birthday,
      name: loading || !profile.user.name ? '' : profile.user.name,
      gender: loading || !profile.gender ? '' : profile.gender,
      website: loading || !profile.social ? '' : profile.social.website,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading]);

  const {
    location,
    hobbies,
    bio,
    name,
    gender,
    birthday,
    website,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;

  console.log('birthday', birthday);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Grid xs={12} item>
        <Nav />
      </Grid>
      <Container component="main" maxWidth="xs">
        <Grid xs={12} item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.BackBtn}
            onClick={() => history.goBack()}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Grid>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <AlertMsg />
          <Typography component="h1" variant="h5">
            Edit your profile
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
                  value={
                    loading || !profile.user.email ? '' : profile.user.email
                  }
                  onChange={(e) => onChange(e)}
                  disabled
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
                    <React.Fragment>
                      {option.label} ({option.code}) +{option.phone}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      required
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
                <Autocomplete
                  multiple
                  id="Hobbies"
                  className={classes.hobbies}
                  options={[]}
                  onChange={(e, newValue) => {
                    setFormData({
                      ...formData,
                      hobbies: [...newValue],
                    });
                  }}
                  limitTags={5}
                  freeSolo
                  value={hobbies}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        id="Hobbies"
                        {...params}
                        value="dfdf"
                        variant="outlined"
                        label="Hobbies"
                        placeholder="Hobbies"
                        helperText="You can have multiple hobbies, after wrting seprate with enter"
                      />
                    );
                  }}
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
                  value={birthday}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={bio}
                  onChange={(e) => onChange(e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
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
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    {/* <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LanguageIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={website}
                      onChange={(e) => onChange(e)}
                      id="website"
                      name="website"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <YouTubeIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={youtube}
                      onChange={(e) => onChange(e)}
                      id="youtube"
                      name="youtube"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <FacebookIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={facebook}
                      onChange={(e) => onChange(e)}
                      id="facebook"
                      name="facebook"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LinkedInIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={linkedin}
                      onChange={(e) => onChange(e)}
                      id="linkedin"
                      name="linkedin"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <TwitterIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={twitter}
                      onChange={(e) => onChange(e)}
                      id="twitter"
                      name="twitter"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <InstagramIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={instagram}
                      onChange={(e) => onChange(e)}
                      id="instagram"
                      name="instagram"
                      label="With a grid"
                    />
                  </Grid>
                </Grid> */}
              {/* </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit
            </Button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
