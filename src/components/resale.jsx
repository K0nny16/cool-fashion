import { ContentCard } from "./content";
import { resaleItems } from "../resaleItems";

export function Resale() {
  return (
    <>
      <div className="resale-container">
        <h1>Resale Marketplace</h1>
        <div className="content-cards">
          {resaleItems.map((item) => (
            <ContentCard
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              seller={item.seller}
              description={item.description}
              buttonText="Buy Now"
              onButtonClick={() => alert(`${item.title} purchased!`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
