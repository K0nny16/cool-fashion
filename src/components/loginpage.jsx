import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set, get, update } from "firebase/database";
import "../css/loginpage.css";
import { dbRealTime } from "../firebase";
import { useNavigate } from "react-router-dom";

export function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();

  async function loginUser() {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      const roleRef = ref(dbRealTime, `users/${user.uid}`);
      const snapshot = await get(roleRef);

      if (snapshot.exists()) {
        const role = snapshot.val().role;

        setUser({ email: user.email, role });

        alert(`Logged in as: ${user.email} with role: ${role}`);
        navigate("/");
      } else {
        alert("Role not found!");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  }

  async function registerUser() {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      const userData = {
        email: user.email,
        role: "user",
        wishlist: [],
      };

      console.log("Setting data for user:", userData);

      await set(ref(dbRealTime, `users/${user.uid}`), userData);

      console.log("Data saved to Firebase for user:", user.uid);

      alert("User created: " + user.email + " with role: user");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  }

  async function registerAdmin() {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      const adminData = {
        email: user.email,
        role: "admin",
        wishlist: [],
      };

      console.log("Setting data for admin:", adminData);

      await set(ref(dbRealTime, `users/${user.uid}`), adminData);

      console.log("Data saved to Firebase for admin:", user.uid);

      alert("Admin user created: " + user.email + " with role: admin");
    } catch (error) {
      alert("Admin registration failed: " + error.message);
    }
  }

  async function updateWishlist(userId, newItem) {
    const wishlistRef = ref(dbRealTime, `users/${userId}/wishlist`);

    const currentWishlistSnapshot = await get(wishlistRef);
    if (currentWishlistSnapshot.exists()) {
      const currentWishlist = currentWishlistSnapshot.val();

      const updatedWishlist = [...currentWishlist, newItem];

      await set(wishlistRef, updatedWishlist);

      console.log("Wishlist updated:", updatedWishlist);
      alert("Wishlist updated with item: " + newItem);
    } else {
      alert("Wishlist does not exist for this user.");
    }
  }

  return (
    <div className="container">
      <div className="Login">
        <h2>Login</h2>
        <input
          className="LoginUsername"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="LoginPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginUser} className="loginbutton">
          Login
        </button>
      </div>
      <div className="Register">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerUser} className="registerbutton">
          Register as User
        </button>
        <button onClick={registerAdmin} className="registerbutton">
          Register as Admin
        </button>
      </div>
    </div>
  );
}
