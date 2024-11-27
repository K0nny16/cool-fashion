import React,{useState} from "react"
import "../css/nav.css"
import { useNavigate } from "react-router-dom";

export function Navbar(){
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    //Placeholder funktion för logiken med vad man klickar på.
    function handleItemClick(parentCategory,itemName){
        console.log(`Clicked on ${itemName} under ${parentCategory}`)
        alert(`Clicked on ${itemName} under ${parentCategory}`)
        if(itemName === "Se Alla Produkter") navigate("/AllItems")
        if(itemName === "Resale") navigate("/Resale")
        if(itemName === "Accessoarer" && parentCategory === "Man") navigate("/accessoriesMale")
        if (parentCategory === "Dam" && itemName === "Skor") navigate("/shoesFemale")
        if(itemName === "Redigera Produkter") navigate("/editItem")
    }
    //Struktur för hur menyn kommer att vara utformad.
    const menuItems = [
        {name:"Shop",dropdown:["Nyheter",
            {name:"Dam",content:["Skor","Kläder","Accessoarer"]},
            {name:"Man",content:["Skor","Kläder","Accessoarer"]},
        ]},
        {name:"About us",dropdown:["Contact us","Where to find us"]},
        {name:"Cart",dropdown:["Checkout","Returns"]},
        {name:"Resale"},
        {name:"Admin",dropdown:["Redigera Produkter","Lägg till Produkter","Skapa Kategori","Se Alla Produkter"]}
    ]
    
    return (
        <nav className="navbar">
          <ul className="navbar-menu">
            {menuItems.map((item) => (
              <li
                key={item.name} //Hämtare ut namen på alla items.
                className="navbar-item"
                onMouseEnter={() => setOpenDropdown(item.name)} 
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span onClick={() => {
                  if(!item.dropdown){
                    handleItemClick(item.name,item.name);
                  }
                }}>{item.name}</span>
                {openDropdown === item.name && item.dropdown && ( //Aktiverar dropdown ifall det är aktivt (alltså man håller över något av meny alternativen.)
                  <ul className="dropdown">
                    {item.dropdown.map((subItem, index) => //Loopar igen alla objekten.
                      typeof subItem === "string" ? ( //Om det är en sträng rendera direkt
                        <li
                          key={index}   //Nyckel för varje underkatigori
                          className="dropdown-item" 
                          onClick={() => handleItemClick(subItem.name,subItem)} //Används bara ifall användaren klickar på nyheter eftersom den inte har en parent.
                        >
                          {subItem}
                        </li>
                      ) : (
                        <li key={subItem.name} className="dropdown-item"> 
                          <span onClick={() => handleItemClick(item.name,subItem.name)}
                            style={{cursor: "pointer"}}>
                              {subItem.name}
                          </span>
                          <ul className="nested-dropdown">
                            {subItem.content.map((contentItem, subIndex) => ( //Samma som oven bara ifall det finns nestade items som det gör i dam och her.
                              <li
                                key={subIndex}
                                className="nested-dropdown-item"
                                onClick={(e) => {
                                  e.stopPropagation(); //Förhindrar att klicket påverkar parenten eller andra element ovan.
                                  handleItemClick(subItem.name,contentItem);
                                }}
                              >
                                {contentItem}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
            <li className="navbar-item">
              <span>Login</span>
            </li>
            <li className="navbar-item search-bar">
              <input type="text" placeholder="Search..." />
            </li>
          </ul>
        </nav>
      );
    }
