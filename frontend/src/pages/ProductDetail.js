import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail({cart, setCart }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // REVIEW
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    // Gọi API
    useEffect(() => {
        axios.get(`http://localhost:8081/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [id]);
    useEffect(() => {
        axios.get(`http://localhost:8081/api/reviews/product/${id}`)
            .then(res => setReviews(res.data))
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
    const handleReview = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Vui lòng đăng nhập để đánh giá!");
            navigate("/login");
            return;
        }

        if (comment.trim() === "") {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        try {

            await axios.post("http://localhost:8081/api/reviews", {
                productId: product.id,
                userId: user.id,
                rating: rating,
                comment: comment
            });

            alert("Đánh giá thành công!");

            // load lại review
            const res = await axios.get(
                `http://localhost:8081/api/reviews/product/${id}`
            );

            setReviews(res.data);

            setComment("");
            setRating(5);

        } catch (err) {

            console.log(err);

            alert("Không thể gửi đánh giá!");

        }

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

            {/* REVIEW */}
            <div className="mt-5">
                <div className="card p-3 mb-4">

                    <h5>Viết đánh giá</h5>

                    <div className="mb-3">
                        <label className="form-label">Số sao</label>

                        <select
                            className="form-select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            <option value={5}>★★★★★ (5 sao)</option>
                            <option value={4}>★★★★☆ (4 sao)</option>
                            <option value={3}>★★★☆☆ (3 sao)</option>
                            <option value={2}>★★☆☆☆ (2 sao)</option>
                            <option value={1}>★☆☆☆☆ (1 sao)</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Nhập đánh giá của bạn..."
                        />
                    </div>

                    <button
                        className="btn btn-warning"
                        onClick={handleReview}
                    >
                        Gửi đánh giá
                    </button>

                </div>

                <h3>Đánh giá sản phẩm</h3>

                {reviews.length === 0 ? (

                    <p>Chưa có đánh giá nào.</p>

                ) : (

                    reviews.map(review => (

                        <div
                            key={review.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6>
                                {review.user?.username}
                            </h6>

                            <div style={{ color: "#f5a623" }}>
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>

                            <p className="mt-2">
                                {review.comment}
                            </p>

                            {/* Phản hồi của shop */}
                            {review.reply && (
                                <div
                                    style={{
                                        background: "#f8f9fa",
                                        borderLeft: "4px solid #f5a623",
                                        padding: "10px",
                                        marginTop: "10px",
                                        borderRadius: "6px"
                                    }}
                                >
                                    <strong>💬 Phản hồi từ BaDaShop</strong>

                                    <p style={{ margin: "6px 0 0" }}>
                                        {review.reply}
                                    </p>
                                </div>
                            )}

                            <small className="text-muted">
                                {new Date(review.createdAt).toLocaleString("vi-VN")}
                            </small>

                        </div>

                    ))

                )}

            </div>
        </div>
    );
}

export default ProductDetail;