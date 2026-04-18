import { Link } from "react-router-dom";

function ProductCard(props) {
    return (
        <div className="col-md-3 mb-4">

            <div className="card shadow-sm">

                <Link
                    to={`/product/${props.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <img src={props.image} className="card-img-top product-img" />

                    <div className="card-body">
                        <h5>{props.name}</h5>
                        <p style={{ color: "#f5a623", fontWeight: "bold" }}>
                            {props.price.toLocaleString()}đ
                        </p>
                    </div>
                </Link>

            </div>

        </div>
    );
}

export default ProductCard;