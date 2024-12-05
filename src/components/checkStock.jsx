import { useProducts } from "./productprovider";
import "../css/lowstock.css";

export function CheckStock() {
  const { products } = useProducts();

  const lowStockProducts = products.filter((product) => product.quant < 2);

  return (
    <div className="lowstockcontainer">
      <h1>Få produkter i lager</h1>
      {lowStockProducts.length > 0 ? (
        <div className="content-cards">
          {lowStockProducts.map((product) => (
            <div key={product.id}>
              <ContentCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p>Inga produkter med lågt saldotal</p>
      )}
    </div>
  );
}

export function ContentCard({ product }) {
  const { productName, price, images, quant } = product;
  const image =
    images && images[0] ? images[0] : "https://via.placeholder.com/150";

  const handlePurchase = () => {
    alert(`Du har köpt mer av:  ${productName}`);
  };

  return (
    <div className="content-card">
      <img src={image} alt={productName} className="content-card-image" />
      <h3>{productName}</h3>
      <p>{`Price: $${price}`}</p>
      <p>{`Quantity: ${quant}`}</p>
      <button onClick={handlePurchase} disabled={quant === 0}>
        {quant === 0 ? "Out of Stock" : "Köp"}
      </button>
    </div>
  );
}
