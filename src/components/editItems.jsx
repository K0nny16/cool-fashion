import React, { useState, useEffect } from "react";
import { ProductsProvider, useProducts } from "./productprovider"; // Se till att du importerar useProducts
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { update } from "firebase/database"; // För att spara till Firebase
import { ref, getDatabase, get } from "firebase/database";
import "../css/editItems.css";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore"; // Importera dessa från Firestore SDK
import { firestoreDB } from "../firebase";

export function EditItems() {
  const [allItems, setAllItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hämta produkterna från Firestore-databasen
  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(firestoreDB, "Products"));
        const productArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllItems(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Felsöka vid uppdatering
  const saveItem = async (item) => {
    try {
      console.log("Saving item to Firebase:", item);
      const itemRef = doc(firestoreDB, "Products", item.id);
      await updateDoc(itemRef, {
        productName: item.productName,
        price: item.price,
        images: item.images, // Spara den uppdaterade ordningen av bilder
        subCat: item.subCat,
        quant: item.quant,
      });
      alert(`Item ${item.productName} updated successfully!`);
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item.");
    }
  };

  // Hantera ändringar i produkter
  const handleEdit = (field, value) => {
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  // Funktion för att flytta en bild uppåt
  const moveImageUp = (index) => {
    if (index > 0) {
      const updatedImages = [...selectedItem.images];
      [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
      setSelectedItem((prevItem) => ({
        ...prevItem,
        images: updatedImages,
      }));
    }
  };

  // Funktion för att flytta en bild nedåt
  const moveImageDown = (index) => {
    if (index < selectedItem.images.length - 1) {
      const updatedImages = [...selectedItem.images];
      [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
      setSelectedItem((prevItem) => ({
        ...prevItem,
        images: updatedImages,
      }));
    }
  };

  if (loading) {
    return <p>Loading items...</p>;
  }

  return (
    <div>
      <h1>Edit Products</h1>
      <div>
        <label htmlFor="product-select">Select a product: </label>
        <select
          id="product-select"
          onChange={(e) => {
            const selectedId = e.target.value;
            const product = allItems.find((item) => item.id === selectedId);
            setSelectedItem(product);
          }}
        >
          <option value="">--Choose a product--</option>
          {allItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.productName}
            </option>
          ))}
        </select>
      </div>

      {selectedItem && (
        <div className="product-edit">
          <h2>Edit: {selectedItem.productName}</h2>
          <input
            type="text"
            value={selectedItem.productName}
            onChange={(e) => handleEdit("productName", e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="number"
            value={selectedItem.price}
            onChange={(e) => handleEdit("price", e.target.value)}
            placeholder="Price"
          />
          <input
            type="text"
            value={selectedItem.subCat}
            onChange={(e) => handleEdit("subCat", e.target.value)}
            placeholder="Sub Category"
          />
          <input
            type="number"
            value={selectedItem.quant}
            onChange={(e) => handleEdit("quant", e.target.value)}
            placeholder="Quantity"
          />
          <button onClick={() => saveItem(selectedItem)}>Save</button>

          {/* Bildredigering */}
          <div className="image-list">
            {selectedItem.images.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={image}
                  alt={`Image ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    margin: "5px",
                  }}
                />
                <div>
                  <button
                    onClick={() => moveImageUp(index)}
                    disabled={index === 0} // Förhindrar flytt av första bilden uppåt
                  >
                    Upp
                  </button>
                  <button
                    onClick={() => moveImageDown(index)}
                    disabled={index === selectedItem.images.length - 1} // Förhindrar flytt av sista bilden nedåt
                  >
                    Ned
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}