import { Badge, Button, Icon } from "src/components";

export function Card({ item, isInFavorite }) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl aspect-square">
        <img
          className="object-cover w-full h-full"
          src={item.image}
          alt={item.name}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          data-intent="toggle-fav"
          data-id={item.id}
        >
          <Icon name={isInFavorite ? "star-solid" : "star-outline"} />
        </Button>
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
