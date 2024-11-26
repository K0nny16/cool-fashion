import "../css/accessories.css";
import { ContentCard } from "./content";

const accessoarerLandingImage  = "/assets/accessoarer.PNG";
const image1 = "assets/Product1.webp"
const image2 = "assets/Product2.jpeg";
const image3 = "assets/Product3.png";
const image4 = "assets/Product4.png";



export function Accessories() {
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

            <h1>Herr Accessories</h1>
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
