import {Fragment} from 'react'
import Header from './components/layout/Header'
import Alerts from './components/layout/Alerts'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import setAuthToken from './utils/setAuthToken';

import AuthState from './context/auth/AuthState'
import ContactState from './context/contact/ContactState'
import AlertState from './context/alert/AlertState'

import Home from './views/Home'
import About from './views/About'
import Register from './views/Register'
import Login from './views/Login'
import PrivateRoute from './routing/PrivateRoute'

if(localStorage.token){
    setAuthToken(localStorage.token)
}

function App() {
    return (
        <AuthState>
        <ContactState>
        <AlertState>
        <Router>
            <Fragment>
                <Header icon="fa fa-id-card-alt" title="Contact Keeper"/>
                <div className="container">
                    <Alerts />
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            </Fragment>
        </Router>
        </AlertState>
        </ContactState>
        </AuthState>
    );
  }
  
  export default App;