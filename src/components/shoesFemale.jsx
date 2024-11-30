import { items } from "../items";
import { ContentCard } from "./content";
import "../css/shoes.css";
import femaleShoesMp4 from "../assets/Femaleshoes.mp4";

const landingImage = "/assets/damskor.PNG";

export function ShoesFemale() {
  const femaleShoes = items.flatMap((itemGroup) => itemGroup.Dam?.Skor || []);

  return (
    <div className="dam-skor">
      <video
        className="video"
        src={femaleShoesMp4}
        alt="Female shoes Video"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="content-cards">
        {femaleShoes.map((shoe) => (
          <ContentCard
            key={shoe.id}
            image={shoe.img}
            title={shoe.name}
            price={`${shoe.pris} kr`}
            buttonText="Köp"
            seller="Damsko"
            onButtonClick={() => alert(`Du klickade på ${shoe.name}`)}
          />
        ))}
      </div>
    </div>
  );
}
