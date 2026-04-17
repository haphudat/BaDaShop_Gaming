import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home({ search, category }) {

    const [products, setProducts] = useState([]);

    // Gọi API
    useEffect(() => {
        axios.get("http://localhost:8081/api/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || p.category === category)
    );
    return (
        <div className="container mt-4">

            {/* Banner */}
            <div className="bg-white p-5 rounded shadow-sm">
                <h1 style={{ color: "#f5a623" }}>BaDaShop Gaming</h1>
                <p>Phụ kiện gaming chất lượng cao</p>
            </div>

            {/* Product List */}
            <div className="row mt-4">

                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}

            </div>

        </div>
    );
}

export default Home;