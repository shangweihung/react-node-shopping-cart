import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';

class Cart extends Component {
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

        getCartProducts(cart).then((products) => {
            let total =0;
            for (let i=0; i<products.length; i++){
                total += products[i].price * products[i].qty;
            }
            this.setState({
                products: products,
                total: total.toFixed(2)
            })
        })
    }

    removeFromCart = product => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[product.id.toString()];  // delete clicked item
        localStorage.setItem('cart', JSON.stringify(cart));

        let total = this.state.total - product.price * product.qty;
        let products = this.state.products.filter((item) => item.id!== product.id);
        this.setState({
            products: products,
            total: total.toFixed(2)
        })
    }


    clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	}

    render() {
        const { products, total } = this.state
        return (
            <div className="container mt-5">
                <h1 className="card-title">Shopping Cart</h1>
                <hr />
                {
                    products.map((product,index) => <CartItem product={product} 
                                                              key={index} 
                                                              remove={this.removeFromCart} />)
                }
                <hr />
                { products.length ? 
                    <div><h4>Total Amount: {total}</h4></div>: 
                    <div><h3 className="text-warning">No Item in the Shopping Cart</h3></div>}
                
                <button className="btn btn-outline-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
                <Link to="/checkout"><button className="btn btn-outline-success float-right" style={{marginRight: "15px"}}>Checkout</button></Link>
                <Link to="/"><button className="btn btn-outline-info float-right" style={{marginRight: "15px"}}>Go Back</button></Link>
                
                <br /><br />
            </div>
        );
    }
}

export default Cart;