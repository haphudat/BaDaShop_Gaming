import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail({cart, setCart }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Gọi API
    useEffect(() => {
        axios.get(`http://localhost:8081/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [id]);

    // 👉 format giá
    const formatPrice = (price) => {
        return price?.toLocaleString() + "đ";
    };

    // Thêm vô giỏ
    const handleAddToCart = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Vui lòng đăng nhập!");
            navigate("/login");
            return;
        }

        // Kiêm tra
        const existing = cart.find(item => item.id === product.id);

        const currentQty = existing ? existing.quantity : 0;

        const newTotal = currentQty + quantity;

        if (newTotal > product.stock) {
            alert("Vượt quá số lượng trong kho!");
            return;
        }

        // Chỉ chạy khi hợp lệ
        setCart(prev => {

            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity }];
            }
        });

        alert("Đã thêm vào giỏ!");
    };

    const handleBuyNow = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Vui lòng đăng nhập!");
            navigate("/login");
            return;
        }

        // 👉 kiểm tra stock giống addToCart
        const existing = cart.find(item => item.id === product.id);
        const currentQty = existing ? existing.quantity : 0;
        const newTotal = currentQty + quantity;

        if (newTotal > product.stock) {
            alert("Vượt quá số lượng trong kho!");
            return;
        }

        //Tạo 1 san phẩm
        const item = [{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        }];

        // Chuyển
        localStorage.setItem("checkout_items", JSON.stringify(item));

        navigate("/checkout");
    };

    if (!product) return <h2 className="mt-4">Đang tải...</h2>;

    return (
        <div className="container mt-4">
            <div className="row">

                {/* IMAGE */}
                <div className="col-md-6 text-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid border rounded"
                    />
                </div>

                {/* INFO */}
                <div className="col-md-6">

                    <h2>{product.name}</h2>

                    <p style={{
                        color: "#f5a623",
                        fontSize: "24px",
                        fontWeight: "bold"
                    }}>
                        {formatPrice(product.price)}
                    </p>

                    <p><b>Hãng:</b> {product.brand}</p>
                    <p><b>Mô tả:</b> {product.description}</p>
                    <p><b>Còn lại:</b> {product.stock}</p>

                    {/* THÔNG SỐ */}
                    {product.specs && (
                        <div className="mt-3">
                            <h5>Thông số sản phẩm</h5>
                            <ul>
                                {product.specs
                                    .replace(/\\n/g, "\n")
                                    .split("\n")
                                    .map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {/* QUANTITY */}
                    <div className="d-flex align-items-center mb-3 mt-3">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setQuantity(q => q - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>

                        <span className="mx-3">{quantity}</span>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setQuantity(q => q + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* BUTTON */}
                    <div className="d-flex gap-3">

                        <button
                            className="btn btn-warning px-4"
                            onClick={handleAddToCart}
                        >
                            🛒 Thêm vào giỏ
                        </button>

                        <button
                            className="btn btn-danger px-4"
                            onClick={handleBuyNow}>Mua ngay</button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductDetail;