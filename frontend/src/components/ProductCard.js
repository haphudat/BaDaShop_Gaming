import { Link } from "react-router-dom";

function ProductCard(props) {
    return (
        <div className="col-md-3 mb-4">
            <Link to={`/product/${props.id}`} style={{ textDecoration: "none", color: "inherit" }}>

                <div className="card shadow-sm">
                    <img src={props.image} className="card-img-top" />
                    <div className="card-body">
                        <h5>{props.name}</h5>
                        <p style={{ color: "#f5a623", fontWeight: "bold" }}>
                            {props.price}
                        </p>
                    </div>
                </div>

            </Link>
        </div>
    );
}

export default ProductCard;