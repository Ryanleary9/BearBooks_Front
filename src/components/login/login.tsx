import { SyntheticEvent, useMemo } from "react";
import { UserStructure } from "../../models/user";
import { useUser } from "../../hooks/user/use.users";
import "./login.scss";
import { UserRepo } from "../../services/user/users.api.repo";
export default function Login() {
  const userRepo = useMemo(() => new UserRepo(), []);

  const { userLogin } = useUser(userRepo);

  const handelSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = ev.currentTarget as HTMLFormElement;
    const inputs = formData.querySelectorAll("input");

    const userLog: Partial<UserStructure> = {
      email: inputs[0].value,
      passwd: inputs[1].value,
    };
    userLogin(userLog);
    formData.reset();
  };

  return (
    <>
      <span>
        <div className="access-card">
          <h1>Login</h1>
          <form onSubmit={handelSubmit} className="form-inputs">
            <label htmlFor="email">
              <input type="email" placeholder="Email" required id="email" />
            </label>
            <label htmlFor="passwd">
              <input
                type="password"
                placeholder="Password"
                required
                id="passwd"
              />
            </label>
            <span>
              <button type="submit" className="login-button">
                Login
              </button>
            </span>
          </form>
        </div>
      </span>
    </>
  );
}
