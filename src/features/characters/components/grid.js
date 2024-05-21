import { useCallback } from "react";
import { cn } from "src/lib";

export function Grid({ children, className, handler1, handler2, ...rest }) {
  const handler = useCallback(
    (e) => {
      const intent = e.target.dataset?.intent;
      const id = Number(e.target.dataset?.id);

      switch (intent) {
        case "toggle-fav":
          return handler1(id);
        case "navigate":
          return handler2(id);
        default:
          return;
      }
    },
    [handler1, handler2]
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
      onClick={handler}
      {...rest}
    >
      {children}
    </div>
  );
}
