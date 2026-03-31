function Cart({ cart, setCart }) {

    // CHUYỂN "500.000đ" → 500000
    const parsePrice = (price) => {
        return Number(price.replace(/\./g, "").replace("đ", ""));
    };

    // TÍNH TỔNG
    const total = cart.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.quantity;
    }, 0);

    // XÓA
    const removeItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    return (
        <div className="container mt-4">
            <h2>Giỏ hàng</h2>

            {cart.length === 0 ? (
                <p>Chưa có sản phẩm</p>
            ) : (
                <div>

                    {cart.map((item, index) => (
                        <div key={index} className="border p-3 mb-2 d-flex justify-content-between">

                            <div>
                                <h5>{item.name}</h5>
                                <p>Giá: {item.price}</p>
                                <p>Số lượng: {item.quantity}</p>
                            </div>

                            <button
                                className="btn btn-danger"
                                onClick={() => removeItem(index)}
                            >
                                ❌
                            </button>

                        </div>
                    ))}

                    {/* TOTAL */}
                    <h4 className="mt-3">
                        Tổng tiền: {total.toLocaleString()}đ
                    </h4>

                </div>
            )}

        </div>
    );
}

export default Cart;