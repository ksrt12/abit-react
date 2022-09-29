import { useState, useCallback } from "react";

export interface IEGE {
    [index: string]: number;
}

const useEge = () => {
    const [EGE, setEGE] = useState<IEGE>({});
    const updateEGE = useCallback((newState: IEGE) => setEGE({ ...EGE, ...newState }), [EGE]);
    return { EGE, updateEGE };
};

export default useEge;