import React, { Component } from 'react';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { isAuthenticated } from './repository';
import { Navbar, Nav } from "react-bootstrap";

class App extends Component {

  logOut(){
    localStorage.removeItem('x-access-token');
  }
  
  render() {
    const authorize = isAuthenticated();
    
    return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/"><i class="fas fa-shopping-cart"></i> Shopping System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Products</Nav.Link>
              <Nav.Link href="/cart">ShoppingCart</Nav.Link>
              { (authorize) ? (<Nav.Link href="/checkout">Checkout</Nav.Link>): ''}
              
              {
                (authorize) ? 
                  (<a className="nav-item nav-link" href="/" onClick={this.logOut}>Log out</a>) : 
                  (<Nav.Link href="/login">Log in</Nav.Link>)
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
              <br/>
              <Route exact path="/" component={Products} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              { (!authorize) ? <Route exact path="/login" component={Login} /> : '' }
        </div>
      
      </Router>
    );
  }

// Route exact讓他分頁 

}
export default App;
