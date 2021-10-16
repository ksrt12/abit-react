import React, { useState } from "react";
import { clearData, doSearch, updatePoints } from "../ts/diploma";
import { subjects } from "../ts/constants";
import { IDefs, IDefaultInput, IFioForm, ISearchBtn } from "./interfaces";

let defs: IDefs = { dis: true };
if (process.env.NODE_ENV === "development" && false) {
    const fio = require("../test");
    defs = fio.default;
}

const DefaultInput: React.FC<IDefaultInput> = ({ id, label, def, ...inputProps }) => {
    const [val, setVal] = useState(def || "");
    const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const target = e.target;
        let newVal = target.value;

        if (target.type === "number") {
            newVal = updatePoints(Number(newVal), target.id) || "";
        }

        setVal(newVal);
    };

    return (
        <p>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...inputProps} value={val} onChange={validate} />
        </p>
    );
};

const EgeForm: React.FC = React.memo(() => {
    const ids = Object.keys(subjects);
    const getSubj = (id: string) => {
        const subj = subjects[id];
        return subj[0].toUpperCase() + subj.slice(1);
    };
    const Forma = (arr: string[]) => <form>
        {arr.map((id: string) => <DefaultInput
            key={id}
            id={id}
            label={getSubj(id)}
            type="number"
            min="0" max="100"
            placeholder="60"
        />)}
    </form>;

    return (
        <div className="ege">
            {Forma(ids.slice(0, 4))}
            {Forma(ids.slice(4))}
        </div>
    );
});

const FioForm: React.FC<IFioForm> = React.memo(({ setDisable }) => {
    const checkFio = (e: React.ChangeEvent<HTMLFormElement>) => {
        const form = e.target.form;
        setDisable(!Boolean(form[0].value && form[1].value));
    };
    const fio = [
        {
            id: "LN", type: "text",
            label: "Фамилия",
            maxLength: 20,
            placeholder: "Иванов",
            def: defs.LN
        },
        {
            id: "FN", type: "text",
            label: "Имя",
            maxLength: 20,
            placeholder: "Иван",
            def: defs.FN
        },
        {
            id: "MN", type: "text",
            label: "Отчество",
            maxLength: 20,
            placeholder: "Иванович",
            def: defs.MN
        },
        {
            id: "BD", type: "date",
            label: "Дата рождения",
            max: "2005-01-01",
            min: "1996-01-01",
            def: defs.BD || "2003-01-01"
        }
    ];

    return (
        <div className="fio" onChange={clearData} >
            <form id="fio_form" autoComplete="on" onChange={checkFio}>
                {fio.map(obj => <DefaultInput key={obj.id} {...obj} />)}
            </form>
        </div>
    );
});

const SearchBtn: React.FC<ISearchBtn> = ({ isDisabled, setDisable }) => {
    const [btnName, setBtnName] = useState("Проверить");
    const search = (e: React.MouseEvent<HTMLButtonElement>) => doSearch(setBtnName, setDisable);

    return (
        <button disabled={isDisabled} onClick={search}>{btnName}</button>
    );
};

const SearchForm: React.FC = () => {
    const [isDisabled, setDisable] = useState(defs.dis);
    const props = { isDisabled, setDisable };

    return (
        <div className="search_full">
            <div className="search">
                <FioForm setDisable={setDisable} />
                <EgeForm />
            </div>
            <SearchBtn {...props} />
        </div>
    );
};

export default SearchForm;