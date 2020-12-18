import React, { Component } from "react";
import OrderItem  from "../../components/OrderItem/OrderItem";
import { connect } from "react-redux";


class Order extends Component{
    state = {
        orders: []
    }

    componentDidMount(){
        const  updatedOrders = this.state.orders;
        updatedOrders.push( this.props.location.state);
       this.setState({orders : updatedOrders});
    }

    render(){
        let orders = null;
              orders = this.state.orders.map((order, ind) =>{
               return  order.map((sing, ind2)=>{

                return  <OrderItem key = {ind +''+ ind2} teams = {sing.teams} />
            });

            });   
        
     
    
        return (
            <React.Fragment>
                {orders}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        orders: state.order.orders
    };
};

export default connect(mapStateToProps) (Order);