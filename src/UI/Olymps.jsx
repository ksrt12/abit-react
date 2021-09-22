import React from "react";
import { RSROLYMP } from "../js/constants";
import { colorBVI } from "../js/colors";
import { checkBVI } from "../js/bvi";

function getSubTitles(olympname, grad) {
    const tmp = {
        name: olympname.substring(olympname.indexOf('. "') + 3, olympname.indexOf('("') - 2).replace(/[«»]+/g, '"').trim(),
        lvl: Number(olympname.substr(olympname.indexOf('уровень') - 2, 1).trim()),
        dip: Number(olympname.substr(olympname.indexOf('Диплом') + 7, 1).trim()),
        subj: olympname.substring(olympname.indexOf('("') + 2, olympname.indexOf('")')).toLowerCase().replace('cистемы', 'системы').trim(),
        status: ""
    };
    tmp["status"] = checkBVI('01.03.02', grad, tmp.subj, tmp.name, tmp.lvl, tmp.dip);
    return tmp;
}

function MakeLink({ code, year }) {
    return (
        <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
            {`${code}`.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
}

function OlympTd({ td }) {
    return (<td>{td}</td>);
}

function OlympRow({ tds, unic }) {
    return (
        <tr style={{ backgroundColor: colorBVI(null, tds[6]) }}>
            {tds.map((td, i) => (<OlympTd key={`${unic}:${i}`} td={td} />))}
        </tr>
    );
}

function Olymps(year, codes) {
    const trs = [];
    for (const d of codes) {
        if (d.form > 9) {
            const olymp = getSubTitles(d.oa, d.form);
            trs.push(<OlympRow tds={[
                olymp.name,
                olymp.lvl,
                olymp.dip,
                olymp.subj,
                <MakeLink code={d.code} year={year} />,
                d.form,
                olymp.status
            ]} unic={d.code} key={d.code} />);
        }
    }
    return trs;
}

export default Olymps;