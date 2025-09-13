// ClientReg.jsx
import React, { useState, useMemo } from "react";
import axios from "axios";
import styles from "../../styles/LoginModal.module.css";

const usPhoneRegex = /^(\+1\s?)?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;

const ClientReg = ({
  handleChange,
  setRegType,
  validateClient,
  formData,
  errors,
  setErrors,
  error,
  loading,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const hc = handleChange || (() => () => {});
  const doValidate = validateClient || (() => true);

  const phoneInvalid = useMemo(() => {
    const v = formData?.phone || "";
    return v && !usPhoneRegex.test(v);
  }, [formData?.phone]);

  const validatePhoneInline = (value) => {
    if (typeof setErrors !== "function") return;
    if (value && !usPhoneRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid US phone number",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const digitsOnly = (s = "") => (s.match(/\d+/g) || []).join("");
  const normalizeZip = (s = "") => {
    const d = (s.match(/\d+/g) || []).join("");
    if (d.length === 9) return `${d.slice(0, 5)}-${d.slice(5)}`;
    if (d.length === 5) return d;
    return s.trim();
  };

  const submit = async () => {
    setSubmitError("");
    if (phoneInvalid) return;
    if (!doValidate()) return;

    try {
      setSubmitting(true);

      const payload = {
        name: (formData?.name || "").trim(),
        email: (formData?.email || "").trim(),
        phone: digitsOnly(formData?.phone || ""),
        password: formData?.password || "",
        address: formData?.address || "",
        city: (formData?.city || "").trim(),
        zip: normalizeZip(formData?.zip || ""),
        selected_model: formData?.selected_model || "",
        // server maps this to DB column squre_customer_id
        square_customer_id: (formData?.square_customer_id || "pending").trim(),
      };

      const resp = await axios.post(
        "https://tsm.spagram.com/api/register-customer.php",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (resp?.data?.success === "1") {
        setRegType?.("login");
      } else {
        setSubmitError(resp?.data?.message || "Registration failed.");
      }
    } catch (e) {
      setSubmitError(
        e?.response?.data?.message || e?.message || "Network error."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2>Log in / sign up as client</h2>

      <div
        className={styles.inputGroup}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      >
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Phone number"
          value={formData?.phone ?? ""}
          onChange={hc("phone")}
          onBlur={(e) => validatePhoneInline(e.target.value)}
          aria-invalid={Boolean(errors?.phone || phoneInvalid)}
        />
        {(errors?.phone || phoneInvalid) && (
          <p className={"required"}>
            {errors?.phone || "Please enter a valid US phone number"}
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={formData?.email ?? ""}
          onChange={hc("email")}
          aria-invalid={Boolean(errors?.email)}
        />
        {!!errors?.email && <p className={"required"}>{errors.email}</p>}

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          value={formData?.name ?? ""}
          onChange={hc("name")}
          aria-invalid={Boolean(errors?.name)}
        />
        {!!errors?.name && <p className={"required"}>{errors.name}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={formData?.password ?? ""}
          onChange={hc("password")}
          aria-invalid={Boolean(errors?.password)}
        />
        {!!errors?.password && <p className={"required"}>{errors.password}</p>}

        {/* Optional address fields */}
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          autoComplete="address-line1"
          placeholder="Street address"
          value={formData?.address ?? ""}
          onChange={hc("address")}
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          autoComplete="address-level2"
          placeholder="City"
          value={formData?.city ?? ""}
          onChange={hc("city")}
        />

        <label htmlFor="zip">ZIP</label>
        <input
          id="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="ZIP"
          value={formData?.zip ?? ""}
          onChange={hc("zip")}
        />
      </div>

      <div className={styles.switchText}>
        Already have an account?{" "}
        <span
          className={styles.linkText}
          onClick={() => setRegType("login")}
          role="button"
          tabIndex={0}
        >
          Log In
        </span>
      </div>

      {(error || submitError) && (
        <p className="required">{submitError || error}</p>
      )}

      <button
        className={styles.continueBtn}
        disabled={loading || submitting || phoneInvalid}
        onClick={submit}
      >
        {loading || submitting ? "processing..." : "Submit"}
      </button>
    </>
  );
};

export default ClientReg;
