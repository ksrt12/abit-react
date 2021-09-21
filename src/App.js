import './olymp.css';
import Links from "./UI/Links";
import SearchForm from "./UI/SearchForm";
import Copyright from "./UI/Copyright";
import { fromWLS } from "./js/constants";

function App() {
    return (
        <div>
            <Links />
            <div className="main">
                <br />
                {fromWLS ? null : (<SearchForm />)}
                <div id="results"></div>
            </div>
            <Copyright />
        </div>
    );
}

export default App;
