import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Icon } from "src/components";

import { remove, add, selectIsInFavorites } from "../slice";

function FavoritableDecorator({ id, children }) {
  const dispatch = useDispatch();
  const is = useSelector(selectIsInFavorites(id));

  const toggleFavoriteCharacter = useCallback(() => {
    if (is) {
      dispatch(remove(id));
    } else {
      dispatch(add(id));
    }
  }, [dispatch, id, is]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFavoriteCharacter}
        className="absolute z-10 top-5 right-5 rounded-full text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30"
      >
        <Icon name={is ? "heart-solid" : "heart-outline"} />
      </Button>
      {children}
    </div>
  );
}

export const Favoritable = memo(FavoritableDecorator, (p, n) => p.id === n.id);
