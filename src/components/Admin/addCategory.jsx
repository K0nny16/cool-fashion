import React, { useState, useEffect } from "react";
import "../../css/addCategory.css";
import { ref, set, push, onValue, update } from "firebase/database";
import { dbRealTime } from "../../firebase";

export function AddCategory() {
  const [selectedGender, setSelectedGender] = useState("Man");
  const [category, setCategory] = useState("");


  const handeAddCategory = async (e) => {
    e.preventDefault();

    if (category.trim() === "") {
      alert("Fältet får inte vara tomt");
      return;
    }

    try {
      const categoryPath = `nav/Shop/${selectedGender}`;
      const categoryRef = ref(dbRealTime, categoryPath);

      const newCategoryData = {
        [category.trim()]: category.trim(),
      };

      await update(categoryRef, newCategoryData);

      alert(`Kategorin "${category.trim()}" har lagts till under ${selectedGender}!`);
      setCategory("");
    } catch (error) {
      console.error("Kunde inte lägga tlil kategori: ", error);
      alert("Ett fel uppstod vid tillägg av kategori!");
    }
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
    </div>
  );
}
