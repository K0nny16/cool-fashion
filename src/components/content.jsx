import "../css/content.css";
import { useNavigate } from "react-router-dom";

const herrskor = "/assets/herrskor.PNG";
const damskor = "/assets/damskor.PNG";
const accessoarer = "/assets/accessoarer.PNG";

// Komponent för content kortet
export function ContentCard({
  image,
  title,
  price,
  buttonText,
  onButtonClick,
  description,
  seller,
}) {
  return (
    <div className="content-card">
      <img src={image} alt={title} className="content-card-image" />
      <h3 className="content-card-title">{title}</h3>
      <p className="content-card-price">{price}</p>
      <p className="content-card-seller">{seller}</p>
      <p className="content-card-description">{description}</p>
      <button className="content-card-button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export function Content() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const cards = [
    {
      id: 1,
      image: "/assets/Product1.webp",
      title: "Product 1",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 2,
      image: "/assets/Product2.jpeg",
      title: "Product 2",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 3,
      image: "/assets/Product3.png",
      title: "Product 3",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 4,
      image: "/assets/Product4.png",
      title: "Product 4",
      price: 100,
      buttonText: "Buy",
    },
  ];

  return (
    <div className="content">
      <div className="black-friday-banner">
        BLACK FRIDAY
      </div>
      <div className="content-category-img">
        {/* Herrskor */}
        <img
          src={herrskor}
          alt="herrskor"
          className="clickable-image"
          onClick={() => handleNavigate("/maleShoes")}
        />
        <div className="content-category-vertical-img">
          {/* Damskor */}
          <img
            src={damskor}
            alt="damskor"
            className="clickable-image"
            onClick={() => handleNavigate("/shoesFemale")}
          />
          {/* Accessoarer */}
          <img
            src={accessoarer}
            alt="accessoarer"
            className="clickable-image"
            onClick={() => handleNavigate("/accessoriesMale")}
          />
        </div>
      </div>
      <h2 className="news-title">NYHETER</h2>
      <div className="content-cards">
        {cards.map((card) => (
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
