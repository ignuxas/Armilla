import React, {useEffect, useState} from "react";

import logo from "../resources/logo.png";
import "./Styles/Documents.css";

import RefundPolicyEN from "./Policies/refund_policy";
import PrivacyPolicyEN from "./Policies/privacy_policy";
import Tos from "./Policies/tos";

import TosLT from "./Policies/tosLT";
import RefundPolicyLT from "./Policies/refund_policyLT";
import PrivacyPolicyLT from "./Policies/privacy_policyLT";

import { Link } from "react-router-dom";

import { mobile } from "./Navigation"

function Documents() {
  const [language, setLanguage] = useState("EN");

  function scrollToView(policyID){
    if(policyID === "Refund_Policy") 
      window.location.hash = "/documents?id=refund-policy&lang=" + language
    else if(policyID === "Privacy_Policy") 
      window.location.hash = "/documents?id=privacy-policy&lang=" + language
    else
      window.location.hash = "/documents?lang=" + language

    var yOffset = - document.getElementById("DocNav").offsetHeight

    const element = document.getElementById(policyID);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const pName = window.location.hash; // change this from hash to pathname when i finally figure out how to remove the hash

    if(pName.includes("refund-policy")){
        setTimeout(function(){ //have to set timeout idk doesn't work otherwise
          scrollToView('Refund_Policy')
        }, 5);}
    else if(
      pName.includes("privacy-policy")){
        setTimeout(function(){ // have to set timeout idk doesn't work otherwise
          scrollToView('Privacy_Policy')
        }, 5);}

    if(window.location.hash.includes("lang=LT") && language !== "LT"){
      window.location.hash = "/documents?lang=LT"
      setLanguage("LT")
    } else if (window.location.hash.includes("lang=EN") && language !== "EN"){
      window.location.hash = "/documents?lang=EN"
      setLanguage("EN")
    }

  })

  return (
    <div id="DocumentsApp">
      <div id="DocNav">
        <img src={logo} alt="" />
        <h3><Link to="/">Armilla</Link></h3>
        {language === "LT" ? (
            <div className="menu-links">
              <div onClick={() => scrollToView('TermsOfService')}>Paslaugų teikimo sąlygos</div>
              <div onClick={() => scrollToView('Refund_Policy')}>Grąžinimo politika</div>
              <div onClick={() => scrollToView('Privacy_Policy')}>Privatumo politika</div>
            </div>
        ):( /* If language is English */
            <div className="menu-links">
              <div onClick={() => scrollToView('TermsOfService')}>Terms of service</div>
              <div onClick={() => scrollToView('Refund_Policy')}>Refund policy</div>
              <div onClick={() => scrollToView('Privacy_Policy')}>Privacy policy</div>
            </div>
        )}
        {language === "LT" ? (
          <div id="Languages">
            <div className="language langCurrent">LT</div>
            <div className="language" onClick={() => {{window.location.hash = "/documents?lang=EN"; setLanguage("EN")}}}>EN</div>
          </div>
        ):(
          <div id="Languages">
            <div className="language" onClick={() => {window.location.hash = "/documents?lang=LT"; setLanguage("LT")}}>LT</div>
            <div className="language langCurrent">EN</div>
          </div>
        )}
      </div>
      <main>
        {language === "LT" ? (
            <div id="Document">
              <div id="TermsOfService" className="policy"><TosLT /></div>
              <div id="Refund_Policy" className="policy"><RefundPolicyLT /></div>
              <div id="Privacy_Policy" className="policy"><PrivacyPolicyLT /></div>
            </div>
        ):( /* If language is English */
            <div id="Document">
                <div id="TermsOfService" className="policy"><Tos /></div>
                <div id="Refund_Policy" className="policy"><RefundPolicyEN /></div>
                <div id="Privacy_Policy" className="policy"><PrivacyPolicyEN /></div>
            </div>
        )}
      </main>
    </div>
  );
}

export default Documents;
