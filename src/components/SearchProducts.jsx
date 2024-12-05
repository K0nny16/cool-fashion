/*
import React, { useState } from "react";
import { useProducts } from "../context/ProductsProvider"; // Import the context provider
import { ContentCard } from "./content"; // Import ContentCard for displaying products

export function SearchProducts() {
    const { products, loading } = useProducts(); // Fetch products and loading state
    const [searchTerm, setSearchTerm] = useState(""); // State for the search input

    // Filter products based on search term
    const filteredProducts = products.filter(
        (product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subCat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-products" style={{ padding: "20px" }}>
            <h2>Search Products</h2>
            {/!* Search Input *!/}
            <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "50%",
                    margin: "10px auto",
                    display: "block",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                }}
            />
            {/!* Display Products *!/}
            {loading ? (
                <p>Loading products...</p>
            ) : filteredProducts.length > 0 ? (
                <div className="content-cards">
                    {filteredProducts.map((product) => (
                        <ContentCard
                            key={product.id}
                            image={product.img}
                            title={product.productName}
                            price={`${product.price} SEK`}
                            buttonText="Buy Now"
                            onButtonClick={() => alert(`You selected: ${product.productName}`)}
                        />
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}
*/
