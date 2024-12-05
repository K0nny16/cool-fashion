import React from "react";
import {useProducts} from "../components/productprovider";
import femaleShoesMp4 from "../assets/Femaleshoes.mp4";
import {ContentCard} from "./content";
import {useLocation} from "react-router-dom";

export function ShoesFemale() {
    const {products, loading} = useProducts();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (loading) {
        return <p>Laddar produkter...</p>;
    }

    const femaleShoes = searchResults.length
        ? searchResults.filter(
            (product) => product.category === "Dam" && product.subCat === "Skor"
        )
        : products.filter(
            (product) => product.category === "Dam" && product.subCat === "Skor"
        );

    return (
        <div className="dam-skor">
            <video
                className="video"
                src={femaleShoesMp4}
                alt="Female shoes Video"
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="content-cards">
                {femaleShoes.map((shoe) => (
                    <ContentCard key={shoe.id} product={shoe}/>
                ))}
            </div>
        </div>
    );
}
