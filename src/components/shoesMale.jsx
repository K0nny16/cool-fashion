import React from "react";
import { items } from "../items.js";
import { ContentCard } from "./content.jsx";
import "../css/shoes.css";
const landingImage = "/assets/herrskor-landingimg.png";

export function MaleShoes() {
  const maleShoes = items.flatMap((itemGroup) => itemGroup.Herr?.Skor || []);

  return (
    <div className="shoes-page">
      <div className="landing-image-container">
        <img
          src={landingImage}
          alt="landingImage"
          className="shoes-landing-image"
        />
      </div>

      <div className="product-list">
        {maleShoes.map((shoe) => (
          <ContentCard
            key={maleShoes.id}
            image={shoe.img}
            title={shoe.name}
            price={`${shoe.pris} kr`}
            buttonText="Köp"
            seller="Herrsko"
            onButtonClick={() => alert(`Du klickade på ${shoe.name}`)}
          />
        ))}
      </div>
    </div>
  );
}
