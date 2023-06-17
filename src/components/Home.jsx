import React, { useEffect, useState} from "react";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import Mastercard from "../resources/Mastercard-Logo.png"
import Visa from "../resources/visa.png"

import { Link } from "react-router-dom";

import { changeImage } from "./Products";

import { Gradient } from "whatamesh";

export const api = "https://armillaapi.ignuxas.com"

function Home() {
  const [ItemData, setData] = useState([]);

  var colorCount = 0;

  const getData = () => {
    Axios.get(`${api}/products/popular`).then((response) => {
      setData(response.data);
    });
  };

  const gradient = new Gradient()

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    AOS.init();
    AOS.refresh();
    
    gradient.initGradient('#gradient-canvas')
  }, []);

  return (
    <div className="App">
      <div id="intro">
        <div id="introText">
          <div>
            <h1>Armilla</h1>
            <p>3D Spauzdinimo, Medžio pjovimo ir kitų 
              technologijų produktų gamintojas numeris vienas</p>
          </div>
          <div id="introBtnContainer">
            <Link to="/produktai">
              <button className="btn btn-primary">Produktai <i className="fa-solid fa-chevron-right"></i></button>
            </Link>
            <Link to="/contact">
              <button className="btn btn-secondary">Susisiekite <i className="fa-solid fa-chevron-right"></i></button>
            </Link>
          </div>
        </div>
        <canvas id="gradient-canvas" data-transition-in></canvas>
      </div>

      <section className="py-0" id="introduction">
        <div className="container">
          <div className="st-0 flex text-center">
            <h5 className="st-1">ARMILLA.LT</h5>
            <h2 className="st-2">Kas mes?</h2>
            <p>Kokias paslaugas teikiame bei kokiais produktais prekiaujame</p>
          </div>
          <div className="container" id="introContainer">
            <div className="introduction" data-aos="fade-right">
              <div>
                <p>Mūsų parduotuvėje galite rasti įvairių dekoracijų, dovanų idėjų, bei gyvenimą palengvinančių produktų.</p>
                <p>
                  Taip pat 3D Spausdiname ir pjauname lazerinėmis staklėmis pagal užsakymą
                   - Galite užsisakyti
                  daiktus, kurių nėra mūsų parduotuvėje.
                </p>
                <p>Visos mūsų prekės prieš išsiuntimą yra patikriniamos dėl defektų, todėl garantuojame, kad gausite
                  tik aukštos kokybės produktus.
                  Klausomės jūsų kritikos bei rekomendacijų ir visuomet bandome gerinti mūsų produktų kokybę. </p>
                <p className="margin0">Dauguma mūsų produktų yra gaminami 3D Spausdintuvais bei lazerinėmis staklėmis.</p>
              </div>
            </div>
            <div className="blobDiv" data-aos="fade-left">
              <div className="blob"></div>
            </div>
          </div>
        </div>

      </section>

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
                  Dalis pelno yra investiojama atgal į Armilla,
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
                  <h5>Inovuojame</h5>
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
                  <i className="fa-solid fa-box-open"></i>
                  </div>
                  <h5>Garantuojame kokybę</h5>
                </div>
                <p>
                  Visi parduodami produktai yra peržiūrimi komandos narių,
                  įsitikinti jų kokybe, teikiame 14 dienų garantiją.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0" id="PopProducts">
        <div className="container" data-aos="fade-up">
          <div className="st-0 flex text-center">
            <h5 className="st-1">PRODUKTAI</h5>
            <h2 className="st-2">Populiariausi produktai</h2>
            <p>Perkamiausi mūsų parduotuvės produktai</p>
          </div>
        </div>
        <div className="container">
          <div className="itemDivHome">
            {ItemData.map((Item, itemIndex) => (
              <div className="item-card-wrapper" data-aos="zoom-in" data-aos-delay={itemIndex * 100} key={itemIndex}>
                <div className="item-card">
                  <Link to={"/products?id=" + Item.ID}>
                    <div className="item-img">
                        {Item.Options.Materials !== undefined ? (
                        <img
                          className="img"
                          src={Item.Options.Materials[0].Colors[0].Image}
                          alt=""/>) : 
                        ( Item.Image === undefined ? (<img
                          className="img"
                          src={Item.Options.Parameters[0].Image}
                          alt="" /> )
                          : (<img
                          className="img"
                          src={Item.Image}
                          alt="" />))}
                      <div className="review-popup-wrapper">
                        <div className="review-popup">
                          <span><i className="fa-solid fa-cart-shopping"></i>Peržiūreti</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="item-info">
                      <div className="item-name">
                        <Link to={"/products?id=" + Item.ID}>{Item.Name}</Link>
                      </div>
                      <div className="item-price">
                          <p>{Item.Price} €</p>
                      </div>
                  </div>
                  {Item.Options.Parameters !== undefined ? /* If the item has Parameters */ (<> 
                    {Item.Options.Parameters.length > 1 ? (
                      <div className="Options">
                        {Item.Options.Parameters.map((Parameter, index) => {
                          if(index < 4){ // If there are more than 4 parameters, show only 4
                            return <div className="Option" onMouseOver={() => changeImage(itemIndex, Parameter.Image)}><img src={Parameter.Image}></img> <div className="tooltiptext">{Parameter.ParamName}</div></div>
                          }
                        })} 
                      { // If there are more than 4 parameters, show how many more
                        Item.Options.Parameters.length > 4 ? (<span> + {Item.Options.Parameters.length - 4}</span>):(<></>) 
                      }
                    </div>
                    ):(<></>)}
                  </>) : (<> 
                    {Item.Options.Materials !== undefined ? ( /* If the item has Materials */
                      <>
                      {Item.Options.Materials.length > 1 || Item.Options.Materials[0].Colors.length > 1 ? /*Check if It has more than 1 option*/(
                        <div className="Options">
                          {Item.Options.Materials.map((Material, matIndex) => (
                            <>
                              {Material.Colors.map((Color, colorIndex) => {
                                if(colorIndex == 0 && matIndex == 0){colorCount = 0}
                                colorCount++;
                                if(colorCount < 4){
                                  return <div className="Option" onMouseOver={() => changeImage(itemIndex, Color.Image)}><img src={Color.Image}></img> <div className="tooltiptext">{Color.ColorText}</div></div>
                                }
                              })}
                            </>
                            ))}
                        </div>
                      ):(<></>)}
                      {
                        colorCount > 4 ? (<span> + {colorCount - 4}</span>):(<></>)
                      }
                      </>
                    ):( <></>)} </>)/* ------END------- */}
                </div>
              </div>
          ))}
          </div>
        </div>
      </section>
      <section className="flex" id="paymentOptSec">
        <div className="flex" id="paymentOpt">
          <img src={Mastercard} alt="" data-aos="zoom-in"></img>
          <img src={Visa} alt=""data-aos="zoom-in" data-aos-delay="100"></img>
        </div>
      </section>
    </div>
  );
}

export default Home;
