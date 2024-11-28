import { ContentCard } from "./content";
import { resaleItems } from "../resaleItems";
import "../css/resale.css";
import resalesMp4 from "../assets/Resales.mp4";

export function Resale() {
  return (
    <>
      <div className="resaleContainer">
        <video
          className="video"
          src={resalesMp4}
          alt="Resales video"
          autoPlay
          loop
          muted
          playsInline
        />
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
