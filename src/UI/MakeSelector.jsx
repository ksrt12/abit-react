import { informatics, physics, chemistry, social } from "../ts/constants";
import { updateStatus } from "../ts/diploma";

function MakeSelector() {
    const streams = [
        "01.03.02",
        "09.03.02",
        "09.03.03",
        "11.03.02",
        ...informatics,
        "13.03.01",
        ...physics,
        ...chemistry,
        ...social,
        "44.03.04",
        "45.03.04",
    ].sort();

    const upd = e => {
        updateStatus(e.target.selectedOptions[0].label);
    };

    return (
        <select autoFocus={true} onChange={upd}>
            {streams.map(val => <option key={val} value={val}>{val}</option>)}
        </select>
    );
};

export default MakeSelector;