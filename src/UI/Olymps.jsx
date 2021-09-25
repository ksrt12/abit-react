import { RSROLYMP } from "../ts/constants";
import { colorBVI } from "../ts/colors";
import { checkBVI } from "../ts/bvi";

function getSubTitles(olympName, grad) {
    const tmp = {
        name: olympName.substring(olympName.indexOf('. "') + 3, olympName.indexOf('("') - 2).replace(/[«»]+/g, '"').trim(),
        lvl: Number(olympName.substr(olympName.indexOf('уровень') - 2, 1).trim()),
        dip: Number(olympName.substr(olympName.indexOf('Диплом') + 7, 1).trim()),
        subj: olympName.substring(olympName.indexOf('("') + 2, olympName.indexOf('")')).toLowerCase().replace('cистемы', 'системы').trim(),
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
            {tds.map((td, i) => <OlympTd key={`${unic}:${i}`} td={td} />)}
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