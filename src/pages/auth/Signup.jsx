import './Auth.css';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input type="text" placeholder="Enter your UID" />
        <input type="password" placeholder="Create password" />
        <input type="password" placeholder="Confirm password" />

        <button>Signup</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

