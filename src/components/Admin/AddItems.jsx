import { useEffect, useState } from "react";
import "../../css/addItems.css"

export function AddItems(){
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [dateAdded, setDateAdded] = useState("");
    const [images, setImages] = useState("");

    function handleImageUpload(event){
        const files = Array.from(event.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setImages(imagePreviews);
    }

    useEffect(()=>{
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setDateAdded(formattedDate)
    },[])

    function handleSubmit(event) {
        event.preventDefault();
        const productData = {
            productName,
            price,
            dateAdded,
            images,
        }
        console.log("Product Data: ",productData)
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
                      src={image}
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