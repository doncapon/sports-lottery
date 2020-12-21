import React, { Component } from "react";
import BetItem  from "../../components/betSlip/BetSlip/BetItem";
import Button from 'react-bootstrap/Button';
import { Plus, Trash} from "react-bootstrap-icons";
import classes from './BetSlip.module.css';


class BetSlip extends Component{

    render(){
        let betSlip = null;
        betSlip = this.props.betSlip.map((slip, ind) =>{
                return <div  style = {{ padding : '15 0px' ,
                            borderRight : '2px solid grey', 
                            borderBottom : '4px solid grey', 
                            marginBottom: '10px' ,
                            float: 'left',
                            marginRight: '2px',
                            background: 'yellow'}}>
                                
                            <div className = 'row'>
                                <div className = 'col-lg-12  '>
                                <span style={{fontWeight: 'bold'}}>ROW_{ind+1}</span>
                                    <BetItem key = {ind} teams = {slip.teams} />
                                </div>
                            </div>
                            <div className= 'row'>

                                <div  style ={{ margin: '0px 30px' , 
                                        paddingBottom: '10px'
                                        } }>
                                    <Button onClick ={this.props.add} size = 'sm' variant = "success" ><Plus size= "18" /> 
                                     </Button> <Button variant = "primary" size='sm' ><Trash /></Button>
                                </div>
                            </div>
                        </div> 
            });   
        
        return (
            <div  className= { classes.BetSlip}   >
                {
                 betSlip 
                 }
            </div>
        );
    }
}

export default BetSlip;