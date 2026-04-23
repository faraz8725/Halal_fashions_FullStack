import { useState } from "react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      <form>
        {isSignup && <input type="text" placeholder="Full Name" />}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p onClick={() => setIsSignup(!isSignup)} style={{cursor:"pointer"}}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Login;