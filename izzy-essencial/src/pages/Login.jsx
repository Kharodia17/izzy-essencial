import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { login } from "../firebase/auth.js";

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Email ou palavra-passe incorretos.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "radial-gradient(circle at top right, #c5e7ff 0%, #f9f9ff 70%)" }}>
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-xl shadow-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-display text-headline-md text-on-surface">{t.adminLogin}</h1>
          <p className="text-on-surface-variant font-body text-body-md mt-1">Izzy Essencial</p>
        </div>

        {error && (
          <p className="bg-error-container text-on-error-container rounded-lg px-4 py-3 font-label text-label-md text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">{t.email}</label>
            <input
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">{t.password}</label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-on-primary font-label text-label-md hover:opacity-90 disabled:opacity-50 transition-opacity mt-2"
          >
            {loading ? "..." : t.login}
          </button>
        </form>
      </div>
    </div>
  );
}
