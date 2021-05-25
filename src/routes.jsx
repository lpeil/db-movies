import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './screens/Home';
import MoviePage from './screens/Movie';
import TvShow from './screens/TvShow';
import SearchPage from './screens/Search';
import NotFoundPage from './screens/NotFound';

import { Navbar } from './components';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <div className="app">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movie/:id" exact component={MoviePage} />
        <Route path="/tv/:id" exact component={TvShow} />
        <Route path="/search/:text" exact component={SearchPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
