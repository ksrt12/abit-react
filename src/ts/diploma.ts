/**
 * @name diploma.js
 * @author diploma.rsr-olymp.ru, Kazakov Stepan
 * @copyright 2020, diploma.rsr-olymp.ru
 * @copyright 2020-2021, kazakovstepan
 * @for ITMO University
 */

import { sha256 } from 'js-sha256';
import { InsertTable, RemoveTable, updateOutside } from "../UI/FullTable";
import { WLS, fromWLS, subjects } from "./constants";
import { setPointsColor } from "./colors";
import { searchOlymps, Iolymp } from "./search";

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

interface IPerson {
    [index: string]: string;
}

interface IEGE {
    [index: string]: number;
}

let person: IPerson, EGE: IEGE = {};

function getParamsFrom(pars: string, spl1: string, spl2: string): IPerson;
function getParamsFrom(pars: string, spl1: string, spl2: string, num: boolean): IEGE;
function getParamsFrom(pars: string, spl1: string, spl2: string, num?: boolean) {
    let obj: { [index: string]: string | number; } = {};
    return decodeURIComponent(pars).split(spl1).reduce((p, e) => {
        const [key, val]: string[] = e.split(spl2);
        if (num) {
            p[key.toLowerCase()] = Number(val);
        } else {
            p[key] = val;
        }
        return p;
    }, obj);
}

function loadParams() {
    person = getParamsFrom(WLS.replace('?', ''), '&', '=');
    if (person.EGE) {
        EGE = getParamsFrom(person.EGE, ',', ':', true);
    } else {
        // set default EGE points as 100
        Object.values(subjects).forEach(subj => EGE[subj] = 100);
        yesconf = '';
        nonconf = '';
    }
    makeName();
}

function makeName() {
    person.NAME = `${person.LN} ${person.FN} ${person.MN}`.replace(/\s+/g, ' ');
    person.Dname = ((person.DN) ? person.DN + ' ' : '') + person.NAME;
    if (person.BDY) {
        person.BD = `${person.BDY}-${person.BDM}-${person.BDD}`;
    }
    person.pid = sha256(`${person.NAME} ${person.BD}`);
};

function updatePoints(points: number, id: string) {
    const validPoints = (points < 0) ? 0 : (points > 100) ? 100 : points;
    EGE[subjects[id]] = validPoints;
    updateOutside(EGE);
    return validPoints;
}

function doSearch<F extends Function>(rename: F, disable: F, inputs: HTMLInputElement[]) {
    person = {};
    inputs.forEach(input => person[input.id] = input.value.trim()
        .toLowerCase().replace(/(([- ]|^)[^ ])/g, (s: string) => s.toUpperCase()));
    makeName();
    rename("Загрузка...");
    Promise.all(searchOlymps(person.pid)).then(checkTable)
        .then(() => {
            rename("Проверить");
            disable(true);
        });
}

function clearData() {
    if (document.querySelector("#table")) {
        RemoveTable();
        document.title = "Олимпиады РСОШ";
        for (const j of document.querySelectorAll<HTMLInputElement>(".ege input")) {
            j.value = "";
            setPointsColor(j.id, false);
        }
    }
}

function checkTable(values: Iolymp[][]) {
    const trs = values.flat();
    if (trs.length) {
        InsertTable(person.Dname, trs);
    } else {
        if (person.LN) {
            alert(`Олимпиад РСОШ абитуриента\n${person.Dname} не найдено!`);
            if (fromWLS) {
                window.close();
            }
        }
    }
}

function loadFromWLS() {
    loadParams();
    Promise.all(searchOlymps(person.pid)).then(checkTable);
}

if (fromWLS) {
    window.addEventListener("DOMContentLoaded", loadFromWLS);
}

export { doSearch, clearData, updatePoints };
export { EGE, yesconf, nonconf };