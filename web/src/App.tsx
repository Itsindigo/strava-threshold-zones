import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div>
      <p>Hi, I'm Matt ✌️</p>
      <p>
        I'm a software engineer based in London, you can find me at:
        <ul>
          <li>here</li>
          <li>here</li>
          <li>here</li>
          <li>here</li>
        </ul>
      </p>
    </div>
  );
}

function Activity() {
  return <div>doo-dah</div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/activity">What i'm up to</Link>
            </li>
          </ul>
        </header>
      </div>
      <Switch>
        <Route path="/activity">
          <Activity />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
