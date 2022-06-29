import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Users} exact></Route>
        <Route path='/places/new' component={NewPlace}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
