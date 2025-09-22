import styles from "../../styles/LoginModal.module.css";

const ClientLogin = ({
  handleLoginChange,
  loginData,
  errors,
  error,
  validateLogin,
  setRegType,
  loading,
  handleLogin,
}) => {
  return (
    <>
      <h2> Login up as Client</h2>
      <div className={styles.inputGroup}>
        <label>Email </label>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleLoginChange("email")}
        />
        {errors.email && <p className={"required"}>{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange("password")}
        />
        {errors.password && <p className={"required"}>{errors.password}</p>}
      </div>
      {error && <p className="required">{error}</p>}
      <div className={styles.switchText}>
  Don’t have an account?{" "}
  <span className={styles.linkText} onClick={() => setRegType("signup")}>
    Sign Up
  </span>
</div>
      <div className="flex">
        <button
          className={styles.continueBtn}
          onClick={(e) => {
            if (validateLogin()) {
              handleLogin(e);
            }
          }}>
          {loading ? "please wait..." : "Log In"}
        </button>
        {loading ? <img width="30px" src="images/loading.gif" /> : " "}
      </div>
    </>
  );
};

export default ClientLogin;