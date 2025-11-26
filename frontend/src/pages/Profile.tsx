import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [bookings, setBookings] = useState<any[]>([]);

  // Fetch token
  const token = localStorage.getItem("token");

  // Load user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await res.json();

        setFormData({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          password: "",
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/user/me/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    fetchBookings();
  }, []);

  // Save changes
  const handleSave = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Updated:", data);
      setEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Profile</h1>

      {/* User Info Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Account Details</h2>

        {/* Name */}
        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          disabled={!editing}
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />

        {/* Email */}
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          disabled={!editing}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Phone */}
        <label style={styles.label}>Phone</label>
        <input
          style={styles.input}
          disabled={!editing}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Address */}
        <label style={styles.label}>Address</label>
        <input
          style={styles.input}
          disabled={!editing}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        {/* Password */}
        <label style={styles.label}>New Password</label>
        <input
          style={styles.input}
          disabled={!editing}
          type="password"
          placeholder="Leave blank to keep old password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        {/* Buttons */}
        {!editing ? (
          <button style={styles.editBtn} onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div style={styles.buttonRow}>
            <button style={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
            <button style={styles.cancelBtn} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Booking History */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Booking History</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} style={styles.bookingItem}>
              <p><strong>Booking ID:</strong> {b.id}</p>
              <p><strong>Movie:</strong> {b.movie_title}</p>
              <p><strong>Theater:</strong> {b.theater_name}</p>
              <p><strong>Seats:</strong> {b.num_seats}</p>
              <p><strong>Total:</strong> ${b.total_price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// -------------------------
// Inline CSS Styles
// -------------------------
const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "90%",
    maxWidth: "900px",
    margin: "0 auto",
    paddingTop: "30px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "12px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  editBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  saveBtn: {
    padding: "10px 20px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    background: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  bookingItem: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};
