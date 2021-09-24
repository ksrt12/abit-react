/**
 * @name diploma.js
 * @author diploma.rsr-olymp.ru, Kazakov Stepan
 * @copyright 2020, diploma.rsr-olymp.ru
 * @copyright 2020-2021, kazakovstepan
 * @for ITMO University
 */

import { sha256 } from 'js-sha256';
import { InsertTable, RemoveTable } from "../UI/FullTable";
import Olymps from "../UI/Olymps";

import { WLS, fromWLS, RSROLYMP, subjects } from "./constants";

import { checkBVI } from "./bvi";
import { colorBVI, setPinkColor } from "./colors";

import { isTable } from "./utils";

let trs: any[] = [];

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

let params: { [index: string]: string; }, EGE: { [index: string]: number; } = {};

declare global {
    interface Window {
        diplomaCodes: any;
    }
}

function getParamsFrom(pars: string, spl1: string, spl2: string, num = false) {
    let obj: { [index: string]: any; } = {};
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
    params = getParamsFrom(WLS.replace('?', ''), '&', '=');
    if (params.EGE) {
        EGE = getParamsFrom(params.EGE, ',', ':', true);
    } else {
        // set default EGE points as 100
        Object.values(subjects).forEach(subj => EGE[subj] = 100);
        yesconf = '';
        nonconf = '';
    }
    Person.makeName();
    if (params.BDY) {
        Person.makeBD();
    }
}

const Person = {
    makeName() {
        params.NAME = `${params.LN} ${params.FN} ${params.MN}`.replace(/\s+/g, ' ');
    },
    makeBD() {
        params.BD = `${params.BDY}-${params.BDM}-${params.BDD}`;
    },
    getDName() {
        return ((params.DN) ? params.DN + ' ' : '') + params.NAME;
    },
    fullName() {
        return `${params.NAME} ${params.BD}`;
    }
};

function loadDiplomaList(year: number, pid: string) {
    let s = document.createElement('script');
    s.onload = () => {
        trs = [...trs, ...Olymps(year, window.diplomaCodes)];
    };
    s.async = false;
    s.src = `${RSROLYMP}${year}/by-person-released/${pid}/codes.js`;
    document.head.appendChild(s);
}

function searchOlymps() {
    const personID = sha256(Person.fullName());
    //const personID = "b3d5e8abe9b3bcfb27cc3d4a5e612df00ed469b90ec574a931aa1255fa8a924f";
    const currYEAR = new Date().getFullYear();
    for (let YEAR = currYEAR; YEAR >= currYEAR - 4; YEAR--) {
        loadDiplomaList(YEAR, personID);
    }
}

function updateStatus(stream: string) {
    const textFrom = (row: HTMLTableRowElement, cell: number) => row.cells[cell].innerText;
    for (let i of (document.querySelector("tbody") as HTMLTableSectionElement).rows) {
        let new_status = checkBVI(stream,
            textFrom(i, 5),
            textFrom(i, 3),
            textFrom(i, 0),
            textFrom(i, 1),
            textFrom(i, 2));
        i.cells[6].innerHTML = new_status;
        colorBVI(i, new_status);
    }
}

function updatePoints(points: number, id: string) {
    const validPoints = (points < 0) ? 0 : (points > 100) ? 100 : points;
    EGE[subjects[id]] = validPoints;
    return validPoints;
}

function doSearch() {
    if (isTable()) {
        updateStatus((document.querySelector("#stream > select") as HTMLInputElement).value);
    } else {
        params = {};
        for (const i of (document.querySelectorAll("#fio_form > p > input") as any)) {
            params[i.id] = i.value.trim().toLowerCase().replace(/(([- ]|^)[^ ])/g, (s: string) => s.toUpperCase());
        }
        Person.makeName();
        Promise.resolve()
            .then(searchOlymps)
            .then(() => setTimeout(checkTable, 400));
    }
}

function checkData(reset: boolean) {
    if (isTable()) {
        if (reset) {
            RemoveTable();
            document.title = "Олимпиады РСОШ";
            trs = [];
            for (const j of (document.querySelectorAll(".ege > form > p > input") as any)) {
                j.value = "";
                setPinkColor(j.id, false, true);
            }
        } else {
            doSearch();
        }
    }
}

function checkTableIsLoad() {
    window.addEventListener("load", checkTable);
}

function checkTable() {
    if (trs.length) {
        InsertTable(Person.getDName(), trs);
    } else {
        if (params.LN) {
            alert(`Олимпиад РСОШ абитуриента\n${Person.getDName()} не найдено!`);
            if (fromWLS) {
                window.close();
            }
        }
    }
}

function loadFromWLS() {
    loadParams();
    searchOlymps();
    checkTableIsLoad();
}

if (fromWLS) {
    window.addEventListener("DOMContentLoaded", loadFromWLS);
}

export { doSearch, checkData, updatePoints, updateStatus };
export { EGE, yesconf, nonconf };