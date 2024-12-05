import React from "react";
import { useProducts } from "../components/productprovider";
import femaleShoesMp4 from "../assets/Femaleshoes.mp4";
import { ContentCard } from "./content";

export function FemaleClothes() {
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  const femaleAccessories = products.filter(
    (product) => product.category === "Dam" && product.subCat === "Accessoarer"
  );

  return (
    <div className="dam-skor">
      <video
        className="video"
        src={femaleShoesMp4}
        alt="Female shoes Video"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="content-cards">
        {femaleAccessories.map((shoe) => (
          <ContentCard key={shoe.id} product={shoe} />
        ))}
      </div>
    </div>
  );
}
