import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export function MainLayout() {
  const [auth, setAuth] = useState({auth: false, name: ""});

  useEffect(() => {
    const checkLocal = JSON.parse(localStorage.getItem("authUser"));
    if(checkLocal.auth === true) setAuth({auth: checkLocal.auth, name: checkLocal.name});
    console.log(auth, checkLocal);
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <header className="shadow">
        <div className="container h-16 flex items-center justify-between">
          <h1 className="uppercase font-medium tracking-wide">
            <Link to="/">React-39</Link>
          </h1>
          {auth.auth ? (<p>Hello, {auth.name}</p>) : (null)}
          <div className="flex gap-2 items-center">
            <Link to="/">Index</Link>
            <Link to="search">Search</Link>
            {auth.auth ? (
              <>
              <Link to="history">History</Link>
              <Link to="favorites">Favorites</Link>
              <button onClick={() => {setAuth(false); localStorage.setItem("authUser", JSON.stringify({name: "", auth: false}))}}>exit</button>
              </>
            ) : (
            <>
              <Link to="signin">Sign In</Link>
              <Link to="signup">Sign Up</Link>
            </>)}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
