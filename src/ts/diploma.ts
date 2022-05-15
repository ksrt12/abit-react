
import { sha256 } from "js-sha256";
import { IEGE } from "../hooks/ege.hook";
import { IPerson } from "../hooks/person.hook";
import { subjects, WLS } from "./constants";

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

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
    let ege: IEGE = {};
    const person = getParamsFrom(WLS.replace('?', ''), '&', '=');
    if (person.EGE) {
        ege = getParamsFrom(person.EGE, ',', ':', true);
    } else {
        // set default EGE points as 100
        Object.values(subjects).forEach(subj => ege[subj] = 100);
        yesconf = '';
        nonconf = '';
    }
    return { ege, ...makeName(person) };
}

const checkFIO = (s: string) => s.trim().toLowerCase().replace(/(([- ]|^)[^ ])/g, (s: string) => s.toUpperCase());

const makeName = (person: IPerson) => {
    const NAME = `${checkFIO(person.LN)} ${checkFIO(person.FN)} ${checkFIO(person.MN)}`.replace(/\s+/g, ' ');
    const Dname = ((person.DN) ? person.DN + ' ' : '') + NAME;
    const BD = (person.BDY) ? `${person.BDY}-${person.BDM}-${person.BDD}` : person.BD;
    const pid = sha256(`${NAME} ${BD}`);
    return { NAME, Dname, BD, pid };
};

export { yesconf, nonconf, getParamsFrom, makeName, loadParams };