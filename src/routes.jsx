import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './screens/Home';
import MoviePage from './screens/Movie';
import NotFoundPage from './screens/NotFound';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/movie/:id" exact component={MoviePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
