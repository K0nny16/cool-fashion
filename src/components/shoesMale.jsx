import React from "react";
import { items } from "../items.js";
import { ContentCard } from "./content.jsx";
import "../css/shoes.css";
import maleshoesmp4 from "../assets/Maleshoes.mp4";

export function MaleShoes() {
  const maleShoes = items.flatMap((itemGroup) => itemGroup.Herr?.Skor || []);

  return (
    <div className="shoes-page">
      <video
        className="video"
        src={maleshoesmp4}
        alt="Resales video"
        autoPlay
        loop
        muted
        playsInline
      />

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
