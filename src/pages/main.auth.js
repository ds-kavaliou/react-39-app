import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <section>
      <div className="mx-auto max-w-lg py-8">
        <Outlet />
      </div>
    </section>
  );
}
