import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useProducts } from "../components/productprovider"; // För att hämta alla produkter
import { ContentCard } from "./content"; // Återanvänd ContentCard
import { dbRealTime } from "../firebase";
import "../css/wishlist.css"; // Lägg till eventuell styling

export function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { products } = useProducts(); // Hämta alla produkter
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const wishlistRef = ref(dbRealTime, `users/${user.uid}/wishlist`);
      get(wishlistRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setWishlistItems(snapshot.val() || []);
          }
        })
        .catch((error) => {
          console.error("Error loading wishlist:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter((id) => id !== productId);
    setWishlistItems(updatedWishlist);

    const wishlistRef = ref(dbRealTime, `users/${user.uid}/wishlist`);
    set(wishlistRef, updatedWishlist).catch((error) =>
      console.error("Failed to update wishlist:", error)
    );
  };

  if (loading) {
    return <p>Laddar din önskelista...</p>;
  }

  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product.id)
  );

  if (wishlistProducts.length === 0) {
    return <p>Din önskelista är tom!</p>;
  }

  return (
    <div>
      <h1>Min Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="wishlist-item">
            <ContentCard product={product} />
            <button
              className="remove-from-wishlist-button"
              onClick={() => removeFromWishlist(product.id)}
            >
              Ta bort från önskelista
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
