import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Home from './pages/home'
import NavBar from './components/NavBar'
import MessagesTable from './components/messagesTable'

const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Notification" exact component={MessagesTable} />
      </Switch>
    </Router >
  );
}

export default App;
