/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { IEGE } from "../hooks/ege.hook";
import { IPerson } from "../hooks/person.hook";
import { IOlymp } from "../ts/search";

type IAppContext = {
  ready: boolean,
  setReady: (newState: boolean) => void,
  caption: string,
  setCaption: (newState: string) => void,
  trs: IOlymp[],
  setTrs: (newState: IOlymp[]) => void,
  updateTable: (abit_caption: string, abit_trs: IOlymp[]) => void,
  EGE: IEGE,
  updateEGE: (newState: IEGE) => void,
  person: IPerson,
  updatePerson: (newState: IPerson) => void,
};

const AppContext = createContext<IAppContext>({
  ready: false,
  setReady: () => { },
  caption: "",
  setCaption: () => { },
  trs: [] as IOlymp[],
  setTrs: () => { },
  updateTable: () => { },
  EGE: {} as IEGE,
  updateEGE: () => { },
  person: {} as IPerson,
  updatePerson: () => { },
});
export default AppContext;
