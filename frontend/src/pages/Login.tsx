import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Role = "user" | "admin";

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

  function handleChange(
    field: keyof LoginForm,
    value: string
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function fakeAuthenticate(
    email: string,
    password: string
  ): { role: Role } | null {
    // Very simple mock:
    // - admin@mbs.com with password admin123 => admin
    // - anything with password user123 => user
    if (email === "admin@mbs.com" && password === "admin123") {
      return { role: "admin" };
    }
    if (password === "user123") {
      return { role: "user" };
    }
    return null;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { email, password } = form;

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const result = fakeAuthenticate(email, password);

    if (!result) {
      setError("Invalid email or password (try admin@mbs.com / admin123 or any-email / user123).");
      setLoading(false);
      return;
    }

    const user = {
      email,
      role: result.role,
      name: email.split("@")[0],
    };

    // Save "logged-in user" in localStorage (for Navbar / ProtectedRoute later)
    localStorage.setItem("mbs_user", JSON.stringify(user));

    setLoading(false);

    if (result.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 border rounded-2xl p-6 bg-white space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <p className="text-sm text-gray-600 text-center">
        Demo credentials:
        <br />
        <span className="font-mono">
          admin@mbs.com / admin123 (admin)
        </span>
        <br />
        <span className="font-mono">
          any-email / user123 (regular user)
        </span>
      </p>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg font-semibold text-white text-sm ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
