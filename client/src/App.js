import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./components/Category";
import Filler from "./pages/Filler";


class App extends React.Component {

  state = {
    username: '',
    password: '',
    category: '',
    isLoggedin: ''
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.trim(),
    });
    localStorage.setItem("username", this.state.username);
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      isLoggedin: false
    })
    localStorage.setItem("isLoggedin", "false")
  }

  handleLogin = () => {
    this.setState({
      isLoggedin: true
    })
    localStorage.setItem("isLoggedin", "true");
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/login" render={(props) => <Login handleChange={this.handleChange} 
                                                          username={this.state.username} 
                                                          password={this.state.password}
                                                          handleLogin={this.handleLogin}/>}/>
            { localStorage.getItem("isLoggedin") === "true" && 
            <Route exact path="/" render={(props) => <Home username={this.state.username} password={this.state.password} />}/>
            }
            {localStorage.getItem("isLoggedin") === "true" && 
            <Route exact path="/:category" component={Category}/>
            }
            <Route component={Filler} /> 
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
