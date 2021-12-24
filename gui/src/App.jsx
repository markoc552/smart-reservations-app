import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./history";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import ManageUsers from "./pages/ManageUsers";
import ManageRestaurants from "./pages/ManageRestaurants";
import UserProfile from "./pages/UserProfile";
import UpdateUserProfile from "./pages/UpdateUser";
import MyRestaurants from "./pages/MyRestaurants";
import UpdateMenu from "./pages/UpdateMenu";
import { IntlProvider } from "react-intl";

const App = () => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <IntlProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/restaurants" exact component={Restaurants} />
            <Route
              path="/restaurants/menu/:restaurant"
              exact
              component={Menu}
            />
            <Route path="/manageUsers" exact component={ManageUsers} />
            <Route
              path="/manageRestaurants"
              exact
              component={ManageRestaurants}
            />
            <Route path="/myProfile" exact component={UserProfile} />
            <Route path="/updateProfile" exact component={UpdateUserProfile} />
            <Route path="/myRestaurants" exact component={MyRestaurants} />
            <Route
              path="/updateMenu/:restaurant"
              exact
              component={UpdateMenu}
            />
          </Switch>
        </Router>
      </IntlProvider>
    </ToastProvider>
  );
};

export default App;
