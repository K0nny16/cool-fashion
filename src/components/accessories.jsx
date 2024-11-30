import { items } from "../items";
import { ContentCard } from "./content";
import "../css/accessories.css";
import maleShoes from "../assets/MaleAcc.mp4";

const landingImage = "/assets/accessoarer.PNG";

export function Accessories() {
  const accessories = items.flatMap(
    (itemGroup) => itemGroup.Herr?.accessories || []
  );

  return (
    <div className="herr-accessoarer">
      <div>
        <video
          src={maleShoes}
          className="video"
          alt="Male Accessories Video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="content-cards">
        {accessories.map((acc) => (
          <ContentCard
            key={acc.id}
            image={acc.img}
            title={acc.name}
            price={`${acc.pris} kr`}
            buttonText="Köp"
            seller="Accessoarer"
            onButtonClick={() => alert(`Du klickade på ${acc.name}`)}
          />
        ))}
      </div>
    </div>
  );
}
