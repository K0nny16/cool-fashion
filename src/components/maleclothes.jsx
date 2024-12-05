import React from "react";
import { useProducts } from "./productprovider";
import maleshoesmp4 from "../assets/Maleshoes.mp4";
import { ContentCard } from "./content";

export function MaleClothes() {
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  const maleShoes = products.filter(
    (product) => product.category === "Man" && product.subCat === "Kläder"
  );

  console.log("Filtered Male Shoes:", maleShoes);

  return (
    <div className="shoes-page">
      <video
        className="video"
        src={maleshoesmp4}
        alt="Male shoes Video"
        autoPlay
        muted
        playsInline
      />
      <div className="content-cards">
        {maleShoes.map((shoe) => (
          <ContentCard key={shoe.id} product={shoe} />
        ))}
      </div>
    </div>
  );
}
