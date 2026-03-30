
/*function App() {
  return <h1>CampusBazaar</h1>;
}

export default App;
*/
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import BecomeSeller from './pages/buyer/BecomeSeller';
import Checkout from "./pages/buyer/Checkout";

import BuyerDashboard from './pages/buyer/BuyerDashboard';
import ProductList from './pages/buyer/ProductList';
import ProductDetails from './pages/buyer/ProductDetails';
import ShopPage from './pages/buyer/ShopPage';
import ShopList from './pages/buyer/ShopList';


import Chat from './pages/buyer/Chat';
import SellerApprovals from './pages/admin/SellerApprovals';

import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

import ProtectedSellerRoute from "./utils/protectedSellerRoute";
import NotApproved from "./pages/seller/notApproved.jsx";
import Cart from "./pages/buyer/Cart";
import AdminOrders from "./pages/admin/AdminOrders";



function App() {
  console.log(import.meta.env.VITE_SUPABASE_URL);
  const currentUser = {
  role: "seller",
  seller_status: "pending",
};

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/buyer/become-seller" element={<BecomeSeller />} />


      {/* Buyer */}
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/buyer/products" element={<ProductList />} />
      <Route path="/buyer/products/:id" element={<ProductDetails />} />
      <Route path="/buyer/chat/:sellerId" element={<Chat />} />
      <Route path="/buyer/cart" element={<Cart />} />
      <Route path="/buyer/checkout" element={<Checkout />} />
      <Route path="/shop/:id" element={<ShopPage />} />
      <Route path="/shops" element={<ShopList />} />

      {/* Seller */}
      {/* <Route path="/seller" element={<SellerDashboard />} /> */}
      <Route
       path="/seller"
        element={
          <ProtectedSellerRoute user={currentUser}>
            <SellerDashboard />
          </ProtectedSellerRoute>
        }
      />
      <Route path="/not-approved" element={<NotApproved />} />


      

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/approvals" element={<SellerApprovals />} />
      <Route path="/admin/orders" element={<AdminOrders />} />

    </Routes>
  );
}

export default App;
