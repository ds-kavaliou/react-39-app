import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button, Icon } from "src/components";

import { removeHistoryElement } from "../slice";

function HistoryItem({id, children}) {
    const dispatch = useDispatch();

    const handler = useCallback(() => {
        dispatch(removeHistoryElement(id));
    }, [dispatch, id]);

    return (
        <div className="grid grid-color-[24px,72px,1fr,24px] item-center gap-x-4">
            {children}
            <Button variant="ghost" size="icon" onClick={handler} className="ml-auto">
                <Icon name="x-mark"/>
            </Button>
        </div>
    );
}

export const HistoryEntry = memo(HistoryItem, (p, n) => p.id === n.id);