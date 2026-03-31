import ProductCard from "../components/ProductCard";

function Home({ search }) {

    const products = [
        {
            id: 1,
            name: "Chuột Gaming",
            price: "500.000đ",
            image: "https://via.placeholder.com/200"
        },
        {
            id: 2,
            name: "Bàn phím RGB",
            price: "1.200.000đ",
            image: "https://via.placeholder.com/200"
        },
        {
            id: 3,
            name: "Tai nghe Gaming",
            price: "800.000đ",
            image: "https://via.placeholder.com/200"
        }
    ];

    // ✅ đặt SAU products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
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