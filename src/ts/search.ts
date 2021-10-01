import { RSROLYMP } from "./constants";

interface dCodes {
    code: number,
    oa: string,
    name: string,
    form: number,
    hashed: string;
}

declare global {
    interface Window {
        diplomaCodes: dCodes[];
    }
}

function getSubTitles(olympName: string) {
    return {
        name: olympName.substring(olympName.indexOf('. "') + 3, olympName.indexOf('("') - 2).replace(/[«»]+/g, '"').trim(),
        lvl: Number(olympName.substr(olympName.indexOf('уровень') - 2, 1).trim()),
        dip: Number(olympName.substr(olympName.indexOf('Диплом') + 7, 1).trim()),
        subj: olympName.substring(olympName.indexOf('("') + 2, olympName.indexOf('")')).toLowerCase().replace('cистемы', 'системы').trim(),
    };
}

function getOlymps(year: number, codes: dCodes[]) {
    const trs = [];
    for (const d of codes) {
        if (d.form > 9) {
            trs.push({
                year: year,
                code: d.code,
                grad: d.form,
                ...getSubTitles(d.oa),
            });
        }
    }
    return trs;
}

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

function searchOlymps(personID: string) {
    const currYear = new Date().getFullYear();
    const years = [];
    for (let year = currYear; year >= currYear - 4; year--) {
        years.push(loadDiplomaList(year, personID));
    }
    return years;
}

export { searchOlymps };