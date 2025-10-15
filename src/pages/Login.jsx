import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("DriftKing@example.com");
  const [password, setPassword] = useState("Tokyo");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // const email = user.email;
  // const password = user.password;

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
