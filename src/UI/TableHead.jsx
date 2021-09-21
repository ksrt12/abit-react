import React from "react";
import MakeSelector from "./MakeSelector";
import { getSort } from "../js/utils";

function TableHead() {
    const heads = [
        'Олимпиада',
        'Уровень',
        'Степень',
        'Профиль',
        'Номер электронного диплома',
        'Класс',
    ];
    return (
        <thead>
            <tr>
                {heads.map(th => {
                    return (
                        <th key={th} onClick={getSort}>{th}</th>);
                })}
                <th id="stream">
                    <MakeSelector />
                </th>
            </tr>
        </thead>
    );

}

export default TableHead;