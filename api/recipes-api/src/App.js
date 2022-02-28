import React, { Component } from "react";
import { connect } from "react-redux";
import {  Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Admin from "./components/Admin";
import MainPage from "./components/MainPage";
import SomeonesProfile from "./components/SomeonesProfile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import { BrowserRouter } from 'react-router-dom';
import AddRecipe from "./components/AddRecipe";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminPage: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminPage: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminPage } = this.state;

    return (
      <Router history={history}>
         <BrowserRouter>
        <div>
       <div className="colorHeader">
          <nav className="navbar navbar-expand">
            <div className="navbar-nav mr-auto">

              {!currentUser? (
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                Strona Główna
                </Link>
              </li>
              ):null
              }

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/mainPage"} className="nav-link">
                    Strona Główna
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Mój Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Wyloguj
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Zaloguj
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Zarejestruj
                  </Link>
                </li>
              </div>
            )}
          </nav>
        </div>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/mainPage" component={currentUser ? MainPage : Login} />
              <Route exact path="/addRecipe" component={currentUser ? AddRecipe : Login} />
              <Route path="/profile" component={currentUser ? Profile : Login} />
              <Route path="/user" component={User} />
              <Route path="/admin" component={Admin} />
              <Route path="/userAccount" component={currentUser ? SomeonesProfile : Login} />

              
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
