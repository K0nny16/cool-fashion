import React, { useState } from "react";
import { resaleItems } from "../resaleItems"; 
import "../css/resale.css";
import resalesMp4 from "../assets/Resales.mp4";

export function Resale() {
  return (
    <div className="resaleContainer">
      <video
        className="video"
        src={resalesMp4}
        alt="Resales video"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="content-cards">
        {resaleItems.map((item) => (
          <ContentCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export function ContentCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return null;
  }

  const images = Array.isArray(product.image) ? product.image : [product.image]; 
  const currentImage =
    images[currentImageIndex] || "https://via.placeholder.com/150";

  return (
    <div className="content-card">
      <div className="image-carousel">
        <img
          src={currentImage}
          alt={`${product.title} - Image`}
          className="content-card-image"
        />
      </div>

      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={`${product.id}-thumb-${index}`}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${
              currentImageIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      <h3>{product.title}</h3>
      <p>{`Price: ${product.price}`}</p>
      <p>{`Seller: ${product.seller}`}</p>
      <p>{product.description}</p>
      <button
        className="content-card-button"
        onClick={() => alert(`${product.title} purchased!`)}
      >
        Buy Now
      </button>
    </div>
  );
}