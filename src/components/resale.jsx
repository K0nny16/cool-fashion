import { SearchProducts } from "./SearchProducts"; // Import SearchProducts component
import "../css/resale.css";
import resalesMp4 from "../assets/Resales.mp4";

export function Resale() {
    const handleProductClick = (product) => {
        alert(`${product.productName} - ${product.price} köpt!`);
    };

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

                <SearchProducts onProductClick={handleProductClick} />
                {/*
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
                        /> ))};
                        */}
            </div>
        </>
    );
}