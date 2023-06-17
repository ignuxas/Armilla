import React, {useEffect} from "react";
import Axios from "axios";
import {useState} from "react";

import {Link} from "react-router-dom";

import {api} from "./Home.jsx";

import "./Styles/product-card.css";
import "./Styles/productsMain.css";

export function changeImage(itemIndex, imgSrc) {
  document.getElementsByClassName("item-card-wrapper")[itemIndex].getElementsByClassName("img")[0].src = imgSrc;
}

function Products() {
  const [ItemData, setData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    Main: null,
    Sub: null,
  });
  const [currentSort, setSort] = useState({"Popularity": -1});

  var colorCount = 0;
  var isFilterMenuOpen = false;

  var ProductAmount = 9;

  const showSortMenu = () => {
    document.getElementById("SortMenu").classList.toggle("show");
    document.getElementById("FilterIcon").classList.toggle("show");
  };

  const getData = (Category, ItemCount) => {
    setCurrentCategory({Main: Category.Main, Sub: Category.Sub});
    setData([]);

    Axios.post(`${api}/products/preview`, {
      Category: Category,
      ItemCount: ItemCount,
      SortBy: currentSort
    }).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData(currentCategory, ProductAmount);
  }, []);
  useEffect(() => {
    getData(currentCategory, ProductAmount)
  }, [currentSort]);

  const toggleFilterWrapper = () => {
    if (isFilterMenuOpen === false){
      document.getElementById("filterDiv").style.transform = 'translate(0)';
      document.getElementsByClassName("Wrapper")[2].classList = "Wrapper Open";
      isFilterMenuOpen = true;
    }
    else{
      document.getElementById("filterDiv").style.transform = 'translate(100%)';
      document.getElementsByClassName("Wrapper")[2].classList = "Wrapper";
      isFilterMenuOpen = false;
    }
  }

  return (
    <div>
      <div id="filterDiv" className="rightMenu">
        <div className="cHeading">
          <span>Kategorijos</span>
          <button className="BA" onClick={toggleFilterWrapper}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div id="filterContent">
          <div className="categoryMain" onClick={() => {getData({Main: null, Sub: null}, 16); toggleFilterWrapper()}}>Visi Produktai</div>
          <div className="categoryMain" onClick={() => {getData({Main: "3D Spausdinimas / Medžio Pjovimas", Sub: null}, ProductAmount); toggleFilterWrapper()}}>3D Spausdinimas / Medžio pjovimas</div>
          <div className="categoryMain" onClick={() => {getData({Main: "Elektronika", Sub: null}, ProductAmount); toggleFilterWrapper()}}>Elektronika</div>
          <div className="categoryMain" onClick={() => {getData({Main: "Kita", Sub: null}, ProductAmount); toggleFilterWrapper()}}>Kita</div>
        </div>
      </div>

      <div id="PHeader">
        <div id="PheaderText">
          <h1>{currentCategory.Main === null ? (<>Armilla</>):(<>{currentCategory.Main}</>)}</h1>
        </div>
        <div id="PWrapper">
          <div id="Settings">
            <div id="ProductCount">{ItemData.length} Items</div>
            <div id="FilterBtn" onClick={toggleFilterWrapper}>Filtruoti <i className="fa-solid fa-sliders"></i></div>

            {!ItemData.length ? ( /* Loading Icon */
              <div className="lds-dual-ring" id="productCounterLoading"></div>
            ) : (<></>)}

            <div id="Filter" onClick={showSortMenu}>{
              currentSort["Popularity"] === -1 ? ( /* there should be a better way to do this */
                <>Popular</>
              ) : (
                currentSort["Price"] === 1 ? (
                  <>Price Ascending</>
                ) : (
                  currentSort["Price"] === -1 ? (
                    <>Price Descending</>
                  ) : (
                    <></>
                  )
                )
              )
            }
            <i className="gg-chevron-down" id="FilterIcon"></i>
            </div>
          </div>
          <div id="SortMenuWrapper">
            <div id="SortMenu">
              <div onClick={() => {setSort({"Popularity": -1}); showSortMenu()}}>Popular</div>
              <div onClick={() => {setSort({"Price": 1}); showSortMenu()}}>Price Ascending</div>
              <div onClick={() => {setSort({"Price": -1}); showSortMenu()}}>Price Descending</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ContentItems">
        <div id="productsMain">
          <div id="ContentDiv">
            <div className="side-nav-categories">
              <ul className="category-tabs">
                <li>
                  <a onClick={() => {getData({Main: null, Sub: null}, ProductAmount);}} className="main-category">
                    {" "}
                    Visi Produktai {currentCategory.Main === null && currentCategory.Sub === null ? (
                       <i className="fa-solid fa-angle-left"></i>):(<></>)}
                  </a>
                </li>
              </ul>
              <ul className="category-tabs">
                <li>
                  <a onClick={() => {getData({Main: "3D Spausdinimas / Medžio Pjovimas", Sub: null}, ProductAmount)}} className="main-category"> {" "}
                    3D Spausdinimas / Medžio Pjovimas
                    {currentCategory.Main === "3D Spausdinimas / Medžio Pjovimas" && currentCategory.Sub === null ? (
                    <i className="fa-solid fa-angle-left"></i>):(<></>)}
                  </a>
                </li>
              </ul>
              <ul className="category-tabs">
                <li>
                  <a onClick={() => {getData({Main: "Elektronika", Sub: null}, ProductAmount)}} className="main-category"> {" "}
                    Elektronika
                    {currentCategory.Main === "Elektronika" && currentCategory.Sub === null ? (
                    <i className="fa-solid fa-angle-left"></i>):(<></>)}
                  </a>
                </li>
              </ul>
              <ul className="category-tabs">
                <li>
                  <a onClick={() => {getData({Main: "Kita", Sub: null}, ProductAmount)}} className="main-category"> {" "}
                    Kita
                  </a>
                  {currentCategory.Main === "Kita" && currentCategory.Sub === null ? (
                  <i className="fa-solid fa-angle-left"></i>):(<></>)}
                </li>
              </ul>
            </div>
            <div id="ItemDivContainer">
                <div className="ItemDiv">
                  {ItemData.length ? (
                    <>
                  {ItemData.map((Item, itemIndex) => (
                    <div className="item-card-wrapper" style={{"animation": `.6s ${itemIndex * 0.1}s ease fade-down forwards`}}>
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
                                if(index < 4){
                                  return <div className="Option" onMouseOver={() => changeImage(itemIndex, Parameter.Image)}><img src={Parameter.Image}></img> <div className="tooltiptext">{Parameter.ParamName}</div></div>
                                }
                              })}
                            {
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
                  ))}{" "}
                  </>
                ) : (

                <></>
              )}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="Wrapper" id="filterWrapper" onClick={toggleFilterWrapper}></div>
      </div>

    </div>
  );
}

export default Products;

/*      <div className="categories">
        <span className="category" onClick={() => getData("All", 69)}>Visi Produktai</span>
        <span className="category" onClick={() => getData("Dekoracija", 420)}>Dekoracijos</span>
        <span className="category" onClick={() => getData("Naudinga", 6969)}>Naudinga</span>
        <span className="category" onClick={() => getData("Meme", 69420)}>Meme</span>
      </div> */


/*
                    <div className="topBar">
                    <div className="amongus">
                      <i className="fa-solid fa-sort"></i>
                      {currentSort.Popularity ? 
                      (<p onClick={() => setSort({"Price": 1})}>Populiariausios prekės</p>) :
                      (<p onClick={() => setSort({"Popularity": -1})}>Pigiausios prekės</p>)
                    }
                      
                    </div>
                    {ItemData.length ? (
                    <div id="productCounter">
                      {ItemData.length}{" "}
                      {ItemData.length > 1 ? (
                        ItemData.length > 9 ? (
                          <>Produktų</>
                        ) : (
                          <>Produktai</>
                        )
                      ) : (
                        <>Produktas</>
                      )}
                    </div>
                    ):(<div className="lds-dual-ring" id="productCounterLoading"></div>)}
                  </div>
*/