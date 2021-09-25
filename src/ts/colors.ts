import { bvi, sto } from "./constants";
import { yesconf } from "./diploma";

function setPinkColor(id: string, isEmpty: boolean, noConf: boolean) {
    setBgColor((document.querySelector(`[for=${id}]`) as HTMLTableRowElement), (isEmpty) ? "pink" : (noConf) ? "" : "#ffda60");
    setBorderColor((document.querySelector(`#${id}`) as HTMLInputElement), (isEmpty) ? "red" : (noConf) ? "" : "gold");
}

function setBgColor(elem: HTMLTableRowElement, color: string) {
    elem.style.backgroundColor = color;
}

function setBorderColor(elem: HTMLInputElement, color: string) {
    elem.style.borderColor = color;
}

function colorBVI(newStatus: string, tr?: HTMLTableRowElement) {
    let bg: string;
    if (newStatus.includes(bvi + yesconf)) {
        bg = "#a0faad";
    } else if (newStatus.includes(sto + yesconf)) {
        bg = "#89f5dc";
    } else {
        bg = "";
    }
    if (tr instanceof HTMLTableRowElement) {
        setBgColor(tr, bg);
    } else {
        return bg;
    }
}

export { setBgColor, setPinkColor, colorBVI };