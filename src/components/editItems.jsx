import { items } from "../items";
import { useState } from "react";
import "../css/editItems.css";

export function ContentCardForEditing({
  image,
  title,
  price,
  onNameChange,
  onPriceChange,
  onSave,
}) {
  return (
    <div className="content-card">
      <img src={image} alt={title} className="content-card-image" />
      <input
        type="text"
        defaultValue={title}
        onChange={(e) => onNameChange(e.target.value)}
        className="contentInput"
      />
      <input
        type="number"
        defaultValue={price}
        onChange={(e) => onPriceChange(e.target.value)}
        className="contentInput"
      />
      <button className="contentButton" onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export function EditItems() {
  const [data, setData] = useState(items[0]);

  const updateItem = (category, subcategory, id, key, value) => {
    const updatedData = { ...data };
    const updatedItems = updatedData[category][subcategory].map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    updatedData[category][subcategory] = updatedItems;
    setData(updatedData);
  };

  const handleItemClick = (item) => {
    alert(
      `Saved changes for the item: ${item.name} and the price is ${item.pris}`
    );
  };

  return (
    <div>
      <h1>All Items</h1>
      {Object.keys(data).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {Object.keys(data[category]).map((subcategory) => (
            <div key={subcategory}>
              <h3>{subcategory}</h3>
              <div className="contentList">
                {data[category][subcategory].map((item) => (
                  <ContentCardForEditing
                    key={item.id}
                    image={item.img}
                    title={item.name}
                    price={item.pris}
                    onNameChange={(value) =>
                      updateItem(category, subcategory, item.id, "name", value)
                    }
                    onPriceChange={(value) =>
                      updateItem(category, subcategory, item.id, "pris", value)
                    }
                    onSave={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
