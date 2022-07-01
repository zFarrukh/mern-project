import React, { useState, useCallback } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' component={Users} exact></Route>
        <Route path='/:userId/places' component={UserPlaces} exact />
        <Route path='/places/new' component={NewPlace}></Route>
        <Route path='/places/:placeId' component={UpdatePlace} />
        <Redirect to='/'></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' component={Users} exact></Route>
        <Route path='/:userId/places' component={UserPlaces} exact />
        <Route path='/auth' component={Auth} /> <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
