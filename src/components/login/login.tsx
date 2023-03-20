import { SyntheticEvent, useEffect, useMemo } from "react";
import { UserStructure } from "../../models/user";
import { useUser } from "../../hooks/use.users";
import { UserRepo } from "../../services/users.api.repo";
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
    console.log(userLog);
    formData.reset();
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="email">
          <input type="email" placeholder="Email" required id="email" />
        </label>
        <label htmlFor="passwd">
          <input type="password" placeholder="Password" required id="passwd" />
        </label>

        <button type="submit">enviar</button>
      </form>
    </>
  );
}
