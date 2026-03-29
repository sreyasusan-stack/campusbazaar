import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    hostel: "",
    room: "",
    landmark: ""
  });

  const [payment, setPayment] = useState("upi");

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

  const total = cartItems.reduce((sum, item) =>
    sum + item.products.price * item.quantity, 0);

  function handleAddressChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  async function handlePlaceOrder() {
    if (!address.fullName || !address.phone || !address.hostel) {
      alert("Please fill in all required fields.");
      return;
    }

    setPlacing(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        buyer_id: user ? user.id : null,
        user_id: user ? user.id : null,
        seller_id: null,
        status: "pending",
        total_amount: total,
        total_price: total,
        payment_method: payment,
        delivery_address: `${address.hostel}, Room ${address.room}, ${address.landmark}`,
        buyer_name: address.fullName,
        buyer_phone: address.phone,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order error:", orderError);
      alert("Failed to place order: " + orderError.message);
      setPlacing(false);
      return;
    }

    // insert order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) console.error("Order items error:", itemsError);

    // clear cart
    const { error: cartError } = await supabase
      .from("cart")
      .delete()
      .gt("id", "00000000-0000-0000-0000-000000000000");

    if (cartError) console.error("Cart clear error:", cartError);

    setPlacing(false);
    setOrderPlaced(true);
  }

  // ORDER SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed!</h2>
          <p>Your order has been placed successfully. The seller will confirm it shortly.</p>
          <button className="success-btn" onClick={() => navigate("/buyer/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="checkout-page">Loading...</div>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-layout">

        {/* LEFT — FORMS */}
        <div className="checkout-left">

          <div className="checkout-section">
            <h3>Delivery Address</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={address.fullName}
              onChange={handleAddressChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={address.phone}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="hostel"
              placeholder="Hostel / Building Name *"
              value={address.hostel}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="room"
              placeholder="Room / Flat Number"
              value={address.room}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (optional)"
              value={address.landmark}
              onChange={handleAddressChange}
            />
          </div>

          <div className="checkout-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              {[
                { value: "upi", label: "UPI", icon: "📱" },
                { value: "cash", label: "Cash on Delivery", icon: "💵" },
                { value: "card", label: "Card", icon: "💳" },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`payment-option ${payment === option.value ? "selected" : ""}`}
                  onClick={() => setPayment(option.value)}
                >
                  <span className="payment-icon">{option.icon}</span>
                  <span>{option.label}</span>
                  <span className="payment-radio">
                    {payment === option.value ? "●" : "○"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="checkout-right">
          <div className="checkout-section">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="summary-item" key={item.id}>
                  <img
                    src={item.products.image_urls}
                    alt={item.products.name}
                    className="summary-img"
                  />
                  <div className="summary-info">
                    <p className="summary-name">{item.products.name}</p>
                    <p className="summary-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="summary-price">₹{item.products.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-tag">Free</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? "Placing Order..." : `Place Order • ₹${total}`}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;