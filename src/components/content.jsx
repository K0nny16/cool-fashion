import "../css/content.css";

const image1 = "assets/Product1.webp"
const image2 = "assets/Product2.jpeg";
const image3 = "assets/Product3.png";
const image4 = "assets/Product4.png";
const landingImage = "assets/cool-fashion-LandingImage.png"
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
}) {
  return (
    <div className="content-card">
      <img src={image} alt={title} className="content-card-image" />
      <h3 className="content-card-title">{title}</h3>
      <p className="content-card-price">{price}</p>
      <button className="content-card-button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export function Content() {
  const cards = [
    {
      id: 1,
      image: image1,
      title: "Product 1",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: image2,
      title: "Product 2",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: image3,
      title: "Product 3",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: image4,
      title: "Product 4",
      price: 100,
      buttonText: "Buy",
    },
  ];

  return (
    <div className="content">
      {/* <div className="content-landing-img">
        <img src={landingImage} alt="Landing"/>
      </div> */}
      <div className="content-category-img">
        <img src={herrskor} alt="herrskor" />
        <div className="content-category-vertical-img">
        <img src={damskor} alt="damskor" />
        <img src={accessoarer} alt="accessoarer" />
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
