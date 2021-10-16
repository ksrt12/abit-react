import { RSROLYMP } from "../ts/constants";
import { colorBVI } from "../ts/colors";
import { checkBVI } from "../ts/bvi";
import { Iolymp } from "../ts/search";

interface IMakeLink {
    year: number;
    code: number;
}

const MakeLink: React.FC<IMakeLink> = ({ year, code }) => {
    return (
        <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
            {code.toString().replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
};

interface IOlympRow {
    olymp: Iolymp;
    stream: string;
}

const OlympRow: React.FC<IOlympRow> = (props) => {
    const olymp = props.olymp;
    const newStatus = checkBVI(props.stream, olymp);

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