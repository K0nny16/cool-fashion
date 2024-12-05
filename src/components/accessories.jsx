import React from "react";
import { useProducts } from "../components/productprovider";
import "../css/accessories.css";
import maleShoes from "../assets/MaleAcc.mp4";
import { ContentCard } from "./content";
import { useLocation } from "react-router-dom";

export function Accessories() {
  const { products, loading } = useProducts();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

  if (loading) {
    return <p>Loading products...</p>;
  }
    const accessories = searchResults.length
        ? searchResults.filter(
            (product) => product.category === "Man" && product.subCat === "Accessoarer"
        )
        : products.filter(
            (product) => product.category === "Man" && product.subCat === "Accessoarer"
        );

  return (
    <div className="herr-accessoarer">
      <div>
        <video
          src={maleShoes}
          className="video"
          alt="Male Accessories Video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="content-cards">
        {accessories.map((shoe) => (
          <ContentCard key={shoe.id} product={shoe} />
        ))}
      </div>
    </div>
  );
}
