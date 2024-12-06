import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestoreDB } from "../../firebase";
import "../../css/totaltLager.css"

export function TotaltLager(){
    const [totalQuant,setTotalQuant] = useState(0)
    const [recentProducts, setRecentProducts] = useState([])
    const [uniqueProducts, setUniqueProducts] = useState(0);

    async function fetchData() {
        try{
            const productsRef = collection(firestoreDB,"Products");
            const allProductsSnapshot = await getDocs(productsRef);

            let totalQuant = 0;
            let uniqueProducts = 0;
            allProductsSnapshot.forEach(doc => {
                uniqueProducts++
                totalQuant += doc.data().quant;
            })

            const recentQuary = query(productsRef, orderBy("dateAdded","desc"),limit(10));
            const recentSnapshot = await getDocs(recentQuary)

            const recentProducts = recentSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return {totalQuant,recentProducts,uniqueProducts}
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const {totalQuant,recentProducts,uniqueProducts} = await fetchData()
            setTotalQuant(totalQuant)
            setRecentProducts(recentProducts)
            setUniqueProducts(uniqueProducts)
        }
        getData();
    }, [])

    return (
        <div className="products-page">
            <header className="header">
                <h1>Produkter</h1>
                <h2>Totalt antal över alla varor: {totalQuant}</h2>
                <h2>Antal unika produkter: {uniqueProducts}</h2>
            </header>
            <section className="recent-products">
                <h3>10 Senaste Tillagda Produkter</h3>
                <ul>
                    {recentProducts.map(product => (
                        <li key={product.id} className="product-item">
                            <p><strong>Produkt-ID:</strong> {product.id}</p>
                            <p><strong>Namn:</strong> {product.productName}</p>
                            <p><strong>Kvantitet:</strong> {product.quant}</p>
                            <p><strong>Datum Tillagd:</strong> {product.dateAdded}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}