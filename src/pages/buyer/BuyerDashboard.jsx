
import { Link } from "react-router-dom";
import "./BuyerDashboard.css";

function BuyerDashboard() {
  return (
    <div className="buyer-container">

      <h2 className="dashboard-title">Buyer Dashboard</h2>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <h3>My Profile</h3>
        <p><strong>UID:</strong> 21IT045</p>
        <p><strong>Role:</strong> Buyer</p>
        <p><strong>Seller Status:</strong> Not Applied</p>

        <Link to="/buyer/become-seller">
          <button className="primary-btn">Become a Seller</button>
        </Link>
      </div>

      {/* DASHBOARD GRID */}
      <div className="dashboard-grid">

        {/* MY ORDERS */}
        <div className="dashboard-box">
          <h3>My Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#101</td>
                <td>Crochet Bunny</td>
                <td>Delivered</td>
                <td>10 Jan 2026</td>
              </tr>
              <tr>
                <td>#102</td>
                <td>Handmade Journal</td>
                <td>Pending</td>
                <td>15 Jan 2026</td>
              </tr>
            </tbody>
          </table>

          <Link to="/buyer/products">
            <button className="secondary-btn">Browse Products</button>
          </Link>
        </div>

        {/* RECENTLY VIEWED */}
        <div className="dashboard-box">
          <h3>Recently Viewed</h3>
          <ul>
            <li>Crochet Bunny</li>
            <li>Thrift Denim</li>
            <li>Handmade Journal</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default BuyerDashboard;
