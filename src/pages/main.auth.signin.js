import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { SignInForm } from "src/features/auth/components";
import { setCurrentUser } from "src/features/auth/slice";
import { repository } from "src/features/auth/repository";

export function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const handleAccountSignIn = useCallback(
    async (data) => {
      try {
        const user = await repository.signin(data);
        dispatch(setCurrentUser(user));
        navigate("/");
      } catch (error) {
        setServerError(error.message);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <div className="flex items-baseline gap-x-2">
        <h2 className="text-2xl font-semibold mr-2">Sign In</h2>
        <span className="text-sm">Do not have an account?</span>
        <Link to="/signup" className="font-medium">
          Sign Up.
        </Link>
      </div>
      <SignInForm submit={handleAccountSignIn} serverError={serverError} />
    </div>
  );
}
