import React from "react";
import {useProducts} from "../components/productprovider";
import femaleShoesMp4 from "../assets/Femaleshoes.mp4";
import {ContentCard} from "./content";
import {useLocation} from "react-router-dom";

export function FemaleClothes() {
    const {products, loading} = useProducts();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (loading) {
        return <p>Laddar produkter...</p>;
    }

    const femaleClothes = searchResults.length
        ? searchResults.filter(
            (product) => product.category === "Dam" && product.subCat === "Kläder"
        )
        : products.filter(
            (product) => product.category === "Dam" && product.subCat === "Kläder"
        );

    return (
        <div className="dam-skor">
            <video
                className="video"
                src={femaleShoesMp4}
                alt="Female shoes Video"
                autoPlay
                muted
                playsInline
            />
            <div className="content-cards">
                {femaleClothes.map((shoe) => (
                    <ContentCard key={shoe.id} product={shoe}/>
                ))}
            </div>
        </div>
    );
}
