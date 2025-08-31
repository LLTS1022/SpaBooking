// pages/model-registration.js
import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import axios from "axios";
import Router from "next/router";
import { CURRENT_URL } from "../components/config";

const API_CREATE = "https://tsm.spagram.com/api/create-model.php";
const API_LOGIN = "https://tsm.spagram.com/api/login-model.php";

export default function ModelRegistration() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    ethnicity: "",
    age: "", // added
    height: "",
    color: "",
    about: "",
    service_area: "",
    image: "", // base64 data URL
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [serviceRows, setServiceRows] = useState([{ service: "", price: "" }]);

  const onChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onLoginChange = (e) =>
    setLoginData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Light client-side compression to keep payloads small (<~1–2MB)
  const fileToDataURL = (file, maxW = 1200, quality = 0.75) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const fr = new FileReader();
      fr.onload = () => {
        img.src = fr.result;
      };
      fr.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width || 1);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const cvs = document.createElement("canvas");
        cvs.width = w;
        cvs.height = h;
        cvs.getContext("2d").drawImage(img, 0, 0, w, h);
        // export as JPEG to shrink further
        resolve(cvs.toDataURL("image/jpeg", quality));
      };
      fr.readAsDataURL(file);
    });

  const onImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return setError("Please choose an image file.");
    try {
      setError("");
      const dataUrl = await fileToDataURL(file, 1200, 0.75);
      setFormData((p) => ({ ...p, image: dataUrl }));
    } catch {
      setError("Could not read image.");
    }
  };

  const addRow = () =>
    setServiceRows((r) => [...r, { service: "", price: "" }]);
  const updateRow = (i, field, val) =>
    setServiceRows((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r))
    );
  const removeRow = (i) =>
    setServiceRows((rows) => rows.filter((_, idx) => idx !== i));

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!formData.image) return setError("Please upload a profile image.");

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        phone: formData.phone.replace(/\D+/g, ""),
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        height: formData.height,
        color: formData.color,
        about: formData.about,
        service_area: formData.service_area,
        image: formData.image,
        // send only filled services
        servicePrices:
          JSON.stringify(
            serviceRows
              .map((r) => ({
                service: r.service.trim(),
                price: r.price.trim(),
              }))
              .filter((r) => r.service && r.price)
          ) || "[]",
      };

      const res = await axios.post(API_CREATE, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const ok =
        typeof res.data === "string"
          ? res.data.includes("Therapist created") ||
            res.data.includes("Data inserted successfully")
          : res.data?.success === "1";

      if (!ok) throw new Error(res.data?.message || "Registration failed");

      setMessage("Registration successful.");
      Router.push(`${CURRENT_URL}model-backend/profile?source=registration`);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!loginData.email || !loginData.password)
      return setError("Please enter both email and password.");
    try {
      const res = await axios.post(API_LOGIN, loginData);
      if (res.data?.success === "1") {
        localStorage.setItem("token", res.data.token);
        Router.push(`${CURRENT_URL}model-backend/orders`);
      } else setError("Email/Password do not match. Please try again!");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Therapist Register / Login</title>
      </Head>

      <div
        className="registration-page"
        style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Login */}
        <div
          className="login-cnt"
          style={{ background: "#fff", padding: 16, borderRadius: 12 }}
        >
          <h2>Login as a Therapist</h2>
          <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
            <label>
              <div>Email:</div>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={onLoginChange}
                required
              />
            </label>
            <label>
              <div>Password:</div>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={onLoginChange}
                required
              />
            </label>
            <button className="button" type="submit">
              Submit
            </button>
            {message && <p className="message">{message}</p>}
          </form>
          {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
        </div>

        {/* Registration */}
        <div
          className="registration-container"
          style={{ background: "#fff", padding: 16, borderRadius: 12 }}
        >
          <h2>Fill the form to register as a Therapist</h2>
          <form
            onSubmit={handleRegistration}
            style={{ display: "grid", gap: 12 }}
          >
            <label>
              <div>Name:</div>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </label>
            <label>
              <div>Phone:</div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                required
              />
            </label>
            <label>
              <div>Email:</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </label>
            <label>
              <div>Password:</div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                required
              />
            </label>
            <label>
              <div>Gender:</div>
              <select
                name="gender"
                value={formData.gender}
                onChange={onChange}
                required
              >
                <option value="">Select…</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </label>

            {/* Optional but recommended to send */}
            <label>
              <div>Ethnicity (optional):</div>
              <input
                name="ethnicity"
                value={formData.ethnicity}
                onChange={onChange}
              />
            </label>
            <label>
              <div>Age (optional):</div>
              <input
                name="age"
                inputMode="numeric"
                value={formData.age}
                onChange={onChange}
              />
            </label>

            <label>
              <div>Height:</div>
              <input
                name="height"
                value={formData.height}
                onChange={onChange}
                placeholder={`e.g., 5'6" or 168cm`}
              />
            </label>

            <label>
              <div>Color:</div>
              <input
                name="color"
                value={formData.color}
                onChange={onChange}
                placeholder="Hair/eye/skin tone"
              />
            </label>

            <label>
              <div>About:</div>
              <textarea
                name="about"
                rows={3}
                value={formData.about}
                onChange={onChange}
              />
            </label>

            <label>
              <div>Service Area:</div>
              <input
                name="service_area"
                value={formData.service_area}
                onChange={onChange}
                placeholder="e.g., Manhattan"
              />
            </label>

            <fieldset style={{ border: 0, padding: 0 }}>
              <legend>Services & Prices</legend>
              {serviceRows.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px auto",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <input
                    placeholder="Service (e.g., Swedish 60m)"
                    value={r.service}
                    onChange={(e) => updateRow(i, "service", e.target.value)}
                  />
                  <input
                    placeholder="Price"
                    value={r.price}
                    onChange={(e) => updateRow(i, "price", e.target.value)}
                  />
                  <button type="button" onClick={() => removeRow(i)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addRow}>
                Add service
              </button>
            </fieldset>

            <label>
              <div>Profile Image:</div>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                required
              />
            </label>

            <div
              className="submitbox"
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <button className="button" type="submit" disabled={loading}>
                {loading ? "Submitting…" : "Submit"}
              </button>
              {loading ? (
                <img width="30" src="/images/loading.gif" alt="loading" />
              ) : null}
            </div>

            {message && <p className="message">{message}</p>}
            {error && (
              <p className="error" style={{ color: "#b91c1c" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
