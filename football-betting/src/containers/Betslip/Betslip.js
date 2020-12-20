import React, { Component } from "react";
import BetItem  from "../../components/betSlip/BetSlip/BetItem";
import Auxy from "../../hoc/Auxy/Auxy";
import Button from '../../components/UI/Button/Button';


class BetSlip extends Component{

    render(){
        let betSlip = null;
        betSlip = this.props.betSlip.map((slip, ind) =>{
                return <Auxy>
                        <div><Button clicked ={this.props.add} btnType = "Success"  >ADD +</Button> <Button btnType = "Primary" >DEL -</Button></div>
                    <BetItem key = {ind} teams = {slip.teams} />
                    </Auxy> 
            });   
        
        return (
            <React.Fragment>
                {
                 betSlip 
                 }
            </React.Fragment>
        );
    }
}

export default BetSlip;