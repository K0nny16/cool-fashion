import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/productprovider";
import { getAuth } from "firebase/auth"; // Firebase authentication
import { getDatabase, ref, set, onValue } from "firebase/database"; // Firebase database
import "../css/productPage.css";

export function ProductPage() {
  const { productId } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    // Hämta produktdata
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [products, productId]);

  useEffect(() => {
    if (user) {
      // Hämta användarens önskelista från databasen
      const wishlistRef = ref(db, `users/${user.uid}/wishlist`);
      onValue(wishlistRef, (snapshot) => {
        const wishlistData = snapshot.val() || [];
        setWishlist(wishlistData);
        setIsInWishlist(wishlistData.includes(productId));
      });
    }
  }, [user, productId, db]);

  const toggleWishlist = () => {
    if (!user) {
      alert("Du måste vara inloggad för att använda önskelistan.");
      return;
    }

    const updatedWishlist = isInWishlist
      ? wishlist.filter((id) => id !== productId) // Ta bort om den finns
      : [...wishlist, productId]; // Lägg till om den inte finns

    // Uppdatera databasen
    set(ref(db, `users/${user.uid}/wishlist`), updatedWishlist)
      .then(() => {
        setWishlist(updatedWishlist);
        setIsInWishlist(!isInWishlist); // Uppdatera lokal status
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
      });
  };

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

        {/* Önskelista knapp */}
        <button
          className="wishlist-button"
          onClick={toggleWishlist}
          style={{
            backgroundColor: isInWishlist ? "#ff4040" : "#ccc",
            color: isInWishlist ? "#fff" : "#000",
          }}
        >
          {isInWishlist ? "Ta bort från önskelistan" : "Lägg till i önskelistan"}
        </button>
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
