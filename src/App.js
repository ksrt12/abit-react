import React from "react";
import Links from "./UI/Links";
import SearchForm from "./UI/SearchForm";
import Copyright from "./UI/Copyright";
import { fromWLS } from "./ts/constants";

function App() {
    return (
        <div>
            <Links />
            <div className="main">
                {fromWLS ? null : (<SearchForm />)}
                <div id="results"></div>
            </div>
            <Copyright />
        </div>
    );
}

export default App;
