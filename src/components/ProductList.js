import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';


export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentWillMount() {
		getProducts().then((products) => {
	      this.setState({ products });
	    });
	}

	render() {
		const { products } =  this.state;
		return (
			<div className=" container mt-5">
				<h1 className="card-title">Chocolate Products List</h1>
				<hr/>
				{
					products.map((product, index) => 
                                <ProductItem 
                                        product={product} 
                                        key={index}
                                />)
				}
				<hr/>
				<Link to="/checkout"><button className="btn btn-outline-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-outline-primary float-right" style={{  marginRight: "15px" }}>Cart</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}
