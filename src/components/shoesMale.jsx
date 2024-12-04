import React from "react";
import { useProducts } from "../components/productprovider";
import maleshoesmp4 from "../assets/Maleshoes.mp4";
import { ContentCard } from "./content";

export function MaleShoes() {
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  const maleShoes = products.filter(
    (product) => product.category === "Man" && product.subCat === "Skor"
  );

  console.log("Filtered Male Shoes:", maleShoes);

  return (
    <div className="shoes-page">
      <video
        className="video"
        src={maleshoesmp4}
        alt="Male shoes Video"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="content-cards">
        {maleShoes.map((shoe) => (
          <ContentCard
            key={shoe.id}
            product={shoe} 
          />
        ))}
      </div>
    </div>
  );
}
