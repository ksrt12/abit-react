/**
 * @name diploma.js
 * @author diploma.rsr-olymp.ru, Kazakov Stepan
 * @copyright 2020, diploma.rsr-olymp.ru
 * @copyright 2020-2021, kazakovstepan
 * @for ITMO University
 */

import { sha256 } from 'js-sha256';
import { InsertTable, RemoveTable } from "../UI/FullTable";
import { getOlymps } from "../UI/Olymps";

import { WLS, fromWLS, RSROLYMP, subjects } from "./constants";

import { setPinkColor } from "./colors";

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

let params: { [index: string]: string; }, EGE: { [index: string]: number; } = {};

declare global {
    interface Window {
        diplomaCodes: any[];
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
    const s = document.createElement('script');
    s.async = false;
    s.src = `${RSROLYMP}${year}/by-person-released/${pid}/codes.js`;
    document.head.appendChild(s);
    return new Promise(resolve => {
        s.onload = () => resolve(getOlymps(year, window.diplomaCodes));
        s.onerror = () => resolve([]);
    });
}

function searchOlymps() {
    const personID = sha256(Person.fullName());
    const currYear = new Date().getFullYear();
    const years = [];
    for (let year = currYear; year >= currYear - 4; year--) {
        years.push(loadDiplomaList(year, personID));
    }
    return years;
}

function updatePoints(points: number, id: string) {
    const validPoints = (points < 0) ? 0 : (points > 100) ? 100 : points;
    EGE[subjects[id]] = validPoints;
    return validPoints;
}

function doSearch(rename: any, disable: any, inputs: HTMLInputElement[]) {
    params = {};
    inputs.forEach(input => params[input.id] = input.value.trim()
        .toLowerCase().replace(/(([- ]|^)[^ ])/g, (s: string) => s.toUpperCase()));
    Person.makeName();
    rename("Загрузка...");
    Promise.all(searchOlymps()).then(checkTable)
        .then(() => {
            rename("Проверить");
            disable(true);
        });
}

function checkData(reset: boolean) {
    const selector = document.querySelector("#stream > select") as HTMLSelectElement;
    if (selector) {
        if (reset) {
            RemoveTable();
            document.title = "Олимпиады РСОШ";
            for (const j of (document.querySelectorAll(".ege > form > p > input") as any)) {
                j.value = "";
                setPinkColor(j.id, false, true);
            }
        } else {
            //
            // selector.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

function checkTable(values: any[]) {
    const trs = values.flat();
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
    Promise.all(searchOlymps()).then(checkTable);
}

if (fromWLS) {
    window.addEventListener("DOMContentLoaded", loadFromWLS);
}

export { doSearch, checkData, updatePoints };
export { EGE, yesconf, nonconf };