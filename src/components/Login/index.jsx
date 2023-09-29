import { useLogin } from "../../hooks/useLogin";
import { beutifyLabel } from "../../utils";
import { Form, Title, Button, Input, EmbedButton } from "./styles";

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
    onClick();
  };
  token && onLogged && onLogged();
  return (
    !token && (
      <Form>
        <Title href="#" type="button" onClick={switchLabel}>
          {beutifyLabel(label)}
        </Title>
        <Input
          name="username"
          placeholder={`username ${!label === "signin" ? "o email" : ""}`}
          value={username}
          onSubmit={handleSubmit}
          onChange={onInputChange}
          disabled={loading}
        />
        {label === "signup" && (
          <Input
            name="email"
            placeholder="Email (Optional)"
            value={email}
            onSubmit={handleSubmit}
            onChange={onInputChange}
            disabled={loading}
          />
        )}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onSubmit={handleSubmit}
          onChange={onInputChange}
          disabled={loading}
        />
        <Button
          type="submit"
          onClick={onClick}
          onSubmit={handleSubmit}
          disabled={loading}
        >
          {beutifyLabel(label)}
        </Button>
      </Form>
    )
  );
}
export { Login };
