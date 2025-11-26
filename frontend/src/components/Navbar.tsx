import { NavLink } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false; // TODO replace with real auth
  const isAdmin = false;

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
        <nav style={{ display: "flex", gap: "25px", fontSize: "16px", fontWeight: 500 }}>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="nav-link">
                Sign In
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Create Account
              </NavLink>
            </>
          ) : (
            <NavLink to="/profile" className="nav-link">
              My Account
            </NavLink>
          )}

          {isAdmin && <NavLink to="/admin" className="nav-link">Admin</NavLink>}
        </nav>
      </div>
    </header>
  );
}
