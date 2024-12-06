import React from "react";
import {useProducts} from "../components/productprovider";
import femaleShoesMp4 from "../assets/Femaleshoes.mp4";
import {ContentCard} from "./content";
import {useLocation} from "react-router-dom";

export function FemaleAccessories() {
    const {products, loading} = useProducts();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (loading) {
        return <p>Laddar produkter...</p>;
    }

    const femaleAccessories = searchResults.length
        ? searchResults.filter(
            (product) => product.category === "Dam" && product.subCat === "Accessoarer"
        )
        : products.filter(
            (product) => product.category === "Dam" && product.subCat === "Accessoarer"
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
                {femaleAccessories.map((shoe) => (
                    <ContentCard key={shoe.id} product={shoe}/>
                ))}
            </div>
        </div>
    );
}
