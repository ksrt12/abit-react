import React, { useState, useContext } from "react";
import TableHead from "./TableHead";
import OlympRow from "./Olymps";
import AppContext from "../context/AppContext";

/** Make olymps table */
const MyTable: React.FC = () => {
    const { caption, trs } = useContext(AppContext);
    const [stream, setStream] = useState("01.03.02");
    const state = { stream, setStream };

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

export default MyTable;