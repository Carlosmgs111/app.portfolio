import { useLogin } from "../../hooks/useLogin";
import { beutifyLabel } from "../../utils";
import { Modal } from "../Modal";
import { Form, Title, Button, Input, EmbedButton } from "./styles";

function Login({ setAuth, embedButton, onBodyClick }) {
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
  } = useLogin(setAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    !token && (
      <Modal >
        <Form>
          <Title href="#" type="button" onClick={switchLabel}>
            {beutifyLabel(label)}
            {embedButton && <EmbedButton>{embedButton}</EmbedButton>}
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
      </Modal>
    )
  );
}
export { Login };
