import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./InfoCards.css";


const styles = {
  card: {
    width: 300,
    height: 350,
    marginBottom: 15,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
    display: 'inline-block',
    textAlign: 'center',
    position: 'relative',
    overflowWrap: 'normal',
    overflowY: 'scroll'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 10,
    fontFamily: 'Quicksand',
  },
  pos: {
    marginBottom: 12,
  },
  notes: {
    width: '100%',
    margin: '5px',
    fontFamily: 'Quicksand',
    marginBottom: 50,
    wordWrap: 'break-word'
  },
  h3: {
    fontFamily: 'Quicksand',
  },
  button: {
    display: 'flex',
    position: "absolute",
    top: 0,
    right: 0,
    fontFamily: 'Quicksand',
  },
  link: {
    wordWrap: 'break-word'
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div className={"grow"}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="headline" color="textSecondary" component="h1">
          {props.title}
          </Typography>
          <div className={"card"}>
          <h3 className={classes.h3}>My Notes:</h3>
          <div className={classes.notes}>
          {props.notes}
          </div>
          <div>
          <b>My Links:</b> <a className={classes.link} href={props.link} target="_blank">{props.link}</a>
          </div>
          </div>
        </CardContent >
        <CardActions>
          <Button className={classes.button} onClick={() => props.deleteCard(props.title)} size="small" color="secondary">Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);