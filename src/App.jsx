import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Transaction from './components/Transaction'
import Data from './components/Data'
import Contact from './components/Contact'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App=()=>{
  return(<>
        <Navbar/>
        <Switch>
           <Route exact path="/" component={Home}/>
           <Route exact path="/about" component={About}/>
           <Route exact path="/Transaction" component={Transaction}/>
           <Route exact path="/Data" component={Data}/>
           <Route exact path="/contact" component={Contact}/>
            <Redirect to="/"/>
        </Switch>
        <Footer/>
  </>)
}
export default App;