import React from "react";
import { useLocation } from "react-router-dom";
import { ContentCard } from "./content";

export function SearchResults() {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (!searchResults.length) {
        return <p>Ingen plagg hittades av din sökning.</p>;
    }

    return (
        <div className="search-results">
            <h2>Sök resultat...</h2>
            <div className="content-cards">
                {searchResults.map((product) => (
                    <ContentCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
