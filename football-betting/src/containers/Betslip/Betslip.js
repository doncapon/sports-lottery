import React, { Component} from "react";
import BetItem  from "../../components/betSlip/BetSlip/BetItem";
import Button from 'react-bootstrap/Button';
import { Plus, Trash, ArrowRight } from "react-bootstrap-icons";
import classes from './BetSlip.module.css';


class BetSlip extends Component{

    AddSlipToBet=(changingSlipIndex, playingIndex)=>{
    
        this.props.addSlip(changingSlipIndex);
        this.settingEditingIndex(playingIndex)
    };

    removeSlipFromBetting = (slipId)=>{
        this.props.removeSlipSingle(slipId)
        // this.props.disabledBtn();

    }

    settingEditingIndex =(editedSlipIndex) =>{
        this.props.setPlayingIndex(editedSlipIndex);
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
                                     onClick = {()=>this.settingEditingIndex(ind)}><ArrowRight  /> </Button>

                                     <Button onClick ={()=>this.AddSlipToBet(ind, this.props.slips.length) }  
                                    size = 'sm' variant = "success"
                                    disabled = {!this.props.disableAdd }
                                    > 
                                        <Plus size= "15" 
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