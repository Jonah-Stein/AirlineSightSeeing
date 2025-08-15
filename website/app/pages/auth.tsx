import { useState } from "react";
import { useLogin } from "../hooks/auth";
import { useNavigate } from "react-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    await useLogin({ email, password });
    navigate("/profile");
  };
  return (
    <div>
      <h1>Auth</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
        <input
          type="email"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
