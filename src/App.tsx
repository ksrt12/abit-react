import { useEffect } from "react";
import { AppContext } from "@/context";
import { Links, SearchForm, MyTable, Footer } from "@/ui";
import { useEge, usePerson, useSearch, useTable } from "@/hooks";
import { fromWLS, loadParams, searchOlymps } from "@/ts";

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
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
