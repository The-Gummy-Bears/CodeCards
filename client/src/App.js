import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./components/Category";

class App extends React.Component {

  state = {
    username: '',
    password: '',
    category: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    localStorage.setItem("username", this.state.username);
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/login" render={(props) => <Login handleChange={this.handleChange} 
                                                          username={this.state.username} 
                                                          password={this.state.password}/>}/>
            <Route exact path="/" render={(props) => <Home username={this.state.username} password={this.state.password}/>}/>
            <Route exact path="/:category" component={Category}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
