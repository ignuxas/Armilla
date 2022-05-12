import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { useState } from "react";

import { CartContext } from "./Contexts/CartContext";
import { ItemsToCart } from "./Navigation"

import {toggleWrapper} from "./Navigation"

function Dekoracijos() {
  const [ItemData, setData] = useState([]);
  const { setCartItems } = useContext(CartContext);

  const getData = () => {
    Axios.get("http://88.222.61.118:6969/api/AllProducts").then((response) => {
      setData(response.data);
    });
  };


  //A very cancer way of adding items to the cart but works for now
  //! Need to fix
  const addItem = (ID, Name, Price, Size, Img, ColorID, Color, Material) => {
    for(var i = 0; i < ItemsToCart.length; i++){
      if(ItemsToCart[i]['ID'] === ID && ItemsToCart[i].ColorID === ColorID){
        ItemsToCart[i]['Quantity'] = ItemsToCart[i]['Quantity'] + 1;
        setCartItems([...ItemsToCart])
        return(0);
      }
    }
    ItemsToCart.push(
      {
        ID: ID,
        Name: Name,
        Price: Price,
        Img: Img,
        Quantity: 1,
        ColorID: ColorID,
        Material: Material,
        Color: Color,
        Size: Size
      }
    )
    setCartItems([...ItemsToCart])
  }

  //need to rework these color changing functions cuz this a little unstable
  function selectedData(ID, itemID, type){
    var ItemEl = document.getElementsByClassName("itemContainer")[ID];
    var colors = ItemEl.getElementsByClassName("Color")
    for(var i = 0; i < colors.length; i++){
      if(type === 'img'){
        return(ItemEl.getElementsByClassName("product-img")[0]).src;
      }
      var CColor = colors[i].classList.toString();
      if(CColor.includes("Selected") === true){
        if(type === "color"){return CColor.split(" ")[1]}
        else{
          for(var j = 0; j < ItemData.length; j++){
              if(ItemData[j].ID === itemID){
                for(var k = 0; k < ItemData[j].Colors.length; k++){
                  if(ItemData[j].Colors[k].Color === CColor.split(" ")[1]){
                    if(type === "Material"){
                      return(ItemData[j].Colors[k].Material)
                    }
                    else if (type === "colorID"){
                      return(ItemData[j].Colors[k].ColorID)
                    }
                    else if (type === "payExtra"){
                      return(ItemData[j].Colors[k].Extra)
                    }
                }
              }
            }
          }
        }
      }
    }
  }

  function selectColor(id, itemID, price, color, material, img){
    var ItemEl = document.getElementsByClassName("itemContainer")[id];
    var colors = ItemEl.getElementsByClassName("Color")
    for(var i = 0; i < colors.length; i++){
      var CColor = colors[i].classList.toString();
      colors[i].classList = "Color " + CColor.split(" ")[1];
    }
    //Add a "Selected" class to the selected color in the color pannel
    ItemEl.getElementsByClassName("Color " + color)[0].classList = "Color " + color + " Selected";
    //Change image according to color
    ItemEl.getElementsByClassName("product-img")[0].src = img;
    ItemEl.getElementsByClassName("matName")[0].innerHTML = " | " + material;
    //ItemEl.getElementsByClassName("price")[0].innerHTML = selectedData("payExtra");
    ItemEl.getElementsByClassName("productPrice")[0].innerHTML = price + selectedData(id, itemID, "payExtra") + " €"
  }


  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="ContentItems">
      <div className="ItemDiv">
        {ItemData.map((item, index) => (
          <div className="itemContainer">
            <div className="itemCard">
              <div className="itemCard-head flex">
                  <img src={item.Colors[0].Image} alt="Product" className="product-img" />
                  <span className="back-text">ARM <br /> ILLA</span>
              </div>
              <div className="itemCard-body">
                <div className="product-desc">
                  <span className="product-title">
                    {item.Name}
                    <span className="badge">Nauja</span>
                  </span>
                  <span className="product-caption">
                    {item.Category}
                  </span>
                  <span className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star grey"></i>
                  </span>
                  <div className="product-about">
                    <h4>APIE</h4>
                    <span>{item.About}</span>
                  </div>
                </div>
                  <div className="product-properties">
                    <span className="product-size">
                      <h4>DYDIS</h4>
                      <div className="product-sizes">
                        {item.Sizes.map((size) => (
                          <div className="size flex chosen">{size}</div>
                        ))}
                      </div>
                    </span>
                    <span className="product-color">
                      <h4>Spalva<span className="matName"> | {item.Colors[0].Material}</span></h4>
                      <div className="colorPallete">
                        {item.Colors.map((colorData, index2) => (
                          index2 === 0 ? (
                            <div onClick={() => selectColor(index, item.ID, item.Price, colorData.Color, colorData.Material, colorData.Image)} className={"Color " + colorData.Color + " Selected"}></div>
                          ) : (
                            <div onClick={() => selectColor(index, item.ID, item.Price, colorData.Color, colorData.Material, colorData.Image)} className={"Color " + colorData.Color}></div>
                          )
                        ))}
                      </div>
                    </span>
                    <div className="flex orderDiv">
                        <button className="price productPrice" onClick={() => {addItem(
                        item.ID,
                        item.Name, 
                        item.Price + selectedData(index, item.ID, "payExtra"), 
                        item.Sizes[0], //Size
                        selectedData(index, item.ID, "img"), //Selected item's image
                        selectedData(index, item.ID, "colorID"),
                        selectedData(index, item.ID, "color"), // Selected color
                        selectedData(index, item.ID, "Material")
                        ); toggleWrapper()}}>{item.Price + item.Colors[0].Extra} €</button>
                        
                        <button className="price productAddToCart flex" onClick={() => {addItem(
                        item.ID,
                        item.Name, 
                        item.Price + selectedData(index, item.ID, "payExtra"), 
                        item.Sizes[0], //Size
                        selectedData(index, item.ID, "img"), //Selected item's image
                        selectedData(index, item.ID, "colorID"),
                        selectedData(index, item.ID, "color"), // Selected color
                        selectedData(index, item.ID, "Material")
                        );}}><i className="fa-solid fa-cart-arrow-down"></i></button>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//{selectColor(index, item.Colors[0].Color, item.Colors[0].Image)}

export default Dekoracijos;
