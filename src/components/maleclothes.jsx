import React from "react";
import {useProducts} from "./productprovider";
import maleshoesmp4 from "../assets/Maleshoes.mp4";
import {ContentCard} from "./content";
import {useLocation} from "react-router-dom";

export function MaleClothes() {
    const {products, loading} = useProducts();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (loading) {
        return <p>Laddar produkter...</p>;
    }

    const maleClothes = searchResults.length
        ? searchResults.filter(
            (product) => product.category === "Man" && product.subCat === "Kläder"
        )
        : products.filter(
            (product) => product.category === "Man" && product.subCat === "Kläder"
        );

    return (
        <div className="shoes-page">
            <video
                className="video"
                src={maleshoesmp4}
                alt="Male shoes Video"
                autoPlay
                muted
                playsInline
            />
            <div className="content-cards">
                {maleClothes.map((shoe) => (
                    <ContentCard key={shoe.id} product={shoe}/>
                ))}
            </div>
        </div>
    );
}
