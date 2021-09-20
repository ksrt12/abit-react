/**
 * @name diploma.js
 * @author diploma.rsr-olymp.ru, Kazakov Stepan
 * @copyright 2020, diploma.rsr-olymp.ru
 * @copyright 2020-2021, kazakovstepan
 * @for ITMO University
 */

import React from "react";
import ReactDOM from "react-dom";
import { sha256 } from 'js-sha256';

import TableHead from "../UI/TableHead";
import Olymps from "../UI/Olymps";

import { WLS, fromWLS, RSROLYMP, SUBJECTS } from "./constants";

import { checkBVI } from "./bvi";
import { colorBVI, setPinkColor } from "./colors";

import { isTable, getEGEfromInput } from "./utils";

let trs = [];

let nonconf = ' Не подтв.',
    yesconf = ' Подтв.';

let params = {
    FN: null,
    LN: null,
    MN: null,
    DN: null,
    BD: null,
    EGE: null
}, EGE;

function getParamsFrom(pars, spl1, spl2, num = false) {
    return decodeURIComponent(pars).split(spl1).reduce((p, e) => {
        const [key, val] = e.split(spl2);
        if (num) {
            p[key.toLowerCase()] = Number(val);
        } else {
            p[key] = val;
        }
        return p;
    }, {});
}

function loadParams() {
    params = getParamsFrom(WLS.replace('?', ''), '&', '=');
    if (params.EGE) {
        EGE = getParamsFrom(params.EGE, ',', ':', true);
    } else {
        // set default EGE points as 100
        EGE = {};
        Object.keys(SUBJECTS).forEach(subj => EGE[subj.toLowerCase()] = 100);
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

function loadDiplomaList(year, pid) {
    let s = document.createElement('script');
    s.onload = () => {
        trs = [...trs, ...Olymps(year, window.diplomaCodes)];
    };
    s.async = false;
    s.crossorigin = "anonymous";
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

function updateStatus(stream) {
    const textFrom = (row, cell) => row.cells[cell].innerText;
    for (let i of document.querySelector("tbody").rows) {
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

function doSearch() {
    EGE = {};
    for (let j of getEGEfromInput()) {
        let points = Number(j.value);
        if (j.value !== "") {
            points = (points < 0) ? 0 : (points > 100) ? 100 : points;
            j.value = points;
        }
        EGE[document.querySelector(`[for=${j.id}]`).innerText.toLowerCase()] = points;
    }
    if (isTable()) {
        updateStatus(document.querySelector("#stream > select").value);
    } else {
        params = {};
        for (let i of document.querySelectorAll("#fio_form > p > input")) {
            params[i.id] = i.value.trim().toLowerCase().replace(/(([- ]|^)[^ ])/g, s => s.toUpperCase());
        }
        Person.makeName();

        if (params.NAME) {
            Promise.resolve()
                .then(searchOlymps)
                .then(() => setTimeout(checkTable, 400));
        } else {
            console.log("empty");
        }
    }
}

function checkData(reset) {
    let is_table = isTable();
    if (is_table) {
        if (reset) {
            ReactDOM.unmountComponentAtNode(document.getElementById('results'));
            document.title = "Олимпиады РСОШ";
            trs = [];
            for (let j of getEGEfromInput()) {
                j.value = "";
                setPinkColor(j.id);
            }
        } else {
            doSearch();
        }
    } else {
        const LN = document.querySelector("#LN").value.length;
        const FN = document.querySelector("#FN").value.length;
        document.querySelector("button").disabled = !Boolean(LN && FN);
    }
}

function checkTableIsLoad() {
    window.addEventListener("load", () => {
        if (params.wallpapers === "true") {
            document.querySelector("body > div.left").style.display = "none";
            document.querySelector("body > div.main").style.display = "none";
            document.querySelector("body > div.right").style.display = "none";
            // addScript("js/stars.js");
            //start_stars();
        }
        checkTable();
    });
}

function checkTable() {
    if (trs.length) {
        InsertTable();
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

function InsertTable() {
    const caption = Person.getDName();
    document.title = caption;
    ReactDOM.render(
        <table id="table" rules="all" border="all">
            <caption>{caption}</caption>
            <TableHead />
            <tbody>
                {trs}
            </tbody>
        </table>,
        document.getElementById('results')
    );
    isTable().after(document.createElement("br"));
}

if (fromWLS) {
    window.addEventListener("DOMContentLoaded", loadFromWLS);
} else {
    window.addEventListener("load", () => checkData(false));
}

export { doSearch, checkData, updateStatus };
export { EGE, yesconf, nonconf };