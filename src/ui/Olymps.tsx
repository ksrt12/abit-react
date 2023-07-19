import { FC, useContext } from "react";
import { AppContext } from "@/context";
import { RSROLYMP, IOlymp, checkBVI, colorBVI } from "@/ts";

interface IMakeLink {
  year: number;
  code: number;
}

/** Make olymps link */
const MakeLink: FC<IMakeLink> = ({ year, code }) => {
  return (
    <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
      {code.toString().replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, "$1 $2-$3")}
    </a>
  );
};

interface IOlympRow {
  olymp: IOlymp;
  stream: string;
}

/** Make olymp row */
export const OlympRow: FC<IOlympRow> = ({ stream, olymp }) => {
  const { EGE } = useContext(AppContext);
  const newStatus = checkBVI(EGE, stream, olymp);

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
