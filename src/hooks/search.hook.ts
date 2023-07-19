import { useCallback } from "react";
import { IOlymp } from "../ts/search";

const useSearch = (updateTable: (abit_caption: string, abit_trs: IOlymp[]) => void, fromWLS: boolean) => {
  const checkTable = useCallback((values: IOlymp[][], Dname: string) => {
    const trs = values.flat();
    if (trs.length) {
      if (window.screen.width < 930 || fromWLS) {
        document.querySelector<HTMLDivElement>(".main")!.style.width = "fit-content";
      }
      document.title = Dname;
      updateTable(Dname, trs);
    } else {
      if (Dname) {
        alert(`Олимпиад РСОШ абитуриента\n${Dname} не найдено!`);
        if (fromWLS) {
          window.close();
        }
      }
    }
  }, [updateTable, fromWLS]);
  return checkTable;
};

export default useSearch;
