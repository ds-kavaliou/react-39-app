import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSearchCharactersQuery } from "src/features/characters/api";
import { Card, Grid } from "src/features/characters/components";

export function SearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const favIds = [1, 3, 7]; // select from favorites feature store

  const { data: characters = [] } = useSearchCharactersQuery(
    Object.fromEntries(params)
  );

  const handler = useCallback(
    (e) => {
      const intent = e.target.dataset?.intent;
      const id = e.target.dataset?.id;

      switch (intent) {
        case "toggle-fav":
          return console.log("dispatch favorite action with ID", id);
        case "navigate":
          return navigate(`/characters/${id}`);
        default:
          return;
      }
    },
    [navigate]
  );

  const isInFavorites = (id) => favIds.includes(id);

  return (
    <section>
      <div className="container">
        <Grid onClick={handler}>
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
