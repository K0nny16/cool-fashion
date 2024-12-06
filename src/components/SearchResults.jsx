import React from "react";
import { useLocation } from "react-router-dom";
import { ContentCard } from "./content";
import "../css/SearchResults.css";

export function SearchResults() {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    if (!searchResults.length) {
        return <h2 className="searchResults-h2">Ingen plagg hittades 😓</h2>;
    }

    return (
        <div className="search-results">
            <div className="content-cards">
                {searchResults.map((product) => (
                    <ContentCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
