import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Shop({ search, category }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const filteredProducts = products.filter(p => {
        const keyword = search.toLowerCase();

        return (
            (
                p.name?.toLowerCase().includes(keyword) ||
                p.category?.toLowerCase().includes(keyword) ||
                p.brand?.toLowerCase().includes(keyword)
            ) &&
            (category === "" || p.category === category)
        );
    });

    return (
        <div className="container mt-4">
            <div className="row">
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

export default Shop;