import { memo } from "react";

import { Badge } from "src/components";
import { cn } from "src/lib";

function CharactreCard({ item, children }) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl aspect-square">
        <img
          className="object-cover w-full h-full"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-primary truncate">
            {item.name}
          </p>
          <Badge title={item.species}>{item.species}</Badge>
        </div>
        {children}
      </div>
    </div>
  );
}

const Actions = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};

export const Card = memo(CharactreCard, (p, n) => p.id === n.id);

Card.Actions = memo(Actions);
