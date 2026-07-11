import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";

function AuthPage() {
  const { login, register, authError } = useAuth();

  const [isRegistering, setIsRegistering] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      return;
    }

    try {
      setSubmitting(true);

      if (isRegistering) {
        await register(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>
          {isRegistering
            ? "Create Account"
            : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          minLength={6}
          required
        />

        {authError && (
          <p className="error-message">
            {authError}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Please wait..."
            : isRegistering
              ? "Register"
              : "Login"}
        </button>

        <button
          type="button"
          onClick={() =>
            setIsRegistering((current) => !current)
          }
        >
          {isRegistering
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </button>
      </form>
    </main>
  );
}

export default AuthPage;