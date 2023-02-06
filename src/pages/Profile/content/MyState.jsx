import { format } from "timeago.js";
export function MyState({ username, email, privilege, createdAt }) {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ffffff51",
        alignItems: "center",
      }}
    >
      <h1>Username: {username}</h1>
      <h1>Email: {email}</h1>
      <h1>Privilege: {privilege}</h1>
      <h1>Member {format(createdAt)}</h1>
    </div>
  );
}
