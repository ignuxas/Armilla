import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";

import "./Styles/productPage.css";

import Swiper, { Navigation, Thumbs, Zoom } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";

import {toggleWrapper} from "./Navigation"
import { CartContext } from "./Contexts/CartContext";
import { ItemsToCart } from "./Navigation"

var mainSwiper = null;
var thumbSwiper = null;
var mainImages = [];

var userItem = {};

var materialData = {
  "PLA Plastikas": <div className="text-content">
    <h3>PLA Plastikas</h3>
      PLA Plastiko produktai yra gaminami 3D spauzdintuvais. 3D spauzdintuvai 
      produktus lieja sluoksniais, todėl
      produktuose gali matytis plastiko liejimo linijos.<br/><br/>
      <span className="normal-bold">PLA privalumai</span> (lyginant su kitais plastikais) :
      <ul className="ul-size">
        <li>Didelis gaminių tikslumas</li>
        <li>Gaminių tvirtumas</li>
      </ul> <br></br>
      <span className="normal-bold">3D Spauzdintuvų nustatymai </span>:
      <ul className="ul-size">
        <li>Layer Height: 0.2mm<b>*</b></li>
        <li>Infill: 15%<b>*</b></li>
        <li>Wall Thickness: 2.5mm</li>
      </ul> <br></br>
      Simbolis <b>*</b> rodo, kad nustatymas priklauso nuo produkto.
      Nustatymo pakeitimo atvėju pakeitimas aprašomas produkto aprašyme.
    </div>,
  "Mediena": <div className="text-content">
  <h3>Mediena</h3>
    Miedienos produktai yra gaminami lazerio pjovimo staklėmis. Dėl lazerio kaitros
    galutio produkto pjovimo vitose gali matytis įdegis.

  </div>
}

