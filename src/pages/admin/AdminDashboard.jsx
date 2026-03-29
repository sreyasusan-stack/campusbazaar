// function AdminDashboard() {
//   return (
//     <div style={{ display: 'flex',color:'black',minHeight:'100vh' ,width:'100vw'
//     }}>
      
//       {/* Sidebar */}
//       <div style={{ width: '200px', padding: '10px',minHeight:'100vh' ,backgroundColor:'rgb(196 161 161)',borderRight: '8px solid rgb(56 48 48 / 33%)' }}>
//         <h3>Admin Panel</h3>
//         <p>Dashboard</p>
//         <p>Seller Approvals</p>
//       </div>

//       {/* Main Content */}
//       <div style={{ padding: '20px',backgroundColor:'white',flex:'1',alignContent: 'start',
//  }}>
//         <h1>Admin Dashboard</h1>

//         <div style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 300px)',gap: '60px'}}>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15)'}}>Total Users</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Total Buyers</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Total Sellers</div>
//           <div style={{width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Pending Seller Approvals</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15)' }}>Total Orders</div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default AdminDashboard;

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import './AdminDashboard.css';

function AdminDashboard() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    buyers: 0,
    sellers: 0,
    pending: 0,
  });

  const fetchDashboardStats = async () => {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("role, seller_status");

    const { data: requests, error: requestError } = await supabase
      .from("seller_requests")
      .select("status");

    if (userError || requestError) {
      console.error(userError || requestError);
      return;
    }

    setStats({
      totalUsers: users.length,
      buyers: users.filter(u => u.role === "buyer").length,
      sellers: users.filter(u => u.role === "seller" && u.seller_status === "approved").length,
      pending: requests.filter(r => r.status === "pending").length,
    });
  };

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("college_id, email, role, seller_status")
      .eq("id", user.id)
      .single();

    if (error || !data) return;

    const { data: profile, error: profileError } = await supabase
      .from("college_users")
      .select("name, class_or_designation, department")
      .eq("college_id", data.college_id)
      .single();

    if (profileError) console.error(profileError);

    setProfile({
      ...data,
      ...profile,
      email: user.email
    });
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchProfile();
  }, []);

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <h3>CampusBazaar</h3>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin" 
            end // Ensures this is ONLY active on the main dashboard
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-dot" /> Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin/approvals" 
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-dot" /> Seller Approvals
          </NavLink>
        </nav>
      </div>

      {/* Right Column */}
      <div className="right-col">

        {/* Topbar */}
        <div className="dash-topbar">
          <span className="dash-topbar-title">Admin Dashboard</span>
          <div className="dash-topbar-right">
            <span>Welcome back</span>
            <div
              className="dash-avatar"
              onClick={() => setPanelOpen(true)}
              title={profile?.email}
            >
              {profile?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h1>Overview</h1>

          <div className="stats-grid">
            <div className="stats-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stats-card">
              <h3>Total Buyers</h3>
              <p>{stats.buyers}</p>
            </div>
            <div className="stats-card">
              <h3>Total Sellers</h3>
              <p>{stats.sellers}</p>
            </div>
            <div className="stats-card">
              <h3>Pending Approvals</h3>
              <p>{stats.pending}</p>
            </div>
            <div className="stats-card">
              <h3>Total Orders</h3>
              <p>Coming Soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {panelOpen && (
        <div className="panel-overlay" onClick={() => setPanelOpen(false)} />
      )}

      {/* Slide Panel */}
      <div className={`slide-panel ${panelOpen ? "open" : ""}`}>
        <div className="panel-header">
          <p>My Profile</p>
          <button className="panel-close-btn" onClick={() => setPanelOpen(false)}>✕</button>
        </div>

        <div className="panel-body">
          <div className="panel-avatar">
            {profile?.name?.charAt(0).toUpperCase() ?? "A"}
          </div>
          <p className="panel-name">{profile?.name ?? "Admin"}</p>
          <p className="panel-role">{profile?.email ?? ""}</p>
          <div className="panel-badge-wrap">
            <span className="panel-badge">Admin</span>
          </div>

          {[
            ["Name",        profile?.name],
            ["College ID",  profile?.college_id],
            ["Designation", profile?.class_or_designation],
            ["Email",       profile?.email],
            ["Role",        "Admin"],
          ].map(([key, val]) => (
            <div className="info-row" key={key}>
              <span className="info-key">{key}</span>
              <span className="info-val">{val ?? "N/A"}</span>
            </div>
          ))}
        </div>

        <div className="panel-footer">
          <button
            className="signout-btn"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
          >
            Sign out
          </button>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;