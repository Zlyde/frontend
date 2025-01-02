import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <h1>Välkommen till Svenska Elsparkcyklar</h1>
          <p>Upptäck staden på ett hållbart och roligt sätt!</p>
          <Link to="/register" className="cta-button">Kom igång</Link>
        </div>
      </header>

      <section className="features">
        <h2>Våra tjänster</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <i className="icon icon-scooter"></i>
            <h3>Snabba och Smidiga</h3>
            <p>Våra elsparkcyklar tar dig snabbt dit du vill</p>
          </div>
          <div className="feature-item">
            <i className="icon icon-eco"></i>
            <h3>Miljövänliga</h3>
            <p>100% eldrivna för en grönare stad</p>
          </div>
          <div className="feature-item">
            <i className="icon icon-app"></i>
            <h3>Enkel App</h3>
            <p>Hitta och lås upp cyklar direkt i vår app</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Hur det fungerar</h2>
        <ol className="steps">
          <li>Ladda ner appen</li>
          <li>Hitta en elsparkcykel nära dig</li>
          <li>Skanna QR-koden för att låsa upp</li>
          <li>Kör och ha kul!</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>Vad våra kunder säger</h2>
        <div className="testimonial-grid">
          <blockquote>"Så smidigt och kul att ta sig runt i stan!"</blockquote>
          <blockquote>"Perfekt för korta sträckor och miljövänligt!"</blockquote>
        </div>
      </section>
    </div>
  );
};

export default Home;
