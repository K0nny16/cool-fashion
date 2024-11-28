import React, { useState } from "react";
import "../../css/addCategory.css";

// Ersätta useState med API-anrop när vi integrerar databas?
export function AddCategory() {
  const [selectedGender, setSelectedGender] = useState("Man");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState({ Man: [], Dam: [] });

  const handeAddCategory = (e) => {
    e.preventDefault();

    if (category.trim() === "") {
      alert("Fältet får inte vara tomt");
      return;
    }

    console.log("Before update:", categories);
    console.log("Selected gender:", selectedGender);
    console.log("Category to add:", category.trim());

    setCategories((prev) => ({
      ...prev,
      [selectedGender]: [...prev[selectedGender], category.trim()],
    }));

    setCategory("");
  };

  return (
    <div className="addCategory-page">
      <h1>Hantera Kategorier</h1>

      <form onSubmit={handeAddCategory} className="category-form">
        <label>
          Välj kön:
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="Man">Man</option>
            <option value="Dam">Dam</option>
          </select>
        </label>

        <label>
          Lägg till kategori:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Skriv kategori här"
          />
        </label>
        <button type="submit">Lägg till</button>
      </form>

      <div className="categories-list">
        <h2>Kategorier:</h2>
        <div>
          <h3>Man</h3>
          <ul>
            {categories.Man.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Dam</h3>
          <ul>
            {categories.Dam.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
