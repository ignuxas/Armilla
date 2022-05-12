import React from "react";
import contact from "./Styles/contact.css"

function Contact() {
  return (
    <div className="App">
      <div id="Frame" className="flex">
        <div id="contactWrapper">
          <div className="primaryContact flex">
              <h3>Kontaktai</h3>
              <p>Jei turite rekomendacijų, kritikos, ar tesiog norite 
                pasikalbėti - susisiekite su mumis ツ
              </p>
              <div className="flex" id="contacts">
                <div className="flex contactItem">
                  <div className="iconCircle flex">
                    <i className="fa fa fa-phone"></i>
                  </div>
                  <span className="contactName">Telefonas:<span className="gray"> +370 694206</span></span>
                </div>
                <div className="flex contactItem">
                  <div className="iconCircle flex">
                  <i class="fa fa-envelope"></i>
                  </div>
                  <span className="contactName">El. Paštas:<span className="gray"> armilla.main@gmail.com </span></span>
                </div>
                <div className="flex contactItem">
                  <div className="iconCircle flex">
                  <i class="fa fa-envelope"></i>
                  </div>
                  <span className="contactName">Savininko El. Paštas:<span className="gray"> mikolaitis.ignas@gmail.com </span></span>
                </div>
                <div className="flex contactItem">
                  <div className="iconCircle flex">
                  <i class="fa fa-globe"></i>
                  </div>
                  <span className="contactName">Savininko Svetainė:<span className="gray"> ignuxas.com </span></span>
                </div>
              </div>
          </div>
          <div className="contactForm">
              <h3>Susisiekite</h3>
              <form id="Form" action="https://formsubmit.co/armilla.main@gmail.com" method="POST">
                <div className="shortFields">
                  <div className="form-group">
                    <label className="label" for="name">Jūsų vardas</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Vardas" required></input>
                  </div>
                  <div className="form-group">
                    <label className="label" for="name">El. paštas</label>
                    <input type="text" className="form-control" name="email" id="mail" placeholder="Paštas" required></input>
                  </div>
                </div>
                <div className="longFields">
                  <div className="form-group">
                    <label className="label" for="name">Laiško tema</label>
                    <input type="text" className="form-control" name="theme" id="theme" placeholder="Tema" required></input>
                  </div>
                  <div className="form-group">
                    <label className="label" for="name">Laiško turinys</label>
                    <textarea type="text" className="form-control" cols="30" rows="4" name="Message" id="msgContent" placeholder="Laiškas"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Siūsti" class="submitBtn"></input>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
