import { useState, useCallback } from "react";

export interface IPerson {
    [index: string]: string;
}
const usePerson = () => {
  const [person, setPerson] = useState({ LN: "", FN: "", MN: "", BD: "2003-01-01" } as IPerson);
  const updatePerson = useCallback((newState: IPerson) => setPerson({ ...person, ...newState }), [person]);
  return { person, updatePerson };
};

export default usePerson;
