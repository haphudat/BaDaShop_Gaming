import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {

    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    // chọn sản phẩm
    const toggle = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    // tăng
    const increase = (id) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    // giảm
    const decrease = (id) => {
        setCart(cart.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    // xóa
    const remove = (id) => {
        setCart(cart.filter(item => item.id !== id));
        setSelected(selected.filter(i => i !== id));
    };

    // tổng tiền (chỉ tính cái đã chọn)
    const total = cart.reduce((sum, item) => {
        if (selected.includes(item.id)) {
            return sum + item.price * item.quantity;
        }
        return sum;
    }, 0);

    return (
        <div className="container mt-4">

            <h2>Giỏ hàng</h2>

            {cart.length === 0 ? (
                <p>Chưa có sản phẩm</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} className="d-flex align-items-center border p-3 mb-2">

                            {/* checkbox */}
                            <input
                                type="checkbox"
                                checked={selected.includes(item.id)}
                                onChange={() => toggle(item.id)}
                                className="me-3"
                            />

                            {/* ảnh */}
                            <img
                                src={item.image}
                                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                className="me-3"
                            />

                            {/* tên */}
                            <div style={{ flex: 1 }}>
                                <div>{item.name}</div>
                                <div>{item.price.toLocaleString()}đ</div>
                            </div>

                            {/* số lượng */}
                            <div className="d-flex align-items-center gap-2">
                                <button onClick={() => decrease(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increase(item.id)}>+</button>
                            </div>

                            {/* tổng từng sản phẩm */}
                            <div style={{ width: "120px", textAlign: "right", color: "red" }}>
                                {(item.price * item.quantity).toLocaleString()}đ
                            </div>

                            {/* xóa */}
                            <button
                                onClick={() => remove(item.id)}
                                className="btn text-danger ms-3"
                            >
                                <i className="fa-solid fa-circle-xmark"></i>
                            </button>

                        </div>
                    ))}

                    {/* footer */}
                    <div className="d-flex justify-content-between align-items-center mt-3">

                        <h5>
                            Tổng ({selected.length}):
                            <span style={{ color: "red", marginLeft: "10px" }}>
                                {total.toLocaleString()}đ
                            </span>
                        </h5>

                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                if (selected.length === 0) {
                                    alert("Chọn sản phẩm");
                                    return;
                                }
                                navigate("/checkout");
                            }}
                        >
                            Mua hàng
                        </button>

                    </div>
                </>
            )}

        </div>
    );
}

export default Cart;