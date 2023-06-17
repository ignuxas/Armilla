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

import {api} from "./Home.jsx";

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
  const {cartItems, setCartItems} = useContext(CartContext)
  const [ItemData, setData] = useState({});
  const [Images, setImages] = useState([]);
  const [checkoutOn, setCheckoutOn] = useState(false)

  const [selectedSizeID, setSelectedSizeID] = useState(0)
  const [selectedMaterialID, setSelectedMaterialID] = useState(0);
  const [selectedColorID, setSelectedColorID] = useState(0);
  const [selectedParameterID, setSelectedParameterID] = useState(0);

  const [searchParams] = useSearchParams();

  const fetchData = () => {
    Axios.post(`${api}/products/product`, { itemID: searchParams.get("id") }).then((response) => {
      getImages(response.data);
      setData(response.data);
      userItem = response.data;
    });
  };

  const Specs = { // Have to make this make the keys automatically
    MaterialID: selectedMaterialID,
    SizeID: selectedSizeID,
    ColorID: selectedColorID,
    ParameterID: selectedParameterID
  }

  function getImages(data) {
    mainImages = []

    var imagesDummy = [];

    var realImgCount = 0;
    if(data.Options.Materials !== undefined) {
      data.Options.Materials.map((mat) => {
        mat.Colors.map((color) => {
          imagesDummy.push(color.Image)
          mainImages.push(realImgCount)

          color.ExtraImages.map((extraImg) => {
            imagesDummy.push(extraImg)
            realImgCount++
          })

          realImgCount++
        })
      })
    } else if(data.Options.Parameters !== undefined) {
      data.Options.Parameters.map((param) => {
        imagesDummy.push(param.Image)
        mainImages.push(realImgCount)

        param.ExtraImages.map((extraImg) => {
          imagesDummy.push(extraImg)
          realImgCount++
        })
        realImgCount++
      })
    }

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
  }


  const getPrice = (selectedMaterialID, selectedColorID, selectedSizeID, selectedParameterID) => {

    if(ItemData.Options.Materials !== undefined){
      var colorExtra = 0;
      ItemData.Options.Materials[selectedMaterialID].Colors.map((color) =>{
        if(color.ColorID === selectedColorID){colorExtra = color.Extra}
      })
      return (ItemData.Price 
        + ItemData.Options.Materials[selectedMaterialID].Extra 
        + colorExtra
        + ItemData.Options.Sizes[selectedSizeID].Extra
        )
    } else if (ItemData.Options.Parameters !== undefined){
      return ItemData.Price + ItemData.Options.Parameters[selectedParameterID].Extra;
    }
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

  function manageMaterial(materialID, colorID){
    setSelectedMaterialID(materialID)
    manageColor(colorID)
  }

  function manageColor(colorID){
    setSelectedColorID(colorID)
    return mainSwiper.slideTo(mainImages[colorID]);
  }

  function manageParameter(paramID){
    setSelectedParameterID(paramID)
    return mainSwiper.slideTo(mainImages[paramID]);
  }

  /* ------------------------
        CART / CHECKOUT
  -------------------------*/

  function addToCart() {
    if(ItemData.Quantity === undefined){ItemData.Quantity = 1} // set quantity if it's not set

    var currentImg = "";
    var currentColorName = undefined;

    if(ItemData.Options.Materials !== undefined){
      ItemData.Options.Materials[selectedMaterialID].Colors.map((color) =>{
        if(color.ColorID === selectedColorID){
          currentImg = color.Image;
          currentColorName = color.ColorText;
        }
      })
    } else if (ItemData.Options.Parameters !== undefined) {
      currentImg = ItemData.Options.Parameters[selectedParameterID].Image
    }

    function getMaterial(){
      if(ItemData.Options.Materials !== undefined){return ItemData.Options.Materials[selectedMaterialID].Material}
      else return undefined
    }
    function getSize(){
      if(ItemData.Options.Sizes !== undefined){return (ItemData.Options.Sizes[selectedSizeID].Length + " x " + ItemData.Options.Sizes[selectedSizeID].Height + " x " + ItemData.Options.Sizes[selectedSizeID].Width + " mm")}
      else return undefined
    }
    function getParameter(){
      if(ItemData.Options.Parameters !== undefined){return ItemData.Options.Parameters[selectedParameterID].ParamName}
      else return undefined
    }

    var DataForCart = {
      ID: ItemData.ID,
      Name: ItemData.Name,
      Price: getPrice(selectedMaterialID, selectedColorID, selectedSizeID, selectedParameterID),
      Img: currentImg,
      Quantity: ItemData.Quantity,
      Material: getMaterial(),
      Color: currentColorName,
      Size: getSize(),
      Parameter: getParameter(),
      Specs: Specs
    }

    for(let i = 0; i < ItemsToCart.length; i++){
      var dummyItemsToCart = ItemsToCart;
      dummyItemsToCart.Quantity = DataForCart.Quantity; // make quantity the same so it does not compare them
      if(
        dummyItemsToCart[i].ID === DataForCart.ID &&
        dummyItemsToCart[i].Color === DataForCart.Color &&
        dummyItemsToCart[i].Material === DataForCart.Material &&
        dummyItemsToCart[i].Size === DataForCart.Size &&
        dummyItemsToCart[i].Parameter === DataForCart.Parameter
        ){ // if there is the same thing in cart already then only add quanitity

        if(dummyItemsToCart[i].Quantity + DataForCart.Quantity > 20){
          DataForCart.Quantity = 20 - dummyItemsToCart[i].Quantity;
        } 

        // check if total item quantity is equal or less than 20
        ItemsToCart[i].Quantity = ItemsToCart[i].Quantity + DataForCart.Quantity

        setCartItems([...ItemsToCart])
        toggleWrapper();
        
        // send cart items to local storage so if user re-enters site there are still items in the shopping cart from last time
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
      Quantity: ItemData.Quantity,
      Specs: Specs
    }

    setCheckoutOn(true)
    Axios.post(`${api}/create-checkout-session`, {
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
            (<div id="item-price">{(
              getPrice(selectedMaterialID, selectedColorID, selectedSizeID, selectedParameterID) * ItemData.Quantity).toFixed(2)} €
              <span id="item-price-one">{getPrice(selectedMaterialID, selectedColorID, selectedSizeID, selectedParameterID)} € (Vieno produkto kaina)</span>
            </div>) :
            (
              ItemData.Price !== undefined ? (
            <div id="item-price">{getPrice(selectedMaterialID, selectedColorID, selectedSizeID, selectedParameterID)} €</div>
              ):(<></>))
            }
        </div>
        <div id="item-params">
          {ItemData.Options.Sizes !== undefined ? (
          <div>
            <h6 className="param-name">Dydis</h6>
            <div id="item-sizes" className="variant-box">
              {ItemData.Options.Sizes.map((size) => (
                selectedSizeID === size.SizeID ? 
                (<div className="variant variant-selected">{size.Length} x {size.Height} x {size.Width} mm</div>) : 
                (<div className="variant" onClick={() => setSelectedSizeID(size.SizeID)}>{size.Length} x {size.Height} x {size.Width} mm</div>)
              ))}
            </div>
          </div>) : (<></>)}
          {ItemData.Options.Materials !== undefined ? (
          <>
            <div>
              <h6 className="param-name">Medžiaga</h6>
              <div id="item-materials" className="variant-box">
                {ItemData.Options.Materials.map((mat) => (
                    selectedMaterialID === mat.MaterialID ? // select default material
                    ( <div className="variant variant-selected" onClick={() => manageMaterial(mat.MaterialID, mat.Colors[0].ColorID)}>{mat.Material}</div>) : 
                    ( <div className="variant" onClick={() => manageMaterial(mat.MaterialID, mat.Colors[0].ColorID)}>{mat.Material}</div>)
                ))}
              </div>
            </div>
            <div>
              <h6 className="param-name">Spalva</h6>
              <div id="item-colors" className="variant-box">
                {ItemData.Options.Materials[selectedMaterialID].Colors.map((colorData) => (
                  selectedColorID === colorData.ColorID ? // select default color
                  (<div className="variant variant-selected" onClick={() => manageColor(colorData.ColorID)}>{colorData.ColorText}</div>) : 
                  (<div className="variant" onClick={() => manageColor(colorData.ColorID)}>{colorData.ColorText}</div>)
                ))}
              </div>
            </div>
          </>
          ) : (<></>)}

          {ItemData.Options.Parameters !== undefined ? (
          <div>
            <h6 className="param-name">Parametrai</h6>
            <div id="item-sizes" className="variant-box">
              {ItemData.Options.Parameters.map((param) => (
                selectedParameterID === param.ParamID ? 
                (<div className="variant variant-selected">{param.ParamName}</div>) : 
                (<div className="variant" onClick={() => manageParameter(param.ParamID)}>{param.ParamName}</div>)
              ))}
            </div>
          </div>) : (<></>)}

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
          {ItemData.Options.Materials !== undefined ? (<div id="material-description">{materialData[ItemData.Options.Materials[selectedMaterialID].Material]}</div>):
          (<div id="material-description" dangerouslySetInnerHTML={{__html: ItemData.Options.Parameters[selectedParameterID].About}}></div>)}
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
