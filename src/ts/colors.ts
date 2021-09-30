import { bvi, sto } from "./constants";
import { yesconf } from "./diploma";

const colors = {
    empty: ["pink", "red"],
    noConf: ["#ffda60", "gold"],
    normal: ["", ""]
};

function setPointsColor(id: string, isStream: boolean, isEmpty?: boolean, isConf?: boolean) {
    [(document.querySelector(`[for=${id}]`) as HTMLLabelElement).style.backgroundColor, (document.querySelector(`#${id}`) as HTMLInputElement).style.borderColor] = isStream ? isEmpty ? colors.empty : isConf ? colors.normal : colors.noConf : colors.normal;
}

function colorBVI(newStatus: string) {
    return (newStatus.includes(bvi + yesconf)) ? "#a0faad" :
        (newStatus.includes(sto + yesconf)) ? "#89f5dc" : "";
}

export { setPointsColor, colorBVI };