import {items} from "../items";
import {ContentCard} from "./content";
import "../css/shoes.css";

const accessoarerLandingImage = "/assets/damskor.PNG";

export function ShoesFemale() {
    const femaleShoes = items.flatMap(itemGroup => itemGroup.Dam?.Skor || []);

    return (
        <div className="dam-skor">
            <div className="landing-image-container">
                <img
                    src={accessoarerLandingImage}
                    alt="dam skor Landing"
                    className="landing-image"
                />
            </div>

            <h1>Dam skor</h1>
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
