import { bvi, sto } from "./constants";
import { yesconf } from "./diploma";

function setPointsColor(id: string, isEmpty: boolean, noConf: boolean) {
    (document.querySelector(`[for=${id}]`) as HTMLTableRowElement).style.backgroundColor = isEmpty ? "pink" : noConf ? "" : "#ffda60";
    (document.querySelector(`#${id}`) as HTMLInputElement).style.borderColor = isEmpty ? "red" : noConf ? "" : "gold";
}

function colorBVI(newStatus: string) {
    let bg: string;
    if (newStatus.includes(bvi + yesconf)) {
        bg = "#a0faad";
    } else if (newStatus.includes(sto + yesconf)) {
        bg = "#89f5dc";
    } else {
        bg = "";
    }
    return bg;
}

export { setPointsColor, colorBVI };