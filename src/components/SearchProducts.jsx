import React, { useState, useEffect } from "react";
import { firestoreDB } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ContentCard } from "./content";

export function SearchProducts({ onProductClick }) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // hämtar data från Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestoreDB, "Products"));
                const productsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subCat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="search-products">
            <input
                type="text"
                placeholder="Sök för plagg..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "20px" }}
            />

            <div className="content-cards">
                {filteredProducts.map((product) => (
                    <ContentCard
                        key={product.id}
                        image={product.img}
                        title={product.productName}
                        quant={`Det finns ${product.quant} i lager`}
                        price={`${product.price} kr`}
                        buttonText="Köp"
                        onButtonClick={() => onProductClick(product)}
                    />
                ))}
            </div>
        </div>
    );
}
