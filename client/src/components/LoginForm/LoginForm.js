import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from "../../utils/API";
import "./LoginForm.css";
import {withRouter} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
      color: '#0067B2',
      fontFamily: 'Quicksand',
    },
    modalButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: 10,
      color: '#0067B2',
      fontFamily: 'Quicksand',
    },
    input: {
      display: 'none',
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 30,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    modalText: {
      textAlign: 'center'
    }
  });

class TextFields extends React.Component {

  state = {
    open: false,
    onClose: true,
    modalText: ''
  }

    handleRegister = () => {
      const newUser = {
        username: this.props.username.trim(),
        password: this.props.password.trim()
      }
      API.getUserbyName(newUser.username).then(res => {
        if(res.data.length !== 0) {
          this.setState({
            modalText: "Sorry, this username is already taken.",
            open: true
          })
          
        }
        else if(this.props.username.length < 4) {
          this.setState({
            modalText: "Username must contain at least 4 characters.",
            open: true
          })
        }
        else if(this.props.password.length < 8) {
          this.setState({
            modalText: "Password must contain at least 8 characters.",
            open: true
          })
        }
        else {
         API.saveUser(newUser)
        .then(res => {
          localStorage.setItem("username", newUser.username);
          localStorage.setItem("isLoggedin", "true");
          this.props.handleLogin();
          this.props.history.push("/home")
          }
        )
        .catch(err => console.log(err));
        }
      })
    };

    handleClose = () => {
      this.setState({ open: false});
    };

    handleLogin = () => {
      const passwordToCheck = this.props.password.trim();
      const username = this.props.username.trim();
      API.getUserbyName(username).then(res => {
        if(res.data.length === 0) {
          this.setState({
            modalText: "This user does not exist",
            open: true
          })
        }
        else if(passwordToCheck !== res.data[0].password) {
          this.setState({
            modalText: "Incorrect Password",
            open: true
          })
        }
        else if(username === res.data[0].username && passwordToCheck === res.data[0].password){
          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedin", "true");
          this.props.handleLogin();
          this.props.history.push("/home");
        }
      })
      .catch(err => console.log(err)); 
    
    }


    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.container} noValidate autoComplete="off">
        <div className={"header"}>Get simple. Get started.</div>
        <div className={"box"}>
        <div className={"logIn"}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title" className={classes.modalText}>
              {this.state.modalText}
            </Typography>
            <div className={classes.modalBtn}>
            <Button onClick={this.handleClose} variant="outlined" color="primary" className={classes.modalButton}>
            Ok
            </Button>
            </div>
          </div>
        </Modal>
          <div className={"divCenter"}><TextField
          required
            id="username"
            label="username"
            className={classes.textField}
            value={this.props.username}
            onChange={this.props.handleChange('username')}
            margin="normal"
          /></div>
          <div className={"divCenter2"}><TextField
            required
            id="password-input"
            label="Password"
            className={classes.textField}
            value={this.props.password}
            onChange={this.props.handleChange('password')}
            type="password"
            autoComplete="current-password"
            margin="normal"
          /></div>
          <div className={"btnCenter"}>
          <div className={"btn1"}>
          <Button variant="contained" color="" onClick={this.handleLogin} className={classes.button}>
            Login
          </Button>
          </div>
          <div className={"btn2"}>
          <Button variant="contained" color="" onClick={this.handleRegister} className={classes.button}>
            Register
          </Button>
          </div>
          </div>
          </div>
          </div>
        </form>
      );
    }
  }
  
  TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(TextFields));