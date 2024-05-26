import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "src/components";

import { selectFavoriteIds } from "src/features/favorites/slice";
import { Favoritable } from "src/features/favorites/components";

import { useGetManyByIdQuery } from "src/features/characters/api";
import { Grid, Card } from "src/features/characters/components";

export function FavoritesPage() {
  const favorites = useSelector(selectFavoriteIds);
  const {
    data: characters = [],
    isLoading,
    error,
  } = useGetManyByIdQuery(favorites);

  return (
    <section>
      <div className="container">
        {error && <div>Something went wrong. :(</div>}
        {isLoading && <div>Loading...</div>}

        <Grid key="grid">
          {characters.map((item) => (
            <Favoritable key={item.id} id={item.id}>
              <Card item={item}>
                <Card.Actions>
                  <Link to={`/characters/${item.id}`}>
                    <Button variant="secondary" className="w-full uppercase">
                      Read More
                    </Button>
                  </Link>
                </Card.Actions>
              </Card>
            </Favoritable>
          ))}
        </Grid>
      </div>
    </section>
  );
}
