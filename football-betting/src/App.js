import  classes from './App.module.css';
import Board from './containers/Board/Board';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={classes.App}>
      <h1 style = {{marginLeft: '10%'}}>Bet<span>Soka</span></h1>
      <Switch>
        <Route path= "/" component ={Board} />
      </Switch>
    
    </div>
  );
}

export default App;
