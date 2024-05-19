import { Outlet, Link } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <header className="shadow">
        <div className="container h-16 flex items-center justify-between">
          <h1 className="uppercase font-medium tracking-wide">
            <Link to="/">React-39</Link>
          </h1>
          <div className="flex gap-2 items-center">
            <Link to="/">Index</Link>
            <Link to="search">Search</Link>
            <Link to="history">History</Link>
            <Link to="favorites">Favorites</Link>
            <Link to="signin">Sign In</Link>
            <Link to="signup">Sign Up</Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
