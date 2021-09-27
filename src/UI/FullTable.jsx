import { useState } from "react";
import ReactDOM from 'react-dom';
import TableHead from "./TableHead";
import OlympRow from "./Olymps";

const results = () => document.getElementById('results');

function MyTable({ caption, trs }) {
    const [stream, setStream] = useState("01.03.02");
    console.log("render table. reason:", `${stream}:`);
    return (
        <table id="table" rules="all" border="all">
            <caption>{caption}</caption>
            <TableHead setStream={setStream} stream={stream} />
            <tbody>
                {trs.map(item => <OlympRow key={item.code} olymp={item} stream={stream} />)}
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
}

function RemoveTable() {
    ReactDOM.unmountComponentAtNode(results());
}

export { InsertTable, RemoveTable };