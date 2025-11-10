import React from "react";

function Signup() {
  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <form style={styles.form}>
        <input type="text" placeholder="Username" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "80px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "0 auto" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" },
};

export default Signup;
