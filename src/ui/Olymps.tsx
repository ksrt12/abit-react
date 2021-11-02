import { RSROLYMP } from "../ts/constants";
import { colorBVI } from "../ts/colors";
import { checkBVI } from "../ts/bvi";
import { IOlymp } from "../ts/search";

interface IMakeLink {
    year: number;
    code: number;
}

/** Make olymps link */
const MakeLink: React.FC<IMakeLink> = ({ year, code }) => {
    return (
        <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
            {code.toString().replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
};

interface IOlympRow {
    olymp: IOlymp;
    stream: string;
}

/** Make olymp row */
const OlympRow: React.FC<IOlympRow> = ({ stream, olymp }) => {
    const newStatus = checkBVI(stream, olymp);

    return (
        <tr style={{ backgroundColor: colorBVI(newStatus) }}>
            <td>{olymp.name}</td>
            <td>{olymp.lvl}</td>
            <td>{olymp.dip}</td>
            <td>{olymp.subj}</td>
            <td><MakeLink code={olymp.code} year={olymp.year} /></td>
            <td>{olymp.grad}</td>
            <td>{newStatus}</td>
        </tr>
    );
};

export default OlympRow;