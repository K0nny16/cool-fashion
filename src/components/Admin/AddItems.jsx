import { useEffect, useState } from "react";
import "../../css/addItems.css";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase";
import { dbRealTime, ref, get } from "../../firebase";
import { ProductsProvider } from "../productprovider";

export function AddItems() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [quant, setQuant] = useState("");
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCat, setSubCat] = useState(""); // Korrekt state

  function handleImageUpload(event) {
    const value = event.target.value.trim();
    if (value) {
      setImages((prevImages) => {
        if (prevImages.length < 5) {
          return [...prevImages, value];
        } else {
          alert("You can only add up to 5 images.");
          return prevImages;
        }
      });
      event.target.value = ""; // Rensa inputfältet
    }
  }

  function resetForm() {
    setProductName("");
    setPrice("");
    setDateAdded("");
    setImages([]);
    setCategory("");
    setQuant("");
    setSubCategories([]);
    setSubCat("");
  }

  function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (categories[selectedCategory]) {
      setSubCategories(Object.keys(categories[selectedCategory])); // Sätt underkategorier
    } else {
      setSubCategories([]); // Töm om inga underkategorier finns
    }
    setSubCat(""); // Återställ vald underkategori korrekt
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const shopRef = ref(dbRealTime, "nav/Shop"); // Referens till rätt del i databasen
        const snapshot = await get(shopRef);
        if (snapshot.exists()) {
          setCategories(snapshot.val()); // Sparar kategoridata
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDateAdded(formattedDate);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const productData = {
      productName,
      price,
      dateAdded,
      images,
      category,
      subCat, // Korrekt state används här
      quant,
    };
    console.log("Product Data: ", productData);
    resetForm();
    submitToDB(productData);
  }

  async function submitToDB(data) {
    try {
      const productData = {
        productName: data.productName,
        price: parseFloat(data.price),
        dateAdded: data.dateAdded,
        images: data.images,
        category: data.category,
        subCat: data.subCat,
        quant: parseInt(data.quant, 10),
      };

      const docRef = await addDoc(
        collection(firestoreDB, "Products"),
        productData
      );

      console.log("Product added! ", docRef.id);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("Failed to add product.");
    }
  }

  return (
      <div className="app-container">
        <div className="product-form-container">
          <form className="product-form" onSubmit={handleSubmit}>
            <h2>Add a New Product</h2>
            <div className="product-form-group">
              <label className="product-form-label">Product Name:</label>
              <input
                type="text"
                className="product-form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Category:</label>
              <select
                className="product-form-input"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Sub Category:</label>
              <select
                className="product-form-input"
                value={subCat} // Korrekt state
                onChange={(e) => setSubCat(e.target.value)} // Korrekt state
                required
                disabled={!subCategories.length}
              >
                <option value="">Select a sub category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Quantity of Product:</label>
              <input
                type="number"
                className="product-form-input"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
                required
              />
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Price:</label>
              <input
                type="number"
                className="product-form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Date Added:</label>
              <input
                type="date"
                className="product-form-input"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
                required
              />
            </div>
            <div className="product-form-group">
              <label className="product-form-label">Upload Images:</label>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  id="image-link-input"
                  type="text"
                  className="product-form-input-file"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  className="add-image-button"
                  onClick={(e) => {
                    const input = document.getElementById("image-link-input");
                    handleImageUpload({ target: input });
                  }}
                >
                  Add Image
                </button>
              </div>
            </div>
            <button type="submit" className="product-form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
  );
}
