

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import "./SellerApprovals.css";

function SellerApprovals() {
  const [sellers, setSellers] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch pending seller applications
  useEffect(() => {
    const fetchSellerRequests = async () => {
      const { data, error } = await supabase
        .from("seller_requests")
        .select(`
          id,
          uid,
          shop_name,
          shop_description,
          category,
          college_users (
            name,
            class_or_designation
          )
        `)
        .eq("status", "pending");

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setSellers(data);
      }
    };

    fetchSellerRequests();
  }, []);

  // Approve Seller
 const handleApprove = async (requestId, uid, shopName, shopDescription) => {
  setMessage("");

  // 1. Update seller_requests status
  const { error: requestError } = await supabase
    .from("seller_requests")
    .update({ status: "approved" })
    .eq("id", requestId);

  // 2. Update users table
  const { error: userError } = await supabase
    .from("users")
    .update({ seller_status: "approved" })
    .eq("uid", uid);

  // 3. Create shop automatically 
  const { error: shopError } = await supabase
    .from("shops")
    .insert({
      seller_id: uid,
      name: shopName,
      description: shopDescription,
    });

  if (requestError || userError || shopError) {
    console.error(requestError || userError || shopError);
    setMessage("Error approving seller ❌");
  } else {
    setSellers(prev => prev.filter(seller => seller.id !== requestId));
    setMessage("Seller approved and shop created successfully ✅");
  }
};

  //  Reject Seller
  const handleReject = async (requestId, uid) => {
    setMessage("");

    const { error: requestError } = await supabase
      .from("seller_requests")
      .update({ status: "rejected" })
      .eq("id", requestId);

    const { error: userError } = await supabase
      .from("users")
      .update({ seller_status: "rejected" })
      .eq("uid", uid);

    if (requestError || userError) {
      console.error(requestError || userError);
      setMessage("Error rejecting seller ");
    } else {
      setSellers(prev =>
        prev.filter(seller => seller.id !== requestId)
      );
      setMessage("Seller rejected successfully ");
    }
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <p><Link to="/admin">Dashboard</Link></p>
        <p><Link to="/admin/approvals">Seller Approvals</Link></p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Pending Seller Approvals</h1>

        {/* Feedback Message */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* Empty State */}
        {sellers.length === 0 && (
          <div className="empty-state-card">
            {/* <h3>All caught up!</h3> */}
            <p>No pending seller approvals.</p>
          </div>
        )}

        {/* Seller Cards */}
        {sellers.map((seller) => (
          <div className="seller-card" key={seller.id}>

            <p><b>UID:</b> {seller.uid}</p>

            <p>
              <b>Name:</b>{" "}
              {seller.college_users?.name || "N/A"}
            </p>

            <p>
              <b>Class / Position:</b>{" "}
              {seller.college_users?.class_or_designation || "N/A"}
            </p>

            <p><b>Shop Name:</b> {seller.shop_name}</p>
            <p><b>Shop Description:</b> {seller.shop_description}</p>
            <p><b>Category:</b> {seller.category}</p>

            <div className="action-buttons">
            <button
  className="approve-btn"
  onClick={() => handleApprove(seller.id, seller.uid, seller.shop_name, seller.shop_description)}
>
  Approve
</button>

              <button
                className="reject-btn"
                onClick={() => handleReject(seller.id, seller.uid)}
              >
                Reject
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default SellerApprovals;
