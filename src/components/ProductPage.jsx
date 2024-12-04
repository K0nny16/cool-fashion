import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/productprovider";
import "../css/productPage.css";

export function ProductPage() {
  const { productId } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [products, productId]);

  if (!product) {
    return <p>Laddar....</p>;
  }

  const images = product.images || [];
  const currentImage =
    images[currentImageIndex] || "https://via.placeholder.com/150";

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightBox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-page">
      <div className="product-image-section">
        <img
          src={currentImage}
          alt={`${product.productName} - Main Image`}
          className="product-main-image"
          onClick={openLightbox}
        />

        <div className="product-thumbnails">
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
      </div>

      <div className="product-details">
        <h1>{product.productName}</h1>
        <p>{`Pris: $${product.price}`}</p>
        <p>{`Kategori: ${product.category}`}</p>
        <p>{`Subkategori: ${product.subCat}`}</p>
        <p>{`Tillgängliga: ${product.quant}`}</p>
        <button className="add-to-cart-button">Köp</button>
      </div>

      {isLightboxOpen && (
        <div className="lightbox">
          <div className="lightbox-content">
            <button className="close-button" onClick={closeLightBox}>
              X
            </button>
            <button className="prev-button" onClick={prevImage}>
              ❮
            </button>
            <img
              src={currentImage}
              alt={`${product.productName} - Förstorad bild`}
              className="lightbox-image"
            />
            <button className="next-button" onClick={nextImage}>
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
