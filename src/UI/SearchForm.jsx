import React, { useState } from "react";
import { checkData, doSearch, updatePoints } from "../ts/diploma";
import { ids, subjects } from "../ts/constants";

function DefaultInput({ id, label, ...inputProps }) {
    const [val, setVal] = useState("");
    const validate = e => {
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
}

function EgeForm() {
    const getSubj = id => {
        const subj = subjects[id];
        return subj[0].toUpperCase() + subj.slice(1);
    };
    const Forma = arr => <form>
        {arr.map(id => <DefaultInput
            key={id}
            id={id}
            label={getSubj(id)}
            type="number"
            min="0" max="100"
            placeholder="60"
        />)}
    </form>;

    return (
        <div className="ege" onChange={() => checkData(false)} >
            {Forma(ids.slice(0, 4))}
            {Forma(ids.slice(4))}
        </div>
    );
};

function FioForm({ checkFio }) {
    const fio = [
        { id: "LN", name: "Фамилия", placeholder: "Иванов" },
        { id: "FN", name: "Имя", placeholder: "Иван" },
        { id: "MN", name: "Отчество", placeholder: "Иванович" }
    ];

    return (
        <div className="fio" onChange={() => checkData(true)} >
            <form id="fio_form" autoComplete="on" onChange={e => checkFio(e.target.form)}>
                {fio.map(obj => <DefaultInput
                    key={obj.id}
                    id={obj.id}
                    label={obj.name}
                    type="text"
                    placeholder={obj.placeholder}
                    maxLength="20"
                />)}
                <DefaultInput
                    key="BD"
                    id="BD"
                    label="Дата рождения"
                    type="date"
                    max="2005-01-01"
                    min="1996-01-01"
                />
            </form>
        </div>
    );
}

function SearchForm() {
    const [disabled, Enable] = useState(true);
    const checkFio = form => Enable(!Boolean(form[0].value && form[1].value));

    return (
        <div>
            <div className="search">
                <FioForm checkFio={checkFio} />
                <EgeForm />
            </div>
            <button disabled={disabled} onClick={doSearch}>Проверить</button>
        </div>
    );
}

export default SearchForm;;