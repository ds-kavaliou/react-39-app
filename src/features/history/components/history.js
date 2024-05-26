import { useDispatch } from "react-redux";
import { Button } from "src/components";
import { addHistoryElement } from "../slice";

function HistoryDecoration({id, textContent}) {
    const dispatch = useDispatch();

    return (
        <Button
        variant="secondary"
        size="icon"
        onClick={() => dispatch(addHistoryElement(id))}
        className="w-full uppercase"
      >{textContent}
      </Button>
    )
}

export const History = HistoryDecoration;
