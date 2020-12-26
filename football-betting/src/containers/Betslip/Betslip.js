import React, { Component} from "react";
import BetItem  from "../../components/betSlip/BetSlip/BetItem";
import Button from 'react-bootstrap/Button';
import { Plus, Trash} from "react-bootstrap-icons";
import classes from './BetSlip.module.css';


class BetSlip extends Component{

    sideIsValid=(sides)=>{
        for(let side of sides){
            if(side.selected === true){
                return true;
            }
        }
        return false;
    }
    isPurchasable=(slip)=>{
        let isValid = true;
            for(let i = 0 ; i < slip.games.length; i++){
                const isPurse = this.sideIsValid(slip.games[i]["game"+ (i+1)].sides);
                if(!isPurse){
                     isValid = false;
                     break;
                }
            }
        

           return isValid;;

    }
    AddSlipToBet=(changingSlipIndex, slip)=>{
        const isPurchase = this.isPurchasable(slip);
        if(isPurchase) {
            this.props.setAdding(true) 
            this.props.addSlip(changingSlipIndex);
            this.props.setAdding(false);
        }
    }
    render(){
        let betSlip = null;
        let slipId = "slip";
        if(this.props.slips.length > 0) {
            betSlip = this.props.slips.map((slip, ind) =>{
                // console.log(slip);
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
                                    <BetItem key = {ind} games = {slip[slipId + (ind+1)].games} />
                                </div>
                            </div>
                            <div className= 'row'>

                                <div  style ={{ margin: '0px 30px' ,  
                                        paddingBottom: '10px'
                                        } }>
                                    <Button onClick ={()=>this.AddSlipToBet(ind , slip[slipId+ (ind+1)] )  }
                                    size = 'sm' variant = "success" ><Plus size= "18" /> 
                                     </Button> <Button variant = "primary" size='sm' ><Trash /></Button>
                                     <Button variant = "outline-success" size='sm' ><Trash /></Button>
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