import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TestList } from "./components/TestList.jsx";
import { Testset } from "./components/Testset.jsx";
import { Elements } from "./components/Elements.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
            <MainMenu />
          </header>
          <div>
            <Route exact path="/" component={TestList} />
            <Route exact path="/testset/:setName" component={Testset} />
            <Route exact path="/elements" component={Elements} />
          </div>
        </div>
      </Router>
    );
  }
}

const MainMenu = () => (
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
    <Link to="/elements">
      <button>elements</button>
    </Link>
  </div>
);

export default App;
