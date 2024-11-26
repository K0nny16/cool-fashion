import { items } from "../../items.js";
import React, {useState} from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"
export function AllItems() {
    
    const [allItems, setAllItems] = useState(flattenItems(items));

    const flattenItems = (items) => {
        const result = [];
        items.forEach((itemGroup)=>{
            Object.entries(itemGroup).forEach(([category,subCategory])=>{
                Object.entries(subCategory).forEach(([subCategory,products])=>{
                    products.forEach((product)=>{
                        result.push({
                            id: product.id,
                            img: product.img,
                            title: product.name,
                            price: product.pris,
                            buttonText: "Köp",
                        })
                    })
                })
            })
        })
        return result;
    }





    const cards = flattenItems(items);
    if(cards.length === 0) return(<p>Inga produkter hittades!</p>)
    console.log("Flattend items: ",cards)
    
    return (
        <div className="content">
          <h2 className="title-AllItems" style={{textAlign:"center",fontWeight:"bold",textTransform:"uppercase"}} >Alla Produkter</h2>
          <div className="content-cards">
            {cards.map((card) => (
              <div key={card.id} className="content-card">
                <img src={card.img} alt={card.title} className="content-card-image" />
                <h3 className="content-card-title">{card.title}</h3>
                <p className="content-card-price">{card.price} SEK</p>
                <button
                  className="content-card-button"
                  onClick={() => alert(`${card.title} Köpt!`)}
                >
                    Köp
                </button>
              </div>
            ))}
          </div>
        </div>
      );
}