import "../css/content.css";

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
      image: "https://via.placeholder.com/150",
      title: "Product 1",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Product 2",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Product 3",
      price: 100,
      buttonText: "Buy",
    },
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Product 4",
      price: 100,
      buttonText: "Buy",
    },
  ];

  return (
    <div className="content">
      <div className="content-landing-img">
        <img src="https://via.placeholder.com/800x300" alt="LandingImg" />
      </div>

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
