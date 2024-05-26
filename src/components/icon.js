import { cn } from "src/lib";

export function Icon({ className, name, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 pointer-events-none", className)}
      {...props}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
