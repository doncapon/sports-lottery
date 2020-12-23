
import { React } from "react";
import BetTiles from "../../board/tile/betTile/BetTitles";
import classes from './BetItem.module.css';

const BetItem =props =>{
    let betrows = null;
    if(props.sides.length > 0 ){
        
            betrows =  props.sides.map( (side , k) => {
        return (<div key={k} className= 'row' >
                
                <div  className = {'col-lg-12 '}  style = {{marginTop : '7px'}} >
                <span style = {{float: 'left', 
                        fontWeight: 'bold'}}>{k+1}.</span>
                    {
                            side.map((side, i)=>{

                            let  tile = null;
                                if( i === 0){
                                    tile = 'home';
                                }else if( i === 1){
                                    tile = 'draw';
                                }else{
                                    tile = 'away';
                                }
                    
                                return   <div className= 'col-lg-12' key = { tile+ i} > 
                                            <BetTiles  type = {tile}  selected = { side.selected} />
                                        </div>

                              })
                    }
                </div>
            </div> 
        ); 
        
    });
    }

    return  (
     
          <div className={classes.BetItem}  >
              {betrows}
          </div>  
    )

}


export default BetItem;