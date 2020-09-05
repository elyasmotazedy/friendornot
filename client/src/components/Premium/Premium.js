import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";


import premiumIMG from "../../image/premium.png";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  premium: {
    backgroundSize: "unset",
  },
  media: {
    height: 140,
    backgroundSize: "unset",
    marginTop: theme.spacing(6),
  },

  check: {
    marginRight: theme.spacing(2),
    color: green["A700"],
  },
  cardContent: {
    padding: "30px 25px",
  },
  premiumBTN: {
    textAlign: "center",
  },
}));

const Premium = () => {
  const classes = useStyles();
  return (
    <Grid xs={3} item style={{ marginTop: "50px" }}>
      <Card>
        <CardMedia
          className={classes.media}
          image={premiumIMG}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Upgrade to Pro
          </Typography>
          <Box display="flex" my={2}>
            <CheckCircleIcon className={classes.check} />
            <Typography variant="body1" component="p">
              Lizards are a widespread
            </Typography>
          </Box>
          <Box display="flex" my={2}>
            <CheckCircleIcon className={classes.check} />
            <Typography variant="body1" component="p">
              Lizards are a widespread
            </Typography>
          </Box>
          <Box display="flex" my={2}>
            <CheckCircleIcon className={classes.check} />
            <Typography variant="body1" component="p">
              Lizards are a widespread
            </Typography>
          </Box>
          <Box display="flex" my={2}>
            <CheckCircleIcon className={classes.check} />
            <Typography variant="body1" component="p">
              Lizards are a widespread
            </Typography>
          </Box>
          <Box align="center">
            <Link to="/edit-profile" className={classes.premiumBTN}>
              <Button variant="contained" color="default">
                Upgrade Pro
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Premium;
