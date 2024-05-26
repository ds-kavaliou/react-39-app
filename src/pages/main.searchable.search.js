import { useSelector } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";

import { cn } from "src/lib";

import { Card, Grid } from "src/features/characters/components";
import { useSearchCharactersQuery } from "src/features/characters/api";

import { Favoritable } from "src/features/favorites/components";

import { History } from "src/features/history/components"

import { selectCurrentUser } from "src/features/auth/slice";

export function SearchPage() {
  const params = useRouteLoaderData("searchable");
  const user = useSelector(selectCurrentUser);
  const {
    data: characters = [],
    error,
    isFetching,
    isLoading,
  } = useSearchCharactersQuery(params);

  return (
    <section>
      <div className="container">
        {error && <div>Sorry... We found nothing. :(</div>}
        {isLoading && <div>Loading...</div>}

        <Grid
          key="grid"
          className={cn({ "opacity-25": isFetching, hidden: error })}
        >
          {characters.map((item) =>
            user ? (
              <Favoritable key={item.id} id={item.id}>
                <Card item={item}>
                  <Card.Actions>
                    <Link to={`/characters/${item.id}`}>
                      <History id={item.id} textContent={'Read More'}>
                      </History>
                    </Link>
                  </Card.Actions>
                </Card>
              </Favoritable>
            ) : (
              <Card key={item.id} item={item} />
            )
          )}
        </Grid>
      </div>
    </section>
  );
}
