import { useState, useCallback } from "react";

export type IEGE = Record<string, number>;

export const useEge = () => {
  const [EGE, setEGE] = useState<IEGE>({});
  const updateEGE = useCallback((newState: IEGE) => setEGE({ ...EGE, ...newState }), [EGE]);
  return { EGE, updateEGE };
};
