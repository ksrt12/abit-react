import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import TableHead from "./TableHead";
import OlympRow from "./Olymps";
import { fromWLS } from "../ts/constants";
import { Iolymp } from "../ts/search";

const results = () => document.getElementById('results')!;

let updateOutside = function (ege: any) { };

interface IMyTable {
    caption: string;
    trs: Iolymp[];
}

interface IStreamState {
    stream: string;
    setStream: React.Dispatch<string>;
}

const MyTable: React.FC<IMyTable> = ({ caption, trs }) => {
    const [stream, setStream] = useState("01.03.02");
    const [, setEge] = useState({});
    const state = { stream, setStream };

    useEffect(() => {
        updateOutside = ege => setEge({ ...ege });
    }, []);

    return (
        <table id="table">
            <caption>{caption}</caption>
            <TableHead {...state} />
            <tbody>
                {trs.map(item => <OlympRow key={item.code} olymp={item} {...state} />)}
            </tbody>
        </table>
    );
};

function InsertTable(caption: string, trs: Iolymp[]) {
    document.title = caption;
    ReactDOM.render(
        <MyTable caption={caption} trs={trs} />,
        results()
    );
    if (window.screen.width < 930 || fromWLS) {
        document.querySelector<HTMLDivElement>(".main")!.style.width = "fit-content";
    }
}

function RemoveTable() {
    ReactDOM.unmountComponentAtNode(results());
}

export { InsertTable, RemoveTable, updateOutside };
export type { IStreamState };