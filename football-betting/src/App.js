import Board from './containers/Board/Board';
import { Route, Switch } from "react-router-dom";
import Navs from './components/UI/Navbar/Navs'
import { connect } from 'react-redux';
import  Spinner  from './components/UI/Spinner/Spinner';
import { Component } from 'react';
import *  as actions from './store/actions/index';

class  App extends Component {
  componentDidMount() {

    this.props.onSetBoard();

  }

  render(){
   
    return( this.props.loading? <div className= {'container-fluid '}>
    <Navs />
    <Switch>
      <Route path= "/" component ={Board} />
    </Switch>
  
  </div>: <Spinner />);
  }
}
const mapStateToProps =(state)=>{
  return {
    loading: state.board.loading
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    onSetBoard: () => dispatch(actions.setBoard()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
