import React, { useState } from "react";
import { useAuthViewModel } from "./useAuthViewModel";

export function AuthView(): JSX.Element {
  const { model, register, login } = useAuthViewModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = (email ?? "").trim();
    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        await register(trimmedEmail, password);
      } else {
        await login(trimmedEmail, password);
      }
      // On success, clear inputs (UI doesn't navigate yet)
      setEmail("");
      setPassword("");
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setError(null);
    setMode((m) => (m === "login" ? "register" : "login"));
  }

  const title = mode === "login" ? "Login" : "Create Account";

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </div>

        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <div>
          <button type="submit" disabled={loading || model.loading}>
            {loading ? "Please wait..." : title}
          </button>
          <button type="button" onClick={toggleMode} disabled={loading || model.loading}>
            {mode === "login" ? "Switch to Create Account" : "Switch to Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthView;
