
import { React } from "react";
import OrderTiles from "../board/tile/OrderTile/OrderTitles";


const OrderItem =props =>{
    const order =   props.teams.map((team, k)=>{
        return <div style ={{width: '100%', minWidth: '250px'  ,border: '1px solid #ccc'  } }>
        <OrderTiles  type = 'home' selected = {props.teams[k].sides['home'].selected}
         >1</OrderTiles>
        <OrderTiles  type = 'draw' selected = {props.teams[k].sides['draw'].selected}
         >X</OrderTiles>
        <OrderTiles  type = 'away'selected = {props.teams[k].sides['away'].selected}
        >2</OrderTiles>
    </div>
    });
    return  (
     
          <div>
              {order}
          </div>  
    )

}


export default OrderItem;