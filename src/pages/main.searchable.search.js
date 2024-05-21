import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { cn } from "src/lib";

import { useSearchCharactersQuery } from "src/features/characters/api";
import { selectFavoriteIds, remove, add } from "src/features/favorites/slice";
import { Card, Grid } from "src/features/characters/components";

export function SearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const dispatch = useDispatch();
  const favIds = useSelector(selectFavoriteIds);

  const {
    data: characters = [],
    error,
    isFetching,
    isLoading,
  } = useSearchCharactersQuery(Object.fromEntries(params));

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
        <div className={cn("hidden", error && "block")}>
          Sorry... We found nothing. Please change your filters
        </div>
        <div className={cn("hidden", isLoading && "block")}>Loading...</div>

        <Grid
          className={cn(error && "hidden", isFetching && "opacity-25")}
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
