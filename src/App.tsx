import { useEffect } from "react";
import SearchForm from "./ui/SearchForm";
import Copyright from "./ui/Footer";
import MyTable from "./ui/FullTable";
import Links from "./ui/Links";
import useTable from "./hooks/table.hook";
import useEge from "./hooks/ege.hook";
import usePerson from "./hooks/person.hook";
import useSearch from "./hooks/search.hook";
import AppContext from "./context/AppContext";
import { fromWLS } from "./ts/constants";
import { loadParams } from "./ts/diploma";
import { searchOlymps } from "./ts/search";

function App() {
  const { ready, updateTable, ...argsTable } = useTable();
  const { EGE, updateEGE } = useEge();
  const checkTable = useSearch(updateTable, fromWLS);

  /** Auto-run search from window.location.search */
  useEffect(() => {
    if (fromWLS) {
      console.log("Run search from WLS...");
      const { ege, pid, Dname } = loadParams();
      updateEGE(ege);
      Promise.all(searchOlymps(pid)).then(vals => checkTable(vals, Dname));
    }
  }, [checkTable]);


  return (
    <AppContext.Provider value={{ ready, updateTable, ...argsTable, EGE, updateEGE, ...usePerson() }}>
      <div className="content">
        <Links />
        <div className="main">
          {!fromWLS && <SearchForm />}
          <div id="results">
            {ready && <MyTable />}
          </div>
        </div>
      </div>
      <Copyright />
    </AppContext.Provider>
  );
}

export default App;
