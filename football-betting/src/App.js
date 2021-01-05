import Board from './containers/Board/Board';
import { Route, Switch } from "react-router-dom";
import Navs from './components/UI/Navbar/Navs'

function App() {

  return (
    <div className= {'container-fluid '}>
      <Navs />
      <Switch>
        <Route path= "/" component ={Board} />
      </Switch>
    
    </div>
  );
}

export default App;
