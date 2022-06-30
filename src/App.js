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

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' component={Users} exact></Route>
          <Route path='/:userId/places' component={UserPlaces} exact />
          <Route path='/places/new' component={NewPlace}></Route>
          <Route path='/places/:placeId' component={UpdatePlace} />
          <Redirect to='/'></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
