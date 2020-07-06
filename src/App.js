import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Navbar from './components/Navbar';


function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms" component={Room}/>
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        <Route exact path="*" component={Error}/>
      </Switch>
    </div>
  );
}
export default App;
//30:51 minite