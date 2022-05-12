import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import { CartContext } from "./Contexts/CartContext";
import { ItemsToCart } from "./Navigation";

import Mastercard from "../resources/Mastercard-Logo.png"
import Visa from "../resources/visa.png"

function Home() {
  const [ItemData, setData] = useState([]);
  const { setCartItems } = useContext(CartContext);

  const getData = () => {
    Axios.get("http://88.222.61.118:6969/api/Popular").then((response) => {
      setData(response.data);
    });
  };

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
    getData();
    AOS.init();
    AOS.refresh();
  }, []);

  var delay = 0;

  function getDelay(index){
    if(window.innerWidth >= 1200){
      delay = index * 300;
      return delay;
    }
    return 0
  }

  /*
  
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

  */

  return (
    <div className="App">
      <div className="intro">
        <h1 data-aos="fade-down-right">Armilla</h1>
        <h5 data-aos="fade-up-left">3D spausdintų daiktų parduotuvė ir paslaugų tiekėjas</h5>
      </div>

      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(240,248,255,0.7"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(240,248,255,0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(240,248,255,0.3)"
          />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(240,248,255)" />
        </g>
      </svg>

      <section className="py-0" id="features">
        <div className="container" data-aos="fade-up">
          <div className="st-0 flex text-center">
            <h5 className="st-1">SAVYBĖS</h5>
            <h2 className="st-2">Kodėl rinktis mus?</h2>
            <p>Kodėl mes geriausi mūsų srityje</p>
          </div>
        </div>
        <div className="container">
          <div className="flex" id="cardContainer">
            <div className="card" data-aos="zoom-in">
              <div className="cardMargin">
                <div className="cardHead">
                  <div className="BGI flex">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <h5>Investuojame atgal</h5>
                </div>
                <p>
                  dalis pelno yra investiojama atgal į Armilla,
                  taip geriname produktų kokybę ir svetainės funkcionalumą.
                </p>
              </div>
            </div>
            <div className="card" data-aos="zoom-in">
              <div className="cardMargin">
                <div className="cardHead">
                  <div className="BGI flex">
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <h5>Klausomės jūsų</h5>
                </div>
                <p>
                  Mes klausomės jūsų pastabų bei rekomendacijų ir remdamiesi
                  jomis nuolat bandome tobulėti.
                </p>
              </div>
            </div>
            <div className="card" data-aos="zoom-in">
              <div className="cardMargin">
                <div className="cardHead">
                  <div className="BGI flex">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>
                  <h5>inovuojame</h5>
                </div>
                <p>
                Eksperimentuojame su įvairiais produktų gavybos būdais,
                 testuojame įvairiausias liejimo medžiagas.
                </p>
              </div>
            </div>
            <div className="card" data-aos="zoom-in">
              <div className="cardMargin">
                <div className="cardHead">
                  <div className="BGI flex">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <h5>Investuojame atgal</h5>
                </div>
                <p>
                  90% ar daugiau viso pelno yra investiojama atgal į Armilla,
                  taip geriname produktų kokybę ir svetainės funkcionalumą.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <div className="container" data-aos="fade-up">
          <div className="st-0 flex text-center">
            <h5 className="st-1">PRODUKTAI</h5>
            <h2 className="st-2">Populiariausi produktai</h2>
            <p>Perkamiausi mūsų parduotuvės produktai</p>
          </div>
        </div>
        <div className="container">
          <div className="itemDivHome">
            {ItemData.map((item, index) => (
              <div className="itemContainer" data-aos="flip-left" data-aos-delay={getDelay(index)}>
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
                        <button className="price productPrice" onClick={() => {}}>{item.Price + item.Colors[0].Extra} €</button>
                          
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
      </section>
      <section className="flex" id="paymentOptSec">
        <div className="flex" id="paymentOpt">
          <img src={Mastercard} alt="" data-aos="fade-up" data-aos-delay="100"></img>
          <img src={Visa} alt="" data-aos="fade-up" data-aos-delay="200"></img>
        </div>
      </section>
      <div id="footer">
        2022 © Armilla.lt. All Rights Reserved.
      </div>
    </div>
  );
}

export default Home;
