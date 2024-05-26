import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectHistoryIds} from "src/features/history/slice";
import { History } from "src/features/history/components";

import { Favoritable } from "src/features/favorites/components";

import { useGetManyByIdQuery } from "src/features/characters/api";
import { Grid, Card } from "src/features/characters/components";

export function HistoryPage() {
  const history = useSelector(selectHistoryIds);
  const {
    data: characters = [],
    isLoading,
    error,
  } = useGetManyByIdQuery(history);

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
                    <History id={item.id} textContent={'Read More'}>
                    </History>
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



