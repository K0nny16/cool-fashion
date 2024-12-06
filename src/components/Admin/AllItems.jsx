import React from "react";
import { useProducts } from "../productprovider.jsx";

export function AllItems() {
  const { products } = useProducts(); 

  if (products.length === 0) {
    return <p>Inga produkter hittades!</p>; 
  }

  return (
    <div className="content">
      <h2
        className="title-AllItems"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Alla Produkter
      </h2>
      <div className="content-cards">
        {products.map((product) => (
          <div key={product.id} className="content-card">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/150"}
              alt={product.productName}
              className="content-card-image"
            />
            <h3 className="content-card-title">{product.productName}</h3>
            <p className="content-card-price">{`${product.price} SEK`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
