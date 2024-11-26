import "../css/shoes.css";
import {ContentCard} from "./content";

const accessoarerLandingImage  = "/assets/damskor.PNG";
const image1 = "assets/löparSko.jpg"
const image2 = "assets/Product2.jpeg";
const image3 = "assets/snyggSko.jpg";
const image4 = "assets/sommarskodam.jpg";


export function ShoesFemale() {
    const accessories = [
        {
            id: 1,
            image: image1,
            title: "Product 1",
            price: 100,
            buttonText: "Buy",
        },
        {
            id: 2,
            image: image2,
            title: "Product 2",
            price: 100,
            buttonText: "Buy",
        },
        {
            id: 3,
            image: image3,
            title: "Product 3",
            price: 100,
            buttonText: "Buy",
        },
        {
            id: 4,
            image: image4,
            title: "Product 4",
            price: 100,
            buttonText: "Buy",
        },
    ];

    return (
        <div className="herr-accessoarer">

            <div className="landing-image-container">
                <img
                    src={accessoarerLandingImage}
                    alt="Herr Accessories Landing"
                    className="landing-image"
                />
            </div>

            <h1>Dam skor</h1>
            <div className="content-cards">
                {accessories.map((card) => (
                    <ContentCard
                        key={card.id}
                        image={card.image}
                        title={card.title}
                        price={card.price}
                        buttonText={card.buttonText}
                        onButtonClick={() => alert(`${card.title} köpt!`)}
                    />
                ))}
            </div>
        </div>
    );
}
