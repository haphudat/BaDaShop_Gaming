import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductDetail({ setCart }) {

    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    const products = [
        {
            id: 1,
            name: "Chuột Gaming",
            price: "500.000đ",
            image: "https://via.placeholder.com/300"
        },
        {
            id: 2,
            name: "Bàn phím RGB",
            price: "1.200.000đ",
            image: "https://via.placeholder.com/300"
        },
        {
            id: 3,
            name: "Tai nghe Gaming",
            price: "800.000đ",
            image: "https://via.placeholder.com/300"
        }
    ];

    const product = products.find(p => p.id == id);

    return (
        <div className="container mt-4">

            {product ? (
                <div className="row">

                    {/* LEFT - IMAGE */}
                    <div className="col-md-6 text-center">
                        <img
                            src={product.image}
                            className="img-fluid border rounded"
                        />
                    </div>

                    {/* RIGHT - INFO */}
                    <div className="col-md-6">
                        <h2>{product.name}</h2>

                        <p
                            style={{
                                color: "#f5a623",
                                fontSize: "24px",
                                fontWeight: "bold"
                            }}
                        >
                            {product.price}
                        </p>

                        {/* QUANTITY */}
                        <div className="d-flex align-items-center mb-3">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>

                            <span className="mx-3">{quantity}</span>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        {/* BUTTON */}
                        <div className="d-flex gap-3">

                            <button
                                className="btn btn-warning px-4"
                                onClick={() => {
                                    setCart(prev => [...prev, { ...product, quantity }]);
                                    alert("Đã thêm vào giỏ!");
                                }}
                            >
                                🛒 Thêm vào giỏ
                            </button>

                            <button className="btn btn-danger px-4">
                                ⚡ Mua ngay
                            </button>

                        </div>
                    </div>

                </div>
            ) : (
                <h2>Không tìm thấy sản phẩm</h2>
            )}

        </div>
    );
}

export default ProductDetail;