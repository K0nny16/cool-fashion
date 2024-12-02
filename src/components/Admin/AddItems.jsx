import { useEffect, useState } from "react";
import "../../css/addItems.css";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase";
import imageCompression from "browser-image-compression";


export function AddItems() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [subCat, setSubCat] = useState("");
  const [quant, setQuant] = useState("");

  function handleImageUpload(event) {
    const files = Array.from(event.target.files).slice(0,3);
    if (files.length > 3) {
      alert("You can only upload up to 3 images. The first 3 images have been selected.");
    }
    setImages(files);
  }

  async function compressAndConvertToBase64(files) {
    const options = {
      maxSizeMB: 0.33, // Maxstorlek för varje bild i MB
      maxWidthOrHeight: 1024, // Maxbredd eller höjd i pixlar
      useWebWorker: true, // För snabbare komprimering
    };
  
    const base64Strings = await Promise.all(
      files.map(async (file) => {
        const compressedFile = await imageCompression(file, options);
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(compressedFile);
        });
      })
    );
  
    return base64Strings;
  }
  

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
      subCat,
      quant,
    };
    console.log("Product Data: ", productData);
    submitToDB(productData);
  }
  async function submitToDB(data) {
    try {
      // Komprimera och konvertera bilder till Base64
      const base64Images = await compressAndConvertToBase64(data.images);
  
      const productData = {
        productName: data.productName,
        price: parseFloat(data.price),
        dateAdded: data.dateAdded,
        images: base64Images,
        category: data.category,
        subCat: data.subCat,
        quant: parseInt(data.quant, 10),
      };
  
      const docRef = await addDoc(collection(firestoreDB, "Products"), productData);
  
      console.log("Product added! ", docRef.id);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product");
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
            <input
              type="text"
              className="product-form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="product-form-group">
            <label className="product-form-label">Sub Category:</label>
            <input
              type="text"
              className="product-form-input"
              value={subCat}
              onChange={(e) => setSubCat(e.target.value)}
              required
            />
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
            <input
              type="file"
              className="product-form-input-file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {images.length > 0 && (
            <div>
              <h3 className="product-form-preview-title">Image Previews:</h3>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="product-form-image"
                />
              ))}
            </div>
          )}

          <button type="submit" className="product-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
