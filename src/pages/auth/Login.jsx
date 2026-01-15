import './Auth.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to CampusBazaar</h2>

        <input type="text" placeholder="Enter your UID" />
        <input type="password" placeholder="Enter your password" />

        <button>Login</button>

        <p className="auth-link">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

