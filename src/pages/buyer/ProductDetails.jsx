import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartMsg, setCartMsg] = useState("");
 

useEffect(() => {
  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    else {
      setProduct(data);
      fetchRelated(data.category, data.id);
      saveRecentlyViewed(data.id); // add this line
    }
    setLoading(false);
  }
  fetchProduct();
}, [id]);

// recently viewed logic
async function saveRecentlyViewed(productId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("recently_viewed")
    .upsert({
      user_id: user.id,
      product_id: productId,
      viewed_at: new Date().toISOString()
    }, { onConflict: "user_id,product_id" });
}
async function fetchRecentlyViewed(userId) {
  const { data, error } = await supabase
    .from("recently_viewed")
    .select("*, products(*)")
    .eq("user_id", userId)
    .order("viewed_at", { ascending: false })
    .limit(4);

  if (error) console.error(error);
  else setRecentlyViewed(data || []);
}

  async function fetchRelated(category, currentId) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", currentId)
      .limit(3);
    if (data) setRelated(data);
  }

async function handleAddToCart() {
  const { data: existing } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", product.id)
    .single();

  if (existing) {
    await supabase
      .from("cart")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("cart")
      .insert({
        product_id: product.id,
        quantity: quantity
      });
  }

  navigate("/buyer/cart");
}

  const reviews = [
    { name: "Aanya S.", rating: 5, comment: "Absolutely love this! Great quality and fast delivery." },
    { name: "Rohan M.", rating: 4, comment: "Really nice product, exactly as described." },
    { name: "Priya K.", rating: 5, comment: "Bought this as a gift and everyone loved it!" },
  ];

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  if (loading) return <div className="pd-container">Loading...</div>;
  if (!product) return <div className="pd-container">Product not found.</div>;

  return (
    <div className="pd-container">
      <div className="pd-card">
        <div className="pd-layout">

          {/* LEFT — IMAGE */}
          <div className="pd-image-box">
            {product.image_urls
              ? <img src={product.image_urls} alt={product.name} className="pd-image" />
              : <div className="pd-image-placeholder">No Image</div>
            }
          </div>

          {/* RIGHT — DETAILS */}
          <div className="pd-info">

            {product.category && (
              <span className="pd-category">{product.category}</span>
            )}

            <h2>{product.name}</h2>

            <div className="pd-rating-summary">
              <span className="pd-stars">{"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}</span>
              <span className="pd-avg">{avgRating} / 5</span>
              <span className="pd-review-count">({reviews.length} reviews)</span>
            </div>

            <p className="pd-price">₹{product.price}</p>
            <p className="pd-desc">{product.description}</p>

            <p className="pd-seller">🏪 Sold by: <strong>Campus Seller</strong></p>

            <div className="pd-quantity">
              <span>Quantity:</span>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span className="pd-qty-num">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="pd-actions">
              <button className="primary-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              {cartMsg && <span className="cart-success-msg">{cartMsg}</span>}
              <button className="secondary-btn">Chat with Seller</button>
            </div>

            <div className="pd-back">
              <Link to="/buyer/products">
                <button className="outline-btn">Back to Products</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="pd-reviews-section">
        <h3>Customer Reviews</h3>
        <div className="pd-reviews-list">
          {reviews.map((r, i) => (
            <div className="pd-review-card" key={i}>
              <div className="pd-review-top">
                <span className="pd-review-name">{r.name}</span>
                <span className="pd-review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              </div>
              <p className="pd-review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="pd-related-section">
          <h3>You may also like</h3>
          <div className="pd-related-grid">
            {related.map((item) => (
              <Link to={`/buyer/products/${item.id}`} key={item.id} className="pd-related-card">
                <img src={item.image_urls} alt={item.name} className="pd-related-img" />
                <p className="pd-related-name">{item.name}</p>
                <p className="pd-related-price">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;