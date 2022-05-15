import { useState, useCallback } from "react";
import { IOlymp } from "../ts/search";

const useTable = () => {

    const [ready, setReadyLocal] = useState(false);
    const [caption, setCaptionLocal] = useState("");
    const [trs, setTrsLocal] = useState([] as IOlymp[]);

    const updateTable = useCallback((abit_caption: string, abit_trs: IOlymp[]) => {
        setCaptionLocal(abit_caption);
        setTrsLocal(abit_trs);
        setReadyLocal(true);
    }, []);

    const setReady = useCallback((newState: boolean) => setReadyLocal(newState), []);
    const setCaption = useCallback((newState: string) => setCaptionLocal(newState), []);
    const setTrs = useCallback((newState: IOlymp[]) => setTrsLocal(newState), []);

    return { ready, setReady, caption, setCaption, trs, setTrs, updateTable };
};

export default useTable;