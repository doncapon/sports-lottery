import React, { Component} from "react";
import BetItem  from "../../components/betSlip/BetSlip/BetItem";
import Button from 'react-bootstrap/Button';
import { Plus, Trash, ArrowRight } from "react-bootstrap-icons";
import classes from './BetSlip.module.css';


class BetSlip extends Component{

    AddSlipToBet=(changingSlipIndex, slip)=>{
            if(this.props.disableAdd) {
                this.props.addSlip(changingSlipIndex);
            }
        this.props.disableRemovedBtn();

    };

    removeSlipFromBetting = (slipId)=>{
        this.props.removeSlipSingle(slipId)
        this.props.disabledBtn();

    }

    render(){
        let betSlip = null;
        if(this.props.slips.length > 0) {
            betSlip = this.props.slips.map((slip, ind) =>{
                return <div  style = {{ padding : '15 0px' ,
                            borderRight : '2px solid grey', 
                            borderBottom : '4px solid grey', 
                            marginBottom: '10px' ,
                            float: 'left',
                            marginRight: '2px',
                            background: 'yellow'}} key  = {ind}>
                                                            <div className = 'row'>
                                <div className = 'col-lg-12  '>
                                <span style={{fontWeight: 'bold'}}>SLIP_{ind+1}</span>
                                    <BetItem key = {ind} games = {slip[slip.id].games} />
                                </div>
                            </div>
                            <div className= 'row'>

                                <div  style ={{ margin: '0px 30px' ,  
                                        paddingBottom: '10px'
                                        } }>
                                   
                                     <Button variant = "outline-success" size='sm' 
                                     onClick = {this.hello}><ArrowRight  /> </Button>

                                     <Button onClick ={()=>this.AddSlipToBet(ind, slip) }  
                                    size = 'sm' variant = "success" ><Plus size= "15" 
                                        disabled = {this.props.disableAdd }
                                    /> </Button>

                                     <Button variant = "primary" size='sm' disabled = {slip.disableDelete}
                                     onClick =  {()=>this.removeSlipFromBetting(slip.id) }  ><Trash /> </Button>
                                     
                                     
                                </div>
                            </div>
                        </div> 
            });   }
        
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