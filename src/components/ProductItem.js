import React from 'react';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    

	addToCart = () => {

		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	render(){
		const { product } = this.props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
				<div className="row no-gutters">
					<div className="col-md-3">
						<img class="card-img center" src={product.image} alt="Img" style={{height: "300px"}}></img>
					</div>
					<div className="col-md-9">
						<div className="card-body">
							<h3 className="card-title">{product.name}</h3>
							<p className="card-text">{product.description}</p>
							<h4 className="card-text"><small>price: </small>${product.price}</h4>
							<h4 className="card-text"><small>Available Quantity: </small>{product.available_quantity}</h4>
							
							{ product.available_quantity > 0 ?
								<div>
									<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
									<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
								</div> : 
								<p className="text-danger float-right"><i>Out of Stock</i></p>
							}

						</div>
					</div>
				
				</div>
			</div>
		)
	}
}
