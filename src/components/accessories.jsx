import {items} from "../items";
import { ContentCard } from "./content";
import "../css/accessories.css";

const landingImage  = "/assets/accessoarer.PNG";

export function Accessories() {
    const accessories = items.flatMap((itemGroup) => itemGroup.Herr?.accessories || [])

    return (
        <div className="herr-accessoarer">
            <div className="landing-image-container">
                <img
                    src={landingImage}
                    alt="Herr Accessories Landing"
                    className="landing-image"
                />
            </div>

            <h1>Herr Accessories</h1>
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
