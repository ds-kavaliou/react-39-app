import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  Link,
  NavLink as DefaultNavLink,
  useNavigate,
} from "react-router-dom";

import { Button } from "src/components";
import { clearCurrentUser, selectCurrentUser } from "src/features/auth/slice";

const NavLink = withActiveStyles(DefaultNavLink);

export function MainLayout() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(clearCurrentUser());
    navigate("/signin");
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <header className="shadow">
        <div className="container h-16 flex items-center justify-between">
          <h1 className="uppercase font-medium tracking-wide">
            <Link to="/">React-39</Link>
          </h1>
          <div className="flex gap-3 items-center">
            <NavLink to="search" className="[&.active]:underline">
              Search
            </NavLink>
            {user ? (
              <>
                <NavLink to="history">History</NavLink>
                <NavLink to="favorites">Favorites</NavLink>
                <Button varian="link" onClick={handleLogOut}>
                  Log Out
                </Button>
              </>
            ) : (
              <NavLink to="signin">Sign In</NavLink>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function withActiveStyles(Component) {
  return (props) => <Component className="[&.active]:underline" {...props} />;
}
