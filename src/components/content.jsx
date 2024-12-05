import React from "react";
import { useProducts } from "../components/productprovider";
import "../css/content.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Content() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }


  return (
    <div>
      {/* Återskapad Black Friday-banner och kategori-bilder */}
      <div className="black-friday-banner">BLACK FRIDAY</div>
      <div className="content-category-img">
        {/* Herrskor */}
        <img
          src="/assets/herrskor.PNG"
          alt="herrskor"
          className="clickable-image"
          onClick={() => handleNavigate("/maleShoes")}
        />
        <div className="content-category-vertical-img">
          {/* Damskor */}
          <img
            src="/assets/damskor.PNG"
            alt="damskor"
            className="clickable-image"
            onClick={() => handleNavigate("/shoesFemale")}
          />
          {/* Accessoarer */}
          <img
            src="/assets/accessoarer.PNG"
            alt="accessoarer"
            className="clickable-image"
            onClick={() => handleNavigate("/accessoriesMale")}
          />
        </div>
      </div>
      <h2 className="news-title">NYHETER</h2>
      <div className="content-cards">
        {products.map((product) => (
          <ContentCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function ContentCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const images = product.images || [];
  const currentImage =
    images[currentImageIndex] || "https://via.placeholder.com/150";

  return (
    <div 
    className="content-card"
    onClick={() => navigate(`/product/${product.id}`)}
    style={{ cursor: "pointer" }} 
    >
      <div className="image-carousel">
        <img
          src={currentImage}
          alt={`${product.productName} - Image`}
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
            onClick={(event) => {
              event.stopPropagation();
              setCurrentImageIndex(index);
            }}
          />
        ))}
      </div>

      <h3>{product.productName}</h3>
      <p>{`Price: $${product.price}`}</p>
    </div>
  );
}
