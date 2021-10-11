import Links from "./UI/Links";
import SearchForm from "./UI/SearchForm";
import Copyright from "./UI/Copyright";
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
