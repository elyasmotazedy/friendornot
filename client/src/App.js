import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivteRoute from "./components/routing/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Chat from "./components/Chat/Chat";
import Forget from "./components/Forget/Forget";
import Join from "./components/Join/Join";
import Reset from "./components/auth/Reset";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar/> */}
          <Route exact path="/" component={Landing} />
          {/* <Route path="/join" exact component={Join} /> */}
          <Switch>
            {/* <Route exact path="/profile/:id" component={profile} /> */}
            {/* <PrivteRoute exact path="/dashboard" component={Dashboard} /> */}
            {/* <Route exact path="/dashboard" component={Dashboard} /> */}
            <Route exact path="/forget" component={Forget} />
            <Route exact path="/reset/:id" component={Reset} />
            <PrivteRoute path="/chat" exact component={Chat} />
            {/* <PrivteRoute path="/chat2" exact component={Chat2} /> */}

            <PrivteRoute exact path="/dashboard" component={Dashboard} />
            <PrivteRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivteRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
