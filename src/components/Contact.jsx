import React, {useEffect} from "react";
import "./Styles/contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ContactApp">
      <div id="Frame" className="flex">
        <div id="contactWrapper">
          <div className="primaryContact flex">
            <h3>Kontaktai</h3>
            <p>
              Jei turite rekomendacijų, kritikos, ar klausimų -
              susisiekite su mumis ツ
            </p>
            <div className="flex" id="contacts">
              <div className="flex contactItem">
                <div className="iconCircle flex">
                  <i className="fa fa fa-phone"></i>
                </div>
                <span className="contactName">
                  Telefonas:<span className="gray"> <br></br> +370 --- -- ---</span>
                </span>
              </div>
              <div className="flex contactItem">
                <div className="iconCircle flex">
                  <i className="fa fa-envelope"></i>
                </div>
                <span className="contactName">
                  El. Paštas:
                  <span className="gray"> <br></br> -------.----@----.com </span>
                </span>
              </div>
              <div className="flex contactItem">
                <div className="iconCircle flex">
                  <i className="fa fa-envelope"></i>
                </div>
                <span className="contactName">
                  Savininko El. Paštas: <br></br>
                  <span className="gray"> ---.-------@gmail.com </span>
                </span>
              </div>

            </div>
            <p id="note">
                Jei norite pateikti privatų užsakymą prašome mus kontaktuoti el.
                paštu, svetainės "Susisiekite" funkcija ar telefonu.
            </p>
          </div>
          <div className="contactForm">
            <h3>Susisiekite</h3>
            <form
              id="Form"
              action="https://formsubmit.co/armilla.main@gmail.com"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="shortFields">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    Jūsų vardas
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Vardas" required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    El. paštas
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="mail"
                    placeholder="Paštas"
                    required
                  ></input>
                </div>
              </div>
              <div className="longFields">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    Laiško tema
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="theme"
                    id="theme"
                    placeholder="Tema"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    Laiško turinys
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    cols="30"
                    rows="4"
                    name="Message"
                    id="msgContent"
                    placeholder="Laiškas"
                  ></textarea>
                </div>
                <div className="form-group file-area">
                  <input
                    type="file"
                    name="files"
                    id="files"
                    multiple
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Siūsti"
                    className="submitBtn"
                  />
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
