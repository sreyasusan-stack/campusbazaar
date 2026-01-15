import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div>
        <h2>CampusBazaar</h2>
      </div>

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search products, shops, or categories..."
        />
      </div>
{/*<input type="text" placeholder="Search here..." />*/}

      <div className='nav-actions'>
        <Link to="/login">Login</Link>{' '}
        <Link to="/signup">Sign Up</Link>{' '}
        <Link to="/buyer/become-seller">
    <button>Become a Seller</button>
  </Link>
       {/* <button>Become a Seller</button> */}
      </div>
    </nav>
  );
}

export default Navbar;
