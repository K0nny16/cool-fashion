import React, { useState, useEffect } from "react";
import "../css/nav.css";
import { useNavigate } from "react-router-dom";
import { fetchMenuData } from "../nav";
import { useProducts } from "../components/productprovider";

const logo = "/assets/cool-fashion-logo2.PNG";

export function Navbar({ userState }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const { products } = useProducts();
  const navigate = useNavigate();
  //Placeholder funktion för logiken med vad man klickar på.
  function handleItemClick(parentCategory, itemName) {
    console.log(`Clicked on ${itemName} under ${parentCategory}`);
    if (itemName === "Se Alla Produkter") navigate("/AllItems");
    if (itemName === "Resale") navigate("/Resale");
    if (itemName === "Accessoarer" && parentCategory === "Man")
      navigate("/accessoriesMale");
    if (parentCategory === "Dam" && itemName === "Skor")
      navigate("/shoesFemale");
    if (parentCategory === "Man" && itemName === "Skor") navigate("/maleShoes");
    if (itemName === "Redigera Produkter") navigate("/editItem");
    if (itemName === "Skapa Kategori") navigate("/addCategory");
    if (itemName === "Lägg till Produkter") navigate("/addItems");
    if (itemName === "Login") navigate("/loginpage");
    if (itemName === "Kolla Lager") navigate("/checkstock");
    if (itemName === "Tickets") navigate("/tickets");
    if (itemName === "Accessoarer" && parentCategory === "Dam")
      navigate("/femaleaccessories");
    if (itemName === "Kläder" && parentCategory === "Dam")
      navigate("/femaleclothes");
    if (itemName === "Kläder" && parentCategory === "Man")
      navigate("/maleclothes");
    if(itemName === "Totalt Lager") navigate("/totaltLager")
      if(itemName === "Wishlist") navigate("/wishlist")
  }

  useEffect(() => {
    const fetchData = async () => {
      const menu = await fetchMenuData(userState);
      setMenuItems(menu);
    };
    fetchData();
  }, [userState]);


  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    navigate("/search", { state: { searchResults: filteredProducts } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo} // Ange sökvägen till din logga
          alt="Cool Fashion Logo"
          className="navbar-logo"
          onClick={() => navigate("/")} // Navigerar till startsidan
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="navbar-center">
        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li
              key={item.name} //Hämtare ut namen på alla items.
              className="navbar-item"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span
                onClick={() => {
                  if (!item.dropdown) {
                    handleItemClick(item.name, item.name);
                  }
                }}
              >
                {item.name}
              </span>
              {openDropdown === item.name &&
                item.dropdown && ( //Aktiverar dropdown ifall det är aktivt (alltså man håller över något av meny alternativen.)
                  <ul className="dropdown">
                    {item.dropdown.map(
                      (
                        subItem,
                        index //Loopar igen alla objekten.
                      ) =>
                        typeof subItem === "string" ? ( //Om det är en sträng rendera direkt
                          <li
                            key={index} //Nyckel för varje underkatigori
                            className="dropdown-item"
                            onClick={() =>
                              handleItemClick(subItem.name, subItem)
                            } //Används bara ifall användaren klickar på nyheter eftersom den inte har en parent.
                          >
                            {subItem}
                          </li>
                        ) : (
                          <li key={subItem.name} className="dropdown-item">
                            <span
                              onClick={() =>
                                handleItemClick(item.name, subItem.name)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {subItem.name}
                            </span>
                            <ul className="nested-dropdown">
                              {subItem.content.map(
                                (
                                  contentItem,
                                  subIndex //Samma som oven bara ifall det finns nestade items som det gör i dam och her.
                                ) => (
                                  <li
                                    key={subIndex}
                                    className="nested-dropdown-item"
                                    onClick={(e) => {
                                      e.stopPropagation(); //Förhindrar att klicket påverkar parenten eller andra element ovan.
                                      handleItemClick(
                                        subItem.name,
                                        contentItem
                                      );
                                    }}
                                  >
                                    {contentItem}
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        )
                    )}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
          <div className="navbar-right">
        <li className="navbar-item">
          <input
              type="text"
              className="animated-search-input"
              placeholder="🔍Sökning av plagg... "
              value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
            />
          </li>
          <li className="navbar-item">
            <span onClick={() => navigate("/loginPage")}>Login</span>
          </li>
        </div>
    </nav>
  );
}
