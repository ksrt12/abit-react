import { RSROLYMP } from "../js/constants";
import { colorBVI } from "../js/colors";
import { checkBVI } from "../js/bvi";

function getSubTitles(olympname, grad) {
    const
        name = olympname.substring(olympname.indexOf('. "') + 3, olympname.indexOf('("') - 2).replace(/[«»]+/g, '"').trim(),
        lvl = olympname.substr(olympname.indexOf('уровень') - 2, 1).trim(),
        dip = olympname.substr(olympname.indexOf('Диплом') + 7, 1).trim(),
        subj = olympname.substring(olympname.indexOf('("') + 2, olympname.indexOf('")')).toLowerCase().replace('cистемы', 'системы').trim(),
        status = checkBVI('01.03.02', grad, subj, name, lvl, dip);
    return [name, lvl, dip, subj, status];
}

function makeLink(code, year) {
    return (
        <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
            {`${code}`.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
}

function OlympRow(tds, key) {
    return (
        <tr style={{ backgroundColor: colorBVI(null, tds[6]) }} key={key}>
            {tds.map((td, i) => { return (<td key={i}>{td}</td>); })}
        </tr>
    );
}

function Olymps(year, codes) {
    const trs = [];
    for (const d of codes) {
        if (d.form > 9) {
            const olymp = getSubTitles(d.oa, d.form);
            trs.push(OlympRow([
                olymp[0],
                olymp[1],
                olymp[2],
                olymp[3],
                makeLink(d.code, year),
                d.form,
                olymp[4],
            ], d.code));
        }
    }
    return trs;
}

export default Olymps;