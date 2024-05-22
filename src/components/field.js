import { Children, cloneElement, useId } from "react";
import { cn } from "src/lib";

const data_attr = "data-id";

export function Field({ children, className, ...props }) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-y-1", className)} {...props}>
      {Children.map(children, (child) =>
        cloneElement(child, { [data_attr]: id })
      )}
    </div>
  );
}

Field.Label = Label;
Field.Control = Control;
Field.Message = Message;

function Label({ children, className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      htmlFor={[props[data_attr]]}
      {...props}
    >
      {children}
    </label>
  );
}

function Control({ children, ...props }) {
  return Children.map(children, (child) =>
    cloneElement(child, { id: props[data_attr] })
  );
}

function Message({ className, ...props }) {
  return (
    <p
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    />
  );
}
