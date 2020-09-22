import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerProfile from "./pages/Customer/Profile";
import AdminProfile from "./pages/Admin/Profile";
import AdminAnalytics from "./pages/Admin/Analytics";
import Create from "./pages/CreatePost";
import VolunteerProfile from "./pages/Volunteer/Profile";
import CustomerForm from "./pages/CustomerFormPage";
import AdminForm from "./pages/AdminFormPage";
import VolunteerForm from "./pages/VolunteerFormPage";
import AboutUs from "./pages/AboutUs";
import ShopProducts from "./pages/ShopProducts";
import CommunityBoard from "./pages/CommunityBoard";
import VolunteerInformation from "./pages/VolunteerInformation";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Customer/Cart";
import CustomerSettings from "./pages/Customer/Settings";
import AdminSettings from "./pages/Admin/Settings";
import VolunteerSettings from "./pages/Volunteer/Settings";
import OrderView from "./pages/Volunteer/OrderView";
import Chat from "./pages/Chat";

/* If you create any new pages please add the routes to them using the <Route> tag*/

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/customerprofile" component={CustomerProfile} />
          <Route path="/adminprofile" component={AdminProfile} />
          <Route path="/adminanalytics" component={AdminAnalytics} />
          <Route path="/create" component={Create} />
          <Route path="/volunteerProfile" component={VolunteerProfile} />
          <Route path="/CustomerForm" component={CustomerForm} />
          <Route path="/AdminForm" component={AdminForm} />
          <Route path="/VolunteerForm" component={VolunteerForm} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/ShopProducts" component={ShopProducts} />
          <Route path="/CommunityBoard" component={CommunityBoard} />
          <Route
            path="/VolunteerInformation"
            component={VolunteerInformation}
          />
          <Route path="/ContactUs" component={ContactUs} />
          <Route path="/Cart" component={Cart} />
          <Route path="/CustomerSettings" component={CustomerSettings} />
          <Route path="/AdminSettings" component={AdminSettings} />
          <Route path="/VolunteerSettings" component={VolunteerSettings} />
          <Route path="/ViewOrder" component={OrderView} />
          <Route path="/Chat" component={Chat} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
