import React, {Component} from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Settlement from './pages/settlement/Settlement';
import Operator from './pages/opeartor/Operator';
import Journey from './pages/journey/Journey';
import Login from './pages/login/Login';
import Events from './pages/events/Events';
import { ROUTES } from './util/Constant';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.OPERATOR} component={Operator} />
            <Route path={ROUTES.JOURNEY} component={Journey} />
            <Route path={ROUTES.SETTLEMENT} component={Settlement} />
            <Route path={ROUTES.SIMULATOR} component={Events} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
