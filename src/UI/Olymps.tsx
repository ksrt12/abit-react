import { RSROLYMP } from "../ts/constants";
import { colorBVI } from "../ts/colors";
import { checkBVI } from "../ts/bvi";

function MakeLink(props: { year: number; code: number; }) {
    const code = props.code.toString();
    return (
        <a href={`${RSROLYMP}${props.year}/by-code/${code}/white.pdf`}>
            {code.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
}

interface OlympProps {
    olymp: {
        name: string,
        lvl: number,
        dip: number,
        subj: string,
        code: number,
        grad: number,
        year: number,
        status: string;
    },
    stream: string;
}

function OlympRow(props: OlympProps) {
    const olymp = props.olymp;
    const newStatus = checkBVI(props.stream, { ...olymp });

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
}

export default OlympRow;