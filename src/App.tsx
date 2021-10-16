import Links from "./ui/Links";
import SearchForm from "./ui/SearchForm";
import Copyright from "./ui/Copyright";
import { fromWLS } from "./ts/constants";

function App() {
    return (
        <>
            <div className="content">
                <Links />
                <div className="main">
                    {!fromWLS && (<SearchForm />)}
                    <div id="results"></div>
                </div>
            </div>
            <Copyright />
        </>
    );
}

export default App;
