
/*function App() {
  return <h1>CampusBazaar</h1>;
}

export default App;
*/
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import BuyerDashboard from './pages/buyer/BuyerDashboard';
import ProductList from './pages/buyer/ProductList';
import ProductDetails from './pages/buyer/ProductDetails';
import Chat from './pages/buyer/Chat';

import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Buyer */}
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/buyer/products" element={<ProductList />} />
      <Route path="/buyer/products/:id" element={<ProductDetails />} />
      <Route path="/buyer/chat/:sellerId" element={<Chat />} />

      {/* Seller */}
      <Route path="/seller" element={<SellerDashboard />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
