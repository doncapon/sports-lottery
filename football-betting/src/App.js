import  classes from './App.module.css';
import Board from './components/board/Board';

function App() {
  return (
    <div className={classes.App}>
      <h1>Bet scoccer</h1>
      <Board />
    </div>
  );
}

export default App;
