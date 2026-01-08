import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div>
        <h2>CampusBazaar</h2>
      </div>

      <input type="text" placeholder="Search here..." />

      <div>
        <Link to="/login">Login</Link>{' '}
        <Link to="/signup">Sign Up</Link>{' '}
        <button>Sign as Seller</button>
      </div>
    </nav>
  );
}

export default Navbar;
