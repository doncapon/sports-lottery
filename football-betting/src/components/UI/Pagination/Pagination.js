import React  from "react";
import classes  from "./Pagination.module.css";

const Pagination = React.memo( (props) =>{
    let navItems = [];
    let end = 3;
    let start = 1;
    let classesFul = []
    let rows = Math.floor((props.usedPages-1)/ props.show)+1;
    let activePage = props.activePage;

     for(let i = 1 ; i <= rows ; i++){
        classesFul.push('col-xs-1 ');
        classesFul.push(classes.NavItem );
  

        if (i === activePage){
            classesFul.push( classes.Edit);
        }
     
        navItems.push(<div className={ classesFul.join(' ') }
         onClick= {props.clicked} key={i}>
             {start} - {end} 
         </div>)
        start += props.show;
        end += props.show;
        classesFul= []; 
    }
    return (<div className = {'row ' + classes.NavItems}>
            {navItems}
    </div>);
});


export default Pagination;