import styles from "../../styles/LoginModal.module.css";

const ClientRegStep2 = ({
  handleChange,
  validateStep2,
  formData,
  errors,
  setStep,
}) => {
  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange("name")}
      />
      {errors.name && <p className={"required"}>{errors.name}</p>}
      <>
        <label>Birth Date</label>
        <input
          type="date"
          placeholder="Birthdate"
          value={formData.birthdate}
          onChange={handleChange("birthdate")}
        />
      </>
      {errors.birthdate && (
        <p className={"required-date"}>{errors.birthdate}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange("email")}
      />
      {errors.email && <p className={"required"}>{errors.email}</p>}
      <button
        className={styles.continueBtn}
        onClick={() => {
          if (validateStep2()) {
            setStep(3);
          }
        }}>
        Continue
      </button>
    </div>
  );
};

export default ClientRegStep2;
