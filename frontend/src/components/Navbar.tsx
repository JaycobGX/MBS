import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Read token + role from localStorage
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // "admin" or "user"

  const isLoggedIn = !!token;
  const isAdmin = role === "admin";
  const isUser = role === "CUSTOMER";

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload(); // optional — forces UI refresh
  };

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        padding: "15px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <NavLink
          to="/"
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#D50032",
          }}
        >
          MBS
        </NavLink>

        {/* NAV LINKS */}
        <nav
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "16px",
            fontWeight: 500,
            alignItems: "center",
          }}
        >
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>

          {/* USER LOGGED IN → show profile */}
          {isUser && (
            <NavLink to="/profile" className="nav-link">
              My Profile
            </NavLink>
          )}

          {/* ADMIN LOGGED IN → show admin dashboard */}
          {isAdmin && (
            <NavLink to="/admin" className="nav-link" style={{ color: "#D50032" }}>
              Admin Dashboard
            </NavLink>
          )}

          {/* IF NOT LOGGED IN → show login + register */}
          {!isLoggedIn && (
            <>
              <NavLink to="/login" className="nav-link">
                Sign In
              </NavLink>

              <NavLink to="/register" className="nav-link">
                Create Account
              </NavLink>
            </>
          )}

          {/* IF LOGGED IN → show logout */}
          {isLoggedIn && (
            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #D50032",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "15px",
                color: "#D50032",
              }}
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
