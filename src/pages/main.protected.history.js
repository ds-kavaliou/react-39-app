import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { HistoryEntry } from "src/features/history/components";
import { format } from "src/features/history/config";

import { selectUserHistory } from "src/features/history/slice";

export function HistoryPage() {
  const entries = useSelector(selectUserHistory); 

  return (
    <section>
      <div className="container">
        {entries.map(({ id, timestamp, payload}, i) => (
          <div key={id}>
            <HistoryEntry id={id}>
              <div>{i + 1}</div>
              <div>{format (new Date (timestamp))}</div>
              <Link to={`/characters/${payload.id}`}>
                <div>{payload.name}</div>
              </Link>
            </HistoryEntry>
          </div>
        ))}
      </div>
  </section>
  );
}

 



