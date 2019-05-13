import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Createaccount from "./views/Createaccount";
import Notfound from "./views/Notfound";
import Cities from "./views/Cities";
import Landing2 from "./views/Landing2";
import Landing1 from "./views/Landing1";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Addcity from "./views/Addcity";
import Editcity from "./views/Editcity";
import City from "./views/City";
import Additinerary from "./views/Additinerary";
import Addactivity from "./views/Addactivity";
import Edititinerary from "./views/Edititinerary";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <div className="app">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/1" component={Landing1} />
            <Route exact path="/2" component={Landing2} />

            <Route path="/login" component={Login} />
            <Route path="/createaccount" component={Createaccount} />

            <Route exact path="/cities/all" component={Cities} />
            <Route exact path="/cities/:id" component={City} />

            <Route exact path="/cities/all/addcity" component={Addcity} />

            <Route path="/editcity" component={Editcity} />
            <Route path="/cities/:cityId/editcity" component={Editcity} />

            <Route path="/edititinerary" component={Edititinerary} />
            <Route
              path="/cities/:cityId/:itineraryId/edititinerary"
              component={Edititinerary}
            />

            <Route path="/additinerary" component={Additinerary} />
            <Route
              path="/cities/:cityId/additinerary"
              component={Additinerary}
            />

            <Route path="/addactivity" component={Addactivity} />
            <Route
              path="/cities/:cityId/:itineraryId/addactivity"
              component={Addactivity}
            />

            <Route component={Notfound} />
          </Switch>
        </div>
        <Footer className="container" />
      </div>
    );
  }
}

export default App;
