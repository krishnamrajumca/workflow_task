import React from 'react';
import Login from './login';
import Workflow from './workflow'
import CreateWorkFlow from './workflow/createWorkFlow'
// import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  
  Switch,
  Route,
 
} from "react-router-dom";
import {Router} from 'react-router'
import { createBrowserHistory } from "history";


import Header from './header';
const customHistory = createBrowserHistory();
function App() {
  return (
    <Router history={customHistory}>
    <div className="App p-grid p-col-12 mlr0 plr0">
      <div className="p-col-12 header">
        <Header />
      </div>
      <div className="p-col-12 app-body mlr0 plr0">
     
      <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/workflow" component={Workflow} />
            <Route exact path="/workflow/create" component={CreateWorkFlow} />
      </Switch>
        
      </div>
      </div>
    </Router>
  );
}

export default App;
