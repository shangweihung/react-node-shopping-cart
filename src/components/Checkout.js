import React, { Component } from 'react';
import { isAuthenticated, getCartProducts } from '../repository';
import {  Redirect, Link } from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total: 0
        }
    }

    componentWillMount() {
		let cart = localStorage.getItem('cart');
        if (!cart) return; 
        
        getCartProducts(cart)
            .then((products) => {
                let total = 0;
                for (var i = 0; i < products.length; i++) {
                    total += products[i].price * products[i].qty;
                }
	    	this.setState({ 
                products: products, 
                total:total
             });
	    });
    }
    

    render() {
        // make sure to login before pay
        if (!isAuthenticated()) {
            return (<Redirect to='/login' />);
        }

        const { products, total } = this.state;

        return (
            <div className=" container mt-5">
				<h3 className="card-title">Checkout</h3>
				<hr/>
				{
					products.map((product, index) => 
						<div key={index}>
							<p>
								{product.name} 
								 <span style={{color: "red"}}>(quantity: {product.qty})</span>
								<span className="float-right text-primary">${product.qty * product.price}</span>
							</p>
						</div>
					)
				}
				<hr/>
				{ products.length ? 
                    <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>:  
                    <h3 className="text-warning">No item to be Checkout</h3> }
				{ products.length ? <button className="btn btn-success float-right" onClick={() => alert('Are you sure to pay')}>Pay</button>: '' }
				<Link to="/"><button className="btn btn-danger float-right" style={{ marginRight: "10px" }}>Cancel</button></Link>
				<br/><br/><br/>
			</div>
        );

    }
}

export default Checkout;