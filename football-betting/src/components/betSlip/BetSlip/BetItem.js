
import { React } from "react";
import BetTiles from "../../board/tile/betTile/BetTitles";
import classes from './BetItem.module.css';

const BetItem =props =>{
    const betrows =  props.teams.map( (team , k) => {
        return (<div key={k}>
                <div  className = {classes.BetItemInner} >
                    {
                            team.sides.map((side, i)=>{
                            let  tile = null;
                                if( i === 0){
                                    tile = 'home';
                                }else if( i === 1){
                                    tile = 'draw';
                                }else{
                                    tile = 'away';
                                }
                    
                                return    <BetTiles key = { tile+ i}  type = {tile}  selected = { side.selected} />

                              })
                    }
                </div>
            </div>
        );
        
    });

    return  (
     
          <div className={classes.BetItem} style = {{border: '1px solid grey'}} >
              {betrows}
          </div>  
    )

}


export default BetItem;