import React from "react";
import { sha256 } from 'js-sha256';
import { InsertTable, RemoveTable, updateOutside } from "../ui/FullTable";
import { WLS, fromWLS, subjects } from "./constants";
import { setPointsColor } from "./colors";
import { searchOlymps, IOlymp } from "./search";

type TSetState<T> = React.Dispatch<React.SetStateAction<T>>;

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

interface IPerson {
    [index: string]: string;
}

interface IEGE {
    [index: string]: number;
}

let person: IPerson, EGE: IEGE = {};

/**
 * Parse input string to object   
 * @param pars Input string
 * @param spl1 Splitter 1
 * @param spl2 Splitter 2
 */
function getParamsFrom(pars: string, spl1: string, spl2: string): IPerson;
function getParamsFrom(pars: string, spl1: string, spl2: string, num: boolean): IEGE;
function getParamsFrom(pars: string, spl1: string, spl2: string, num?: boolean) {
    return decodeURIComponent(pars).split(spl1).reduce((p, e) => {
        const [key, val]: string[] = e.split(spl2);
        if (num) {
            p[key.toLowerCase()] = Number(val);
        } else {
            p[key] = val;
        }
        return p;
    }, {} as IPerson | IEGE);
}

/** Get person properties as object from window.location.search */
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

/** Function make full person name and set pid property via sha256 */
function makeName() {
    person.NAME = `${person.LN} ${person.FN} ${person.MN}`.replace(/\s+/g, ' ');
    person.Dname = ((person.DN) ? person.DN + ' ' : '') + person.NAME;
    if (person.BDY) {
        person.BD = `${person.BDY}-${person.BDM}-${person.BDD}`;
    }
    person.pid = sha256(`${person.NAME} ${person.BD}`);
};

/** Validate and update points */
function updatePoints(points: number, id: string) {
    const validPoints = (points < 0) ? 0 : (points > 100) ? 100 : points;
    EGE[subjects[id]] = validPoints;
    updateOutside(EGE);
    return validPoints.toString();
}

/** Do olymps search from search button */
function doSearch(rename: TSetState<string>, disable: TSetState<boolean>) {
    person = {};
    const inputs = Array.from(document.querySelector("#fio_form") as HTMLFormElement) as HTMLInputElement[];
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

/** Reset all input points fields and remove olymps table */
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

/** Insert non-empty olymps table into page */
function checkTable(values: IOlymp[][]) {
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

/** Auto-run search from window.location.search */
function loadFromWLS() {
    loadParams();
    Promise.all(searchOlymps(person.pid)).then(checkTable);
}

if (fromWLS) {
    window.addEventListener("DOMContentLoaded", loadFromWLS);
}

export { doSearch, clearData, updatePoints };
export { EGE, yesconf, nonconf };
export type { TSetState };