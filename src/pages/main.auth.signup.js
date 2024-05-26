import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { SignUpForm } from "src/features/auth/components";
import { setCurrentUser } from "src/features/auth/slice";
import { repository } from "src/features/auth/repository";

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const handleAccountCreation = useCallback(
    async (data) => {
      try {
        const user = await repository.signup(data);
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
        <h2 className="text-2xl font-semibold mr-2">Sign Up</h2>
        <span className="text-sm">Already have an account?</span>
        <Link to="/signin" className="font-medium">
          Sign In.
        </Link>
      </div>
      <SignUpForm submit={handleAccountCreation} serverError={serverError} />
    </div>
  );
}
