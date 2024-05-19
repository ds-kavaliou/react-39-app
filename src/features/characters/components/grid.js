import { cn } from "src/lib";

export function Grid({ children, className, ...rest }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