function ProductPage() {
  const {setCartItems} = useContext(CartContext)
  const [ItemData, setData] = useState({});
  const [Images, setImages] = useState([]);
  const [checkoutOn, setCheckoutOn] = useState(false)

  const [searchParams] = useSearchParams();

  const fetchData = () => {
    Axios.post("http://localhost:8000/products/product", { itemID: searchParams.get("id") }).then((response) => {
      //getImages(response.data);
      setData(response.data);
      userItem = response.data;
    });
  };

  function getImages(data) {
    mainImages = []
    Axios.post("https://api.armilla.lt:8443/api/getImages", { id: searchParams.get("id") }).then((response) => {
      var extraImages = response.data

      var imagesDummy = [];
      var realImgCount = 0;

      data.Materials.map((mat) => { // map all materials
        mat.Colors.map((color) => { // map all colors from materials
          imagesDummy.push(color.Image); // push color image
          mainImages.push(realImgCount) // push main image index
            extraImages.map((eImg) => { // map all extra images
              if(eImg.ColorID === color.ColorID){ // if image is related to the color
                imagesDummy.push(eImg.Image); // push extra image if related to color
                realImgCount++ ;
              }
            })
          realImgCount++;
        })
      })
      setImages(imagesDummy)

      /*--------------------
        SWIPER
      -------------------*/

      Swiper.use([Navigation, Thumbs, Zoom]); // initialize swiper

      var swiperThumb = new Swiper(".imgSwiper2", {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
      });

      const swiper = new Swiper('.imgSwiper', {
        // Optional parameters
        direction: 'vertical',
        mousewheel: true,
        keyboardControl: true,

        autoplay: {
          delay: 1,
          disableOnInteraction: true,
        },

        thumbs: {
          swiper: swiperThumb,
        },
      });

      mainSwiper = swiper;
      thumbSwiper = swiperThumb;

      sizeCheck();
      });
  }


  function quantityManager(num){

    const el = document.getElementById("quantity-input") // quantity input element
    if(num !== undefined){ // if number to add is defined
      if(num === -1 && parseInt(el.value) < 2){
        return(0)
      } if(num === 1 && parseInt(el.value) > 19){
        return(0)
      } else {
        el.value = parseInt(el.value) + num;
        userItem.Quantity = parseInt(el.value)
      }
    }
    if(parseInt(el.value) > 0 && parseInt(el.value) <= 20){ // if value more than 0 and >= to 20
      userItem.Quantity = parseInt(el.value) // set user item quantity to the value of input
    } else if (parseInt(el.value) > 20) {
      el.value = 20;
      userItem.Quantity = 20;
    }
    setData({...userItem}); // update data
  }

  function manageMaterial(index){
    userItem.selectedMaterial = index; // set selected material
    userItem.selectedColor = 0; // reset selected color
    setData({...userItem}); // update data
    manageColor(0, index)
  }

  function manageColor(index, matIndex){
    if(matIndex !== undefined){
      if (matIndex > 0){
        if(mainImages[index + matIndex + 1] !== undefined){
          return mainSwiper.slideTo(mainImages[index + matIndex +1]);
        } else{
          return mainSwiper.slideTo(mainImages[index + matIndex]);
        }
      } else {
        return mainSwiper.slideTo(mainImages[index]);
      }
    }
    userItem.selectedColor = index; // set selected color
    setData({...userItem}) // update data
    return mainSwiper.slideTo(mainImages[index + ItemData.selectedMaterial]);
  }

  /* ------------------------
        CART / CHECKOUT
  -------------------------*/

  function addToCart() {
    if(ItemData.Quantity === undefined){ItemData.Quantity = 1} // set quantity if it's not set
    var DataForCart = {
      ID: ItemData.ID,
      Name: ItemData.Name,
      Price: ItemData.Price + ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Extra,
      Img: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Image,
      Quantity: ItemData.Quantity,
      ColorID: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].ColorID,
      Material: ItemData.Materials[ItemData.selectedMaterial].Name,
      Color: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Color,
      Size: ItemData.Sizes[0]
    }

    for(let i = 0; i < ItemsToCart.length; i++){
      var dummyItemsToCart = ItemsToCart;
      dummyItemsToCart.Quantity = DataForCart.Quantity; // make quantity the same so it does not compare them
        if(
        dummyItemsToCart[i].ID === DataForCart.ID &&
        dummyItemsToCart[i].ColorID === DataForCart.ColorID &&
        dummyItemsToCart[i].Material === DataForCart.Material &&
        dummyItemsToCart[i].Size === DataForCart.Size
        ){ // if there is the same thing in cart already then only add quanitity

        if(dummyItemsToCart[i].Quantity + DataForCart.Quantity > 20){
          DataForCart.Quantity = 20 - dummyItemsToCart[i].Quantity;
        } // check if total item quantity is equal or less than 20

        ItemsToCart[i].Quantity = ItemsToCart[i].Quantity + DataForCart.Quantity
        setCartItems([...ItemsToCart])
        toggleWrapper();
        localStorage.setItem("CartItems", JSON.stringify(ItemsToCart));
        return(0)
      }
    }
    ItemsToCart.push(DataForCart);
    setCartItems([...ItemsToCart]);
    localStorage.setItem("CartItems", JSON.stringify(ItemsToCart));
    toggleWrapper();
  }

  const CreateCheckoutSession = () => {
    if(ItemData.Quantity === undefined){ItemData.Quantity = 1} // set quantity if it's not set
    
    var DataForCart = {
      ID: ItemData.ID,
      Name: ItemData.Name,
      Price: ItemData.Price + ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Extra,
      Img: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Image,
      Quantity: ItemData.Quantity,
      ColorID: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].ColorID,
      Material: ItemData.Materials[ItemData.selectedMaterial].Name,
      Color: ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Color,
      Size: ItemData.Sizes[0]
    }

    setCheckoutOn(true)
    Axios.post("https://api.armilla.lt:8443/api/create-checkout-session", {
      items: [DataForCart]
    }).then((response) => {
      if(response.status === 200){
        window.location.href = response.data['url'];
      }
    })
  };

  /* ------------------------
            ON LOAD
  -------------------------*/

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  /* ------------------------
          Resizing
  -------------------------*/
  function sizeCheck(){
    var w = window.innerWidth;
    if(w <= 760){
      thumbSwiper.changeDirection('horizontal')
      mainSwiper.changeDirection('horizontal')
    } else {
      thumbSwiper.changeDirection('vertical')
      mainSwiper.changeDirection('vertical')
    };
  }

  window.addEventListener('resize', function(event){
    sizeCheck();
  });

  return (
    <div className="App">
      <div id="page-content">
      {Images[0] ? (
        <div id="img-frame">
          <div className="swiper imgSwiper2">
            <div className="swiper-wrapper">
              { Images.map((img) => { // display all images
                  return(
                    <div className="swiper-slide">
                      <img className="swiper-img" src={img} alt="" />
                    </div>
                    )
              })}
            </div>
          </div>

          <div className="swiper imgSwiper">
            <div className="swiper-wrapper">
              { Images.map((img) => { // display all images
                  return(
                    <div className="swiper-slide">
                      <img className="swiper-img" src={img} alt="" />
                    </div>
                    )
              })}
            </div>
          </div>
      </div>
      ):(<div id="img-frame" className="loading-frame">
        <div className="lds-ripple"><div></div><div></div></div>
      </div>)}
      {ItemData.Name ? ( //check if there is data
      <div id="params-frame">
        <div id="item-header">
            <h1><b>{ItemData.Name}</b></h1>
            <div>Įsivaizduokit čia žvaigždutes</div>
            {ItemData.Quantity > 1 ?
            (<div id="item-price">{((ItemData.Price + ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Extra) * ItemData.Quantity).toFixed(2)} €
              <span id="item-price-one">{ItemData.Price + ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Extra} € (Vieno produkto kaina)</span>
            </div>) :
            (<div id="item-price">{(ItemData.Price + ItemData.Materials[ItemData.selectedMaterial].Colors[ItemData.selectedColor].Extra)} €</div>)
            }
        </div>
        <div id="item-params">
          <div>
            <h6 className="param-name">Dydis</h6>
            <div id="item-sizes" className="variant-box">
              {ItemData.Sizes.map((size) => {
                return(<div className="variant variant-selected" key={size.ID}>{size}</div>)
              })}
            </div>
          </div>
          <div>
            <h6 className="param-name">Medžiaga</h6>
            <div id="item-materials" className="variant-box">
              {ItemData.Materials.map((mat, index) => (
                  index === ItemData.selectedMaterial ? ( // select default material
                    <div className="variant variant-selected" onClick={() => manageMaterial(index)}>{mat.Name}</div>
                  ) : (
                    <div className="variant" onClick={() => manageMaterial(index)}>{mat.Name}</div>
                  )
              ))}
            </div>
          </div>
          <div>
            <h6 className="param-name">Spalva</h6>
            <div id="item-colors" className="variant-box">
              {ItemData.Materials[ItemData.selectedMaterial].Colors.map((colorData, index) => (
                index === ItemData.selectedColor ? ( // select default color
                  <div className="variant variant-selected" onClick={() => manageColor(index)}>{colorData.Color}</div>
                ) : (
                  <div className="variant" onClick={() => manageColor(index)}>{colorData.Color}</div>
                )
              ))}
            </div>
          </div>

          <div>
            <h6 className="param-name" id="quantity-text">Kiekis</h6>
            <div id="quantity-input-box">
              <input type="text" id="quantity-input" onChange={() => quantityManager()} className="num-input" defaultValue="1" min="1" aria-label="quantity" pattern="[0-9]*" name="quantity" />
              <button className="input-button" id="input-add" onClick={() => quantityManager(1)}><i className="fa-solid fa-plus"></i></button>
              <button className="input-button" id="input-subtract" onClick={() => quantityManager(-1)}><i className="fa-solid fa-minus"></i></button>
            </div>
          </div>
        </div>
        <div id="buyBtns">
          <button id="addToCart" className="btn-simple" onClick={() => addToCart()}>Į krepšelį</button>

          {checkoutOn ? (<button id="buyNow" className="btn-simple btn-checkout-load"><div className="lds-dual-ring"></div></button>
          ) : (<button id="buyNow" className="btn-simple" onClick={() => CreateCheckoutSession()}>Pirkti dabar</button>)}

        </div>
        <div id="desc">
          <div id="item-description" dangerouslySetInnerHTML={{__html: ItemData.About}}></div>
          <div id="material-description">{materialData[ItemData.Materials[ItemData.selectedMaterial].Name]}</div>
          {ItemData.Credit ? (<div id="credit"><a href={ItemData.Credit} target="blank">Kreditai</a></div>)
          :(<></>)}
        </div>
      </div>)
      :
      ( // loading icon
      <div className="ItemDiv flex loading-frame" id="loading-frame-r"> 
        <div className="lds-ripple"><div></div><div></div></div>
      </div>)}
    </div>
    </div>
  );
}


export default ProductPage;
