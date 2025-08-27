import styles from "../../styles/LoginModal.module.css";

const usPhoneRegex = /^(\+1\s?)?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;

const ClientReg = ({
  handleChange,
  setRegType,
  validateClient,
  formData,
  errors,
  handleFinalSubmit,
  setFormData,
  error,
  loading,
}) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  return (
    <>
      <h2>Log in / sign up as client</h2>
      <div className={styles.inputGroup}>
        {/* <label>Country code</label>
        <select defaultValue="+1">
          <option value="+1">United States (+1)</option>
          <option value="+91">India (+91)</option>
        </select> */}
        <input
          type="tel"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handlePhoneChange}
          onBlur={(e) => {
            if (e.target.value && !usPhoneRegex.test(e.target.value)) {
              alert("Please enter a valid US phone number");
            }
          }}
        />
        {errors.phone && <p className={"required"}>{errors.phone}</p>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange("email")}
        />
        {errors.email && <p className={"required"}>{errors.email}</p>}

        <input
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange("name")}
        />
        {errors.name && <p className={"required"}>{errors.name}</p>}

        <input
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange("password")}
        />
        {errors.password && <p className={"required"}>{errors.password}</p>}
      </div>
      <div className="container">
        <p>Already have an account?</p>
        <button className="regBtn" onClick={() => setRegType("login")}>
          Log In
        </button>
      </div>
      {error && <p className="required">{error}</p>}
      <button
        className={styles.continueBtn}
        onClick={() => {
          if (validateClient()) handleFinalSubmit();
        }}>
        {loading ? "processing..." : "Submit"}
      </button>
    </>
  );
};

export default ClientReg;
