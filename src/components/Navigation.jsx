import React from "react";

import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./Contexts/CartContext";

import { NavLink } from "react-router-dom";
import logo from "../resources/logo.png";

import {api} from "./Home.jsx";

export var ItemsToCart = [];

var isCartOpen = false;
var isMenuOpen = false;
export var mobile = false;

//too lazy to do these mobile resizings probably very simple but fix later
window.addEventListener('resize', function(event){
  if(window.innerWidth < 820){mobile = true}
  else { mobile = false}
});
if(window.innerWidth < 820){mobile = true} 
else { mobile = false}

export const toggleWrapper = () => {
  if (isCartOpen === false){
    document.getElementById("cartDiv").style.transform = 'translate(0)';
    document.getElementsByClassName("Wrapper")[0].classList = "Wrapper Open";
    isCartOpen = true;
  }
  else{
    document.getElementById("cartDiv").style.transform = 'translate(100%)';
    document.getElementsByClassName("Wrapper")[0].classList = "Wrapper";
    isCartOpen = false;
  }
}

function Navigation() {
  const {cartItems, setCartItems} = useContext(CartContext)
  const [checkoutOn, setCheckoutOn] = useState(false)

  //var currentUL = -1;
  function ul(index) {
    //currentUL = index;
    if(window.innerWidth > 820) { // check for mobile again cuz sometimes it's too slow to detect
      var underline = document.getElementById("underline");
      underline.style.transform = 'translate3d(' + index * 475 + '%,0,0)';
    }
  }

  
  useEffect(() => {
    var storedCartItems = JSON.parse(localStorage.getItem("CartItems")); 
    if(storedCartItems !== null && storedCartItems.length !== 0 && cartItems.length === 0){ItemsToCart = storedCartItems; setCartItems(storedCartItems)}
    // function above restores cart items from previous session

    if(window.innerWidth < 820){
      mobile = true
    } else {
      mobile = false
    }
    if(mobile === false){
      const pName = window.location.hash; // change this from hash to pathname when i finally figure out how to remove the hash
      if(pName.includes("produktai") || pName.includes("products")){ul(1)}
      else if(pName.includes("contact")){ul(-1)}
    }
  });
  

  function removeItem(ID, Color, param){

    for(let i = 0; i < ItemsToCart.length; i++){
      const conditionMoreThanOne = ItemsToCart[i].ID === ID && ItemsToCart[i].Quantity > 1 && ItemsToCart[i].Color === Color && ItemsToCart[i].Parameter === param
      const conditionOne = ItemsToCart[i].ID === ID && ItemsToCart[i].Quantity === 1 && ItemsToCart[i].Color === Color && ItemsToCart[i].Parameter === param

      if(conditionMoreThanOne){
        ItemsToCart[i].Quantity = ItemsToCart[i].Quantity - 1;
        setCartItems([...ItemsToCart]);
        localStorage.setItem("CartItems", JSON.stringify(ItemsToCart));
        return(0);
      }

      if(conditionOne){
        ItemsToCart.splice(i, 1);
        setCartItems([...ItemsToCart]);
        localStorage.setItem("CartItems", JSON.stringify(ItemsToCart));
        return(0);
      }
    }
  }

  var total = 0;

  if (ItemsToCart.length > 0){
    cartItems.map((item) => (
      total = total + item.Price * item.Quantity
    ))}

  function toggleMenuWrapper(){
    if (isMenuOpen === false){
      document.getElementById("MenuWrapper").style.transform = 'translate(0)';
      document.getElementsByClassName("Wrapper")[1].classList = "Wrapper Open";
      isMenuOpen = true;
    }
    else{
      document.getElementById("MenuWrapper").style.transform = 'translate(-100%)';
      document.getElementsByClassName("Wrapper")[1].classList = "Wrapper";
      isMenuOpen = false;
    }
  }

  const CreateCheckoutSession = () => {
    if(ItemsToCart.length !== 0){
      setCheckoutOn(true)

      Axios.post(`${api}/create-checkout-session`, {
        items: cartItems
      }).then((response) => {
        if(response.status === 200){
          localStorage.setItem("CartItems", null); // reset the saved cart items
          window.location.href = response.data['url'];
        }
      })
    }
  };

  function getItemCartCount(){
    var itemCount = 0;
    cartItems.map((item) => (
      itemCount = itemCount + item.Quantity
    ))
    return(itemCount)
  }

  return (
    <div id="Header">
        {mobile ? (
          <div id="NavMenu" className="acrylic">
            <div id="HButtons">
              <div id="Hamburger" onClick={toggleMenuWrapper}>
                <i className="fa-solid fa-bars"></i>
              </div>
              <NavLink to="/"> <button className="HButton"><img src={logo} alt="Armilla"></img></button> </NavLink>
              <div onClick={toggleWrapper} id="cart-btn-div">
                <div id="cart-icon-div"><i className="fa-solid fa-cart-shopping" /></div>
                <div id="cart-item-count">{getItemCartCount()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div id="NavMenu" className="acrylic">
            <div id="HButtons">
              <div id="underline"></div>
              <NavLink to="/contact"> <button onClick={() => ul(-1)} className="HButton">Kontaktuoti</button> </NavLink>
              <NavLink to="/"> <button onClick={() => ul(0)} className="HButton"><img src={logo} alt="Armilla"></img></button> </NavLink>
              <NavLink to="/produktai"> <button onClick={() => ul(1)} className="HButton">Produktai</button> </NavLink>
              <div onClick={toggleWrapper} id="cart-btn-div">
                <div id="cart-icon-div"><i className="fa-solid fa-cart-shopping" /></div>
                <div id="cart-item-count">{getItemCartCount()}</div>
              </div>
            </div>
          </div>
        )}
        {mobile ? (
          <div id="MenuWrapper">
            <div className="cHeading">
              <span>Armilla</span>
              <div className="BA" href="" rel="nofollow" onClick={toggleMenuWrapper}><i className="fa-solid fa-xmark"></i></div>
            </div>
            <NavLink to="/"> <button onClick={toggleMenuWrapper} className="MButton">Namai</button> </NavLink>
            <NavLink to="/produktai"> <button onClick={toggleMenuWrapper} className="MButton">Produktai</button> </NavLink>
            <NavLink to="/contact"> <button onClick={toggleMenuWrapper} className="MButton">Kontaktuoti</button> </NavLink>
          </div>
        ):(
          <div></div>
        )}
        <div id="cartDiv" className="rightMenu">
          <div className="cHeading">
            <span>Pirkinių Krepšelis</span>
            <button className="BA" onClick={toggleWrapper}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div id="cartContent">
            {cartItems.map((item) => (
              <div className="cartItem">
                <div className="cartImgDiv">
                  <img src={item.Img} alt=""></img>
                </div>
                <div className="cartItemInfo">
                  <div className="cartItemNameDiv">
                    <span className="cartItemName">{item.Name} <span className="cartItemQuantity"> x{item.Quantity}</span></span>
                  </div>
                  <div className="cartItemDesc">
                    {item.Material !== undefined ? 
                    (<span>{item.Size} <br /> {item.Color} | {item.Material} </span>)
                    : (<></>)}
                    {item.Parameter !== undefined ? (<span>{item.Parameter}</span>):(<></>)}
                  </div>
                  <div className="cartItemPrice"> {(item.Price * item.Quantity).toFixed(2)} € {(() => {
                    if(item.Quantity > 1) {return <span className="cartItemPriceOne"> | {item.Price} €</span>
                    }})()}</div>
                </div>
                <button onClick={() => removeItem(item.ID, item.Color, item.Parameter)} className="itemRemoveBtn"><span><i className="fa-solid fa-xmark"></i></span></button>
              </div>
            ))}
          </div>
            <div id="cartFooter">
              <div id="cartTotal">
                <strong>SUMA:</strong>
                <span id="cartSum">{total.toFixed(2)} €</span>
              </div>
              <button id="checkoutBtn" onClick={CreateCheckoutSession}>
              {checkoutOn ? (<div class="lds-dual-ring"></div>):(<div>SUSIMOKĖTI</div>)}
              </button>
            </div>
        </div>
      <div className="Wrapper" onClick={toggleWrapper}></div>
      <div className="Wrapper" onClick={toggleMenuWrapper}></div>
    </div>
  );
}

export default Navigation;