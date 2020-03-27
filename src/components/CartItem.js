import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    render() {
        const {product} = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <h5 className="card-text">Prices: ${product.price}</h5>
                    <span className="card-text text-success">quantity: {product.qty}</span>

                    <button className="btn btn-sm btn-outline-warning float-right" onClick={() =>this.props.remove(product)}>Delete</button>
                </div>
            </div>
        );
    }


}

export default CartItem;