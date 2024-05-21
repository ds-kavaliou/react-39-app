import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cn } from "src/lib";

import { selectFavoriteIds, remove, add } from "src/features/favorites/slice";
import { useGetManyByIdQuery } from "src/features/characters/api";
import { Grid, Card } from "src/features/characters/components";

export function FavoritesPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const favIds = useSelector(selectFavoriteIds);

  const { data: characters = [], isLoading } = useGetManyByIdQuery(favIds);

  const isInFavorites = useCallback((id) => favIds.includes(id), [favIds]);

  const toggleFavoriteCharacter = useCallback(
    (id) => (isInFavorites(id) ? dispatch(remove(id)) : dispatch(add(id))),
    [dispatch, isInFavorites]
  );

  const navigateToCharacterPage = useCallback(
    (id) => navigate(`/characters/${id}`),
    [navigate]
  );

  return (
    <section>
      <div className="container">
        <div className={cn("hidden", isLoading && "block")}>Loading...</div>

        <Grid
          className={cn(isLoading && "hidden")}
          handler1={toggleFavoriteCharacter}
          handler2={navigateToCharacterPage}
        >
          {characters.map((item) => (
            <Card
              key={item.id}
              item={item}
              isInFavorite={isInFavorites(item.id)}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}
