import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const { data, error } = await supabase
      .from("cart")
      .select("*, products(*)");

    if (error) console.error(error);
    else setCartItems(data);
    setLoading(false);
  }

  async function removeItem(cartId) {
    await supabase.from("cart").delete().eq("id", cartId);
    fetchCart();
  }

  async function updateQuantity(cartId, newQty) {
    if (newQty < 1) return;
    await supabase.from("cart").update({ quantity: newQty }).eq("id", cartId);
    fetchCart();
  }

  const total = cartItems.reduce((sum, item) =>
    sum + item.products.price * item.quantity, 0);

  if (loading) return <div className="cart-page">Loading...</div>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <button className="continue-btn" onClick={() => navigate("/buyer/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.products.image_urls}
                  alt={item.products.name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h4>{item.products.name}</h4>
                  <p className="cart-item-category">{item.products.category}</p>
                  <p className="cart-item-price">₹{item.products.price} each</p>
                </div>
                <div className="cart-item-right">
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-total">₹{item.products.price * item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div>
              <p className="cart-total-label">Total Amount</p>
              <h3 className="cart-total">₹{total}</h3>
            </div>
            <div className="cart-footer-btns">
              <button className="continue-btn" onClick={() => navigate("/buyer/products")}>
                Continue Shopping
              </button>
             <button className="checkout-btn" onClick={() => navigate("/buyer/checkout")}>
  Proceed to Checkout
</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;