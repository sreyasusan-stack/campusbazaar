import { Link } from "react-router-dom";

function BuyerDashboard() {
  return (
    <div style={{ padding: "40px" }}>

      <h2>Buyer Dashboard</h2>

      <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        width: "300px",
        backgroundColor: "#f7f2f2"
      }}>
        <h3>Want to sell on CampusBazaar?</h3>
        <p>Apply now and start your campus shop!</p>

        <Link to="/buyer/become-seller">
          <button>Become a Seller</button>
        </Link>
      </div>
      
      <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        width: "300px",
        backgroundColor: "#f7f2f2"
      }}>
        <h3>Buyer Details </h3>
        
      </div>
      
      <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        width: "300px",
        backgroundColor: "#f7f2f2"
      }}>
        <h3>My orders</h3>

      </div>
      
    </div>
  );
}

export default BuyerDashboard;
