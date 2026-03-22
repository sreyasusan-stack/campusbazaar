/*import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  // safety check (prevents crash)
  if (!product) return null;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <Link to={`/buyer/products/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;*/

import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <Link to={`/buyer/products/${product.id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;


