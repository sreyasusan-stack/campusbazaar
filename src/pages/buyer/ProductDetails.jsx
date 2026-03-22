import { Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  return (
    <div className="pd-container">

      <div className="pd-card">

        <div className="pd-layout">

          {/* LEFT — IMAGE AREA */}
          <div className="pd-image-box">
            <div className="pd-image-placeholder">
              Product Image
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="pd-info">
            <h2>Campus Hoodie</h2>

            <p className="pd-price">₹699</p>

            <p className="pd-desc">
              Warm, comfortable, campus-themed hoodie designed for daily college wear.
              Soft fabric, relaxed fit, and durable stitching.
            </p>

            <div className="pd-actions">
              <button className="primary-btn">Add to Cart</button>

              <Link to="/buyer/chat/1">
                <button className="secondary-btn">Chat with Seller</button>
              </Link>
            </div>

            <div className="pd-back">
              <Link to="/buyer/products">
                <button className="outline-btn">Back to Products</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

