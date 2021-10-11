import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import TableHead from "./TableHead";
import OlympRow from "./Olymps";

const results = () => document.getElementById('results');

let updateOutside = function (ege) { };

function MyTable({ caption, trs }) {
    const [stream, setStream] = useState("01.03.02");
    const [, setEge] = useState({});
    const state = { stream, setStream };

    useEffect(() => {
        updateOutside = ege => setEge({ ...ege });
    }, []);

    return (
        <table id="table" rules="all" border="all">
            <caption>{caption}</caption>
            <TableHead {...state} />
            <tbody>
                {trs.map(item => <OlympRow key={item.code} olymp={item} {...state} />)}
            </tbody>
        </table>
    );
}

function InsertTable(caption, trs) {
    document.title = caption;
    ReactDOM.render(
        <MyTable caption={caption} trs={trs} />,
        results()
    );
    if (window.screen.width < 930) {
        document.querySelector(".main").style.width = "fit-content";
    }
}

function RemoveTable() {
    ReactDOM.unmountComponentAtNode(results());
}

export { InsertTable, RemoveTable, updateOutside };