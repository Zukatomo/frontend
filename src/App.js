import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/NavBar';
import Home from './pages/Home';
import CompanyList from './pages/CompanyList';
import Document from './pages/Document';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <Switch>
        <React.Fragment>
        <div className="p-shadow-2 p-mt-3">
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Company">
            <CompanyList />
          </Route>
          <Route exact path="/Document">
            <Document></Document>
          </Route>
        </div>
        </React.Fragment>
      </Switch>
    </div>
  );
}

export default App;
