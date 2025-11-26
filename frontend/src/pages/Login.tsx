import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { FormEvent } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      // Save token and role
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.user.role);

      setLoading(false);

      // Redirect
      if (data.user.role === "admin") {
        navigate("/Admindashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Network error.");
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6", // Tailwind bg-gray-100
    padding: "16px",
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 0",
    borderRadius: "12px",
    fontWeight: 600,
    color: "#ffffff",
    backgroundColor: loading ? "#9ca3af" : "#eb2525ff",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "8px",
  };

  const linkStyle: React.CSSProperties = {
    color: "#2563eb",
    textDecoration: "underline",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px" }}>
        Welcome to MBS
      </h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <div style={errorStyle}>{error}</div>}

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Enter your password"
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ fontSize: "14px", textAlign: "center", marginTop: "8px" }}>
          New here?{" "}
          <Link to="/register" style={linkStyle}>
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
