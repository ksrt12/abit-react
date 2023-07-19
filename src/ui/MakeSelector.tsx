import { FC } from "react";
import { informatics, physics, chemistry, social } from "../ts/constants";
import { TSetState } from "./SearchForm";

interface IStreamState {
  stream: string;
  setStream: TSetState<string>;
}

/** Make streams selector */
const MakeSelector: FC<IStreamState> = ({ stream, setStream }) => {

  const streams = [
    "01.03.02",
    "09.03.02",
    "09.03.03",
    "11.03.02",
    ...informatics,
    ...physics,
    ...chemistry,
    ...social,
    "44.03.04",
    "45.03.04",
  ].sort();

  return (
    <select autoFocus={true}
      value={stream}
      onChange={e => setStream(e.target.value)}
    >
      {streams.map(val => <option key={val} value={val}>{val}</option>)}
    </select>
  );
};

export default MakeSelector;
export type { IStreamState };
