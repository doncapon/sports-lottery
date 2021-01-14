import Board from './containers/Board/Board';
import { Route, Switch } from "react-router-dom";
import Navs from './components/UI/Navbar/Navs'
import { Component } from 'react';
import classes from './App.module.css';

class  App extends Component {
  render(){
   
    return(<div className={classes.App}>
    <div className= {classes.Navs}><Navs /></div>
    <Switch>
      <Route path= "/" component ={Board} />
    </Switch>
  
   </div>);
  }
}

export default App;
