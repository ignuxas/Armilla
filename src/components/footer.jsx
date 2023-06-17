import React, {useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../resources/logo.png"

function Footer() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="footer">
    <div className="flex">
      <div className="Armilla">
        <img src={logo} alt=""></img>
        Armilla
        <p>Dirbame jums nuo 2022 m.</p>
        </div>
      <div className="Nav">
        <NavLink className="NavBtn" to="/">Namai</NavLink>
        <NavLink className="NavBtn" to="/produktai">Produktai</NavLink>
        <NavLink className="NavBtn" to="/contact">Kontaktuoti</NavLink>
      </div>
      <div className="Nav">
        <Link className="NavBtn" rel="noreferrer" to="/documents" target="_blank">Paslaugų teikimo sąlygos</Link>
        <Link className="NavBtn" rel="noreferrer" to="/documents?id=privacy-policy" target="_blank">Privatumo politika</Link>
        <Link className="NavBtn" rel="noreferrer" to="/documents?id=refund-policy" target="_blank">Grąžinimo politika</Link>
      </div>
    </div>
    <div id="copyright">2022 © Armilla.lt <span>Website Built and Maintained by <a href="https://ignuxas.com/">Ignas Mikolaitis</a></span></div>
  </div>
  );
}

/*
        <NavLink className="NavBtn" to="/">Namai</NavLink>
        <NavLink className="NavBtn" to="/produktai">Produktai</NavLink>
        <NavLink className="NavBtn" to="/contact">Užsakymai</NavLink>
        <NavLink className="NavBtn" to="/about">Apie Mus</NavLink>
        <NavLink className="NavBtn" to="/contact">Kontaktuoti</NavLink>
* */

export default Footer;
