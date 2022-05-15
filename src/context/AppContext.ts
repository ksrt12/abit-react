import { createContext } from 'react';
import { IEGE } from "../hooks/ege.hook";
import { IPerson } from "../hooks/person.hook";
import { IOlymp } from "../ts/search";

const AppContext = createContext({
    ready: false,
    setReady: (newState: boolean): void => { },
    caption: "",
    setCaption: (newState: string): void => { },
    trs: [] as IOlymp[],
    setTrs: (newState: IOlymp[]): void => { },
    updateTable: (abit_caption: string, abit_trs: IOlymp[]) => { },
    EGE: {} as IEGE,
    updateEGE: (newState: IEGE): void => { },
    person: {} as IPerson,
    updatePerson: (newState: IPerson): void => { },
});
export default AppContext;
