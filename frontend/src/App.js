import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home/Home';
import Team from './containers/Team/Team';
import { Route,withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import DateStats from './containers/DateStats/DateStats';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route path="/" exact component={Home}  />
            <Route path="/match/info/:date/:team_name_a/:team_name_b" exact component={DateStats}/>
            <Route path="/:season_id/:team_name" exact component={Team} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
