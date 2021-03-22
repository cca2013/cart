import React, { Component } from "react";
//asdfafdadsf
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import PayPalBtn from '../components/PayPalButton';

import ReactDOM from 'react-dom';
  const CLIENT = {
  sandbox: 'ARDbx3MuUA109TlhAhTpM_TXWomh-m2laUm4WEOHkk9ykhT0A8ioQS2mKKqPnMl3FVUsWoabU99Ammqv',
  production: '',
};
 
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';


    const onSuccess = (payment) =>
    console.log('Successful payment!', payment);
 
    const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
 
    const onCancel = (data) =>
    console.log('Cancelled payment!', data);
    
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
	 
    };


  }

refreshPage(e) {
    window.location.reload();
  }
  
  handleCart(e) {
    e.preventDefault();
	   document.getElementById("paypal").innerHTML = ""
	 //ReactDOM.render(null, document.getElementById('paypal'));
    this.setState({
      showCart: !this.state.showCart
	  
    });

  }
  
  
  
  handleSubmit(e) {
    e.preventDefault();
  }
  
    
  
handlePaypal(e) 
{
  e.preventDefault();
   
	   
    const onSuccess = (payment) =>
    console.log('Successful payment!', payment);
 
    const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
 
    const onCancel = (data) =>
    console.log('Cancelled payment!', data);
	
	  const element= 
        <PayPalBtn
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'EUR'}
          total={this.props.total}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
		
		
	const b= <button
                  type="button"		
				  onClick={this.refreshPage.bind(this)}    
               />
ReactDOM.render(element, document.getElementById('root'));



}
  
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  
  
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  
  
  
  
  
  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
		
          <a
            className="product-remove"
            href="#"
			  onClick={this.props.removeProduct.bind(this, product.id)}			 
			>
            ×
          </a>
		
	

			
        </li>
		
		
      );
    });
	
		
			
	
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
              alt="Veggy Brand Logo"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Vegetables and Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
				
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
			  
                  
			
             <div className="action-block">
	<table>		
	<tbody><tr>
	 <td>CHECKOUT with PAYPAL:  </td>
			 <td>
          <PayPalBtn
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'EUR'}
          total={this.props.total}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        /></td>
		</tr>
		</tbody>
		
        </table>
				
         
			<div id='paypal'>
				</div>
				
				
				
              </div>
            </div>
          </div>
        </div>
			
      </header>
    );
  }
}

export default Header;
