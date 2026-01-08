function Login() {
  return (
    <div>
      <h2>Login</h2>

      <input type="text" placeholder="UID" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <button>Login</button>

      <p>
        New user? <a href="/signup">Signup</a>
      </p>
    </div>
  );
}

export default Login;

