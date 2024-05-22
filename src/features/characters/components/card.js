import { memo } from "react";
import { Badge, Button, Icon } from "src/components";

function CharactreCard({ item, isInFavorite, canInteract }) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl aspect-square">
        <img
          className="object-cover w-full h-full"
          src={item.image}
          alt={item.name}
        />
        {canInteract && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30"
            data-intent="toggle-fav"
            data-id={item.id}
          >
            <Icon name={isInFavorite ? "heart-solid" : "heart-outline"} />
          </Button>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-primary truncate">
            {item.name}
          </p>
          <Badge title={item.species}>{item.species}</Badge>
        </div>
        <div className="flex flex-col">
          <Button
            variant="secondary"
            className="uppercase"
            data-intent="navigate"
            data-id={item.id}
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Card = memo(CharactreCard);
