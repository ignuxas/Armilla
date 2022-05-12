import React from "react";
import "aos/dist/aos.css";
import Logo from "../resources/logo.png";
import "./Styles/About.css";

function About() {
  return (
    <div className="AppAbout">
      <div id="aboutIntro" className="flex">
        <div className="aboutTitle">
          <h1 data-aos="fade-down" data-aos-duration="500">Armilla</h1>
          <p data-aos="fade-up" data-aos-delay="300">Parduotuvė, pristatanti jums geriausios kokybės dekoracijas
          ir kitus produktus</p>
        </div>
        <div id="introImg" className="flex" data-aos="fade-left" data-aos-delay="600" data-aos-duration="500">
          <img src={Logo}></img>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1680 40"
          className="transitionWave"
        >
          <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#fff" />
        </svg>
      </div>
      <section className="flex">
        <div className="aboutItem" data-aos="zoom-in-down">
          <div className="aboutText">
            <h2>Ateities planai</h2>
            <p>
              <li>Pirmas iš mūsų ateities planų yra:
                 eksperimentuoti su "Resin" medžiagos produktų gamyba ir 
                 suteikti pasirinkimą tarp medžiagų (Dabartinės medžiagos: Plastikas)</li>
              <li>asd</li>
            </p>
          </div>
        </div>
        <div className="aboutItem" data-aos="zoom-in-down">
          <div className="aboutText">
            <h2>Svetainės Ateities planai</h2>
            <p>
              Gaidys gaidys galvokit temas ir t.t. gaidziai nezinau
            </p>
          </div>
        </div>
        <div className="aboutItem" data-aos="zoom-in-down">
          <div className="aboutText">
            <h2>Svetainės Ateities planai</h2>
            <p>
              <li>asd</li>
              <li>asd</li>
            </p>
          </div>
        </div>
        <div className="aboutItem" data-aos="zoom-in-down">
          <div className="aboutText">
            <h2>Svetainės Ateities planai</h2>
            <p>
              <li>asd</li>
              <li>asd</li>
            </p>
          </div>
        </div>
        <div className="aboutItem" data-aos="zoom-in-down">
          <div className="aboutText">
            <h2>Svetainės Ateities planai</h2>
            <p>
              <li>asd</li>
              <li>asd</li>
            </p>
          </div>
        </div>
      </section>
      <div id="footer">
        2022 © Armilla.lt. All Rights Reserved.
      </div>
    </div>
  );
}

export default About;
