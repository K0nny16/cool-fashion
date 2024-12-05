import { getDatabase, ref, get } from "firebase/database";

export async function fetchMenuData(adminState) {
  const db = getDatabase();
  const navRef = ref(db, "nav");
  console.log(adminState)

  try {
    const snapshot = await get(navRef);
    if (!snapshot.exists()) {
      console.error("No data available");
      return [];
    }

    const navData = snapshot.val();
    const menuItems = [];

    // Shop
    if (navData.Shop) {
      const shopDropdown = [];
      for (const [categoryName, subCategories] of Object.entries(
        navData.Shop
      )) {
        shopDropdown.push({
          name: categoryName,
          content: Object.keys(subCategories),
        });
      }
      menuItems.push({ name: "Shop", dropdown: shopDropdown });
    }

    // Other menu items
    Object.entries(navData).forEach(([key, value]) => {
      if (key !== "Shop") {
        if (typeof value === "string") {
          menuItems.push({ name: key });
        }
      }
    });

    // Add admin menu if adminState is true
    if (adminState?.role === "admin") {
      menuItems.push({
        name: "Admin",
        dropdown: [
          "Redigera Produkter",
          "Lägg till Produkter",
          "Skapa Kategori",
          "Se Alla Produkter",
          "Tickets",
          "Kolla Lager",
          "Totalt lager",
        ],
      });
    }

    // Add user menu if adminState is true
    if (adminState?.role === "user") {
      menuItems.push({
        name: "Din profil",
        dropdown: [
          "Wishlist",
        ],
      });
    }
    return menuItems;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}
