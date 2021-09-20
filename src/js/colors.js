import { bvi, sto } from "./constants";
import { yesconf } from "./diploma";

function setPinkColor(id, is_empty = false) {
    setBgColor(document.querySelector(`[for=${id}]`), (is_empty) ? "pink" : "");
}

function setBgColor(elem, color) {
    elem.style.backgroundColor = color;
}

function colorBVI(tr, new_status) {
    let bg;
    if (new_status.includes(bvi + yesconf)) {
        bg = "#a0faad";
    } else if (new_status.includes(sto + yesconf)) {
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