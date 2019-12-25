import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import AppList from './components/AppList';
import TrackLift from './components/TrackLift';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <Container>
              <AppNavbar />
              <Route exact path="/" component={AppList} />
              <Route path="/lifts" component={TrackLift} />
            </Container>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
