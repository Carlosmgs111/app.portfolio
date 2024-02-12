import { useLogin } from "../../hooks/useLogin";
import { beutifyLabel } from "../../utils";
import styles from "./styles.module.css";

function Login({ onLogged }) {
  const {
    email,
    username,
    password,
    label,
    switchLabel,
    onClick,
    onInputChange,
    loading,
    error,
    token,
  } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick(e);
  };
  token && onLogged && onLogged();
  return (
    !token && (
      <form className={styles.form}>
        <i className={styles.title} type="button" onClick={switchLabel}>
          {beutifyLabel(label)}
        </i>
        <input
          className={`${styles.input} ${loading ? styles.disabled : ""}`}
          name="username"
          placeholder={`username ${!label === "signin" ? "o email" : ""}`}
          value={username}
          onSubmit={handleSubmit}
          onChange={onInputChange}
        />
        {label === "signup" && (
          <input
            className={`${styles.input} ${loading ? styles.disabled : ""}`}
            name="email"
            placeholder="Email (Optional)"
            value={email}
            onSubmit={handleSubmit}
            onChange={onInputChange}
          />
        )}
        <input
          className={`${styles.input} ${loading ? styles.disabled : ""}`}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onSubmit={handleSubmit}
          onChange={onInputChange}
        />
        <button
          className={`${styles.button} ${loading ? styles.disabled : ""}`}
          type="submit"
          onClick={onClick}
          onSubmit={handleSubmit}
        >
          {beutifyLabel(label)}
        </button>
      </form>
    )
  );
}
export { Login };
