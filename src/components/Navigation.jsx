import React from "react";

import Axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "./Contexts/CartContext";

import { NavLink } from "react-router-dom";
import logo from "../resources/logo.png";

export var ItemsToCart = [];

var isCartOpen = false;
var isMenuOpen = false;
var mobile = false;

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

  //var currentUL = -1;
  function ul(index) {
    //currentUL = index;
    var underline = document.getElementById("underline");
    underline.style.transform = 'translate3d(' + index * 475 + '%,0,0)';
  }

  if(window.innerWidth < 650){
    mobile = true
  }

  
  useEffect(() => {
    if(mobile === false){
      const pName = window.location.pathname;

      if(pName === "/produktai"){ul(2)}
      else if(pName === "/contact"){ul(-1)}
      else if(pName === "/about"){ul(-2)}
    }
  });
  

  function removeItem(ID, Color){
    for(var i = 0; i < ItemsToCart.length; i++){
      if(ItemsToCart[i]['ID'] === ID && ItemsToCart[i]['Quantity'] > 1 && ItemsToCart[i]['Color'] === Color){
        ItemsToCart[i]['Quantity'] = ItemsToCart[i]['Quantity'] - 1;
        setCartItems([...ItemsToCart]);
        return(0);
      }
    }
    for(var i = 0; i < ItemsToCart.length; i++){
      if(ItemsToCart[i]['ID'] === ID && ItemsToCart[i]['Color'] === Color){
        ItemsToCart.splice(i, 1);
        setCartItems([...ItemsToCart]);
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
    Axios.post("http://88.222.61.118:6969/api/create-checkout-session", {
      items: cartItems
    }).then((response) => {
      if(response.status === 200){
        console.log(response.data['url'])
        window.location.href = response.data['url'];
      }
    })
  };

  return (
    <div id="Header">
        {mobile ? (
          <div id="NavMenu" className="acrylic">
            <div id="HButtons">
              <div id="Hamburger" onClick={toggleMenuWrapper}>
                <i class="fa-solid fa-bars"></i>
              </div>
              <NavLink to="/"> <button className="HButton"><img src={logo}></img></button> </NavLink>
              <button onClick={toggleWrapper} id="cart"><span><i className="fa-solid fa-cart-shopping">{cartItems.length}</i></span></button>
            </div>
          </div>
        ) : (
          <div id="NavMenu" className="acrylic">
            <div id="HButtons">
              <div id="underline"></div>
              <NavLink to="/about"> <button onClick={() => ul(-2)} className="HButton">Apie Mus</button> </NavLink>
              <NavLink to="/contact"> <button onClick={() => ul(-1)} className="HButton">Kontaktuoti</button> </NavLink>
              <NavLink to="/"> <button onClick={() => ul(0)} className="HButton"><img src={logo}></img></button> </NavLink>
              <NavLink to="/"> <button onClick={() => ul(1)} className="HButton">Užsakymai</button> </NavLink>
              <NavLink to="/produktai"> <button onClick={() => ul(2)} className="HButton">Produktai</button> </NavLink>
              <button onClick={toggleWrapper} id="cart"><span><i className="fa-solid fa-cart-shopping">{cartItems.length}</i></span></button>
            </div>
          </div>
        )}
        {mobile ? (
          <div id="MenuWrapper">
            <div className="cHeading">
              <span>Armilla</span>
              <a className="BA" href="#" rel="nofollow" onClick={toggleMenuWrapper}><i className="fa-solid fa-xmark"></i></a>
            </div>
            <NavLink to="/"> <button onClick={toggleMenuWrapper} className="MButton">Namai</button> </NavLink>
            <NavLink to="/produktai"> <button onClick={toggleMenuWrapper} className="MButton">Produktai</button> </NavLink>
            <NavLink to="/"> <button onClick={toggleMenuWrapper} className="MButton">Užsakymai</button> </NavLink>
            <NavLink to="/about"> <button onClick={toggleMenuWrapper} className="MButton">Apie Mus</button> </NavLink>
            <NavLink to="/contact"> <button onClick={toggleMenuWrapper} className="MButton">Kontaktuoti</button> </NavLink>
          </div>
        ):(
          <div></div>
        )}
        <div id="cartDiv">
          <div className="cHeading">
            <span>Pirkinių Krepšelis</span>
            <button className="BA" onClick={toggleWrapper}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div id="cartContent">
            {cartItems.map((item) => (
              <div className="cartItem">
                <div className="cartImgDiv">
                  <img src={item.Img}></img>
                </div>
                <div className="cartItemInfo">
                  <div className="cartItemNameDiv">
                    <span className="cartItemName">{item.Name} <span className="cartItemQuantity"> x{item.Quantity}</span></span>
                  </div>
                  <div className="cartItemDesc">
                    <span>{item.Size} <br /> {item.Color} | {item.Material} </span>
                  </div>
                  <div className="cartItemPrice"> {(item.Price * item.Quantity).toFixed(2)} € {(() => {
                    if(item.Quantity > 1) {return <span className="cartItemPriceOne"> | {item.Price} €</span>
                    }})()}</div>
                </div>
                <button onClick={() => removeItem(item.ID, item.Color)} className="itemRemoveBtn"><span><i className="fa-solid fa-xmark"></i></span></button>
              </div>
            ))}
          </div>
            <div id="cartFooter">
              <div id="cartTotal">
                <strong>SUMA:</strong>
                <span id="cartSum">{total.toFixed(2)} €</span>
              </div>
              <button id="checkoutBtn" onClick={CreateCheckoutSession}>SUSIMOKĖTI</button>
            </div>
        </div>
      <div className="Wrapper" onClick={toggleWrapper}></div>
      <div className="Wrapper" onClick={toggleMenuWrapper}></div>
    </div>
  );
}


      //<NavLink to="/">
      //  <img src={logo} />
      //</NavLink>
      //      <i className="fa fa-bars"></i>

export default Navigation;