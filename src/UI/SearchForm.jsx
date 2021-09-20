import { checkData, doSearch } from "../js/diploma";
import { SUBJECTS } from "../js/constants";

function EgeSubj(props) {
    return (
        <p>
            <label htmlFor={props.id}>{props.name}</label>
            <input type="number" min="0" max="100" placeholder="60" id={props.id} />
        </p>
    );
}

function EgeForm() {
    const names = Object.keys(SUBJECTS);
    const form = arr => {
        return arr.map(name => {
            return (
                <EgeSubj
                    key={SUBJECTS[name]}
                    id={SUBJECTS[name]}
                    name={name}
                />
            );
        });
    };

    return (
        <div className="ege" onChange={() => checkData(false)}>
            <form>
                {form(names.slice(0, 4))}
            </form>
            <form>
                {form(names.slice(4))}
            </form>
        </div>
    );
};

function FioForm() {
    const fio = [
        { id: "LN", name: "Фамилия", placeholder: "Иванов" },
        { id: "FN", name: "Имя", placeholder: "Иван" },
        { id: "MN", name: "Отчество", placeholder: "Иванович" }
    ];

    return (
        <div className="fio">
            <form id="fio_form" autoComplete="on" onKeyUp={() => checkData(true)}>
                {fio.map(obj => {
                    return (
                        <p key={obj.id}>
                            <label htmlFor={obj.id}>{obj.name}</label>
                            <input type="text" id={obj.id} placeholder={obj.placeholder} />
                        </p>
                    );
                })}
                <p>
                    <label htmlFor="BD">Дата рождения</label>
                    <input type="date" id="BD" max="2005-01-01" min="1996-01-01" defaultValue="2002-01-01" />
                </p>
            </form>
        </div>
    );
}

function SearchForm() {
    return (
        <div>
            <div className="search">
                <FioForm />
                <EgeForm />
            </div>
            <div>
                <br />
                <button onClick={doSearch}>Проверить</button>
                <br /><br />
            </div>
        </div>
    );
}

export default SearchForm;