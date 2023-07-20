import React, { Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState, ChangeEvent } from "react";
import { AppContext } from "@/context";
import { useSearch } from "@/hooks";
import { subjects, fromWLS, makeName, searchOlymps } from "@/ts";

interface IDefs {
  dis: boolean;
  LN?: string;
  FN?: string;
  MN?: string;
  BD?: string;
}

let defs: IDefs = { dis: true };
if (process.env.NODE_ENV === "development" && false) {
  const fio = require("../test");
  defs = fio.default;
}

interface IDefaultInput {
  id: string;
  label: string;
  type: string;
  def?: string;
  placeholder?: string;
  maxLength?: number;
  min?: string;
  max?: string;
  key?: string | React.Key;
}

export type TSetState<T> = Dispatch<SetStateAction<T>>;

/** Make default input */
const DefaultInput: FC<IDefaultInput> = ({ id, label, def, ...inputProps }) => {
  const [val, setVal] = useState(def || "");
  const { EGE, updateEGE } = useContext(AppContext);

  const validate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target;
    let newVal = target.value;

    if (target.type === "number") {
      const points = Number(newVal);
      const validPoints = (points < 0) ? 0 : (points > 100) ? 100 : points;
      updateEGE({ [subjects[target.id]]: validPoints });
      newVal = validPoints.toString() || EGE[subjects[target.id]].toString();
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

/** Make ege form */
const EgeForm: FC<PropsWithChildren> = React.memo(() => {
  const ids = Object.keys(subjects);
  const getSubj = (id: string) => {
    const subj = subjects[id];
    return subj[0].toUpperCase() + subj.slice(1);
  };
  const Forma = (arr: string[]) => (
    <form>
      {arr.map((id: string) => (
        <DefaultInput
          id={id}
          key={id}
          label={getSubj(id)}
          max="100"
          min="0" placeholder="60"
          type="number"
        />
      ))}
    </form>
  );

  return (
    <div className="ege">
      {Forma(ids.slice(0, 4))}
      {Forma(ids.slice(4))}
    </div>
  );
});

EgeForm.displayName = "EgeForm";

interface IFioForm {
  setDisable: TSetState<boolean>;
}

/** Make fio form */
const FioForm: FC<IFioForm> = React.memo(({ setDisable }) => {
  const { person, ready, setReady, updatePerson } = useContext(AppContext);

  const clearData = () => {
    if (ready) {
      setReady(false);
      document.title = "Олимпиады РСОШ";
    }
  };

  const checkFio = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.target.form;
    updatePerson({ [e.target.id]: e.target.value });
    setDisable(!Boolean(form[0].value && form[1].value));
  };

  const fio = [
    {
      id: "LN", type: "text",
      label: "Фамилия",
      maxLength: 20,
      placeholder: "Иванов",
      def: defs.LN,
    },
    {
      id: "FN", type: "text",
      label: "Имя",
      maxLength: 20,
      placeholder: "Иван",
      def: defs.FN,
    },
    {
      id: "MN", type: "text",
      label: "Отчество",
      maxLength: 20,
      placeholder: "Иванович",
      def: defs.MN,
    },
    {
      id: "BD", type: "date",
      label: "Дата рождения",
      max: "2005-01-01",
      min: "1996-01-01",
      def: defs.BD || person.BD,
    },
  ];

  return (
    <div className="fio" onChange={clearData}>
      <form autoComplete="on" id="fio_form" onChange={checkFio}>
        {fio.map(obj => <DefaultInput key={obj.id} {...obj} />)}
      </form>
    </div>
  );
});

FioForm.displayName = "FioForm";

interface ISearchBtn extends IFioForm {
  isDisabled: boolean;
}

/** Make search button */
const SearchBtn: FC<ISearchBtn> = ({ isDisabled, setDisable }) => {

  const { updateTable, person } = useContext(AppContext);
  const [btnName, setBtnName] = useState("Проверить");

  /** Insert non-empty olymps table into page */
  const checkTable = useSearch(updateTable, fromWLS);

  /** Do olymps search from search button */
  const search = () => {
    console.log("Run search...");

    const { pid, Dname } = makeName(person);
    setBtnName("Загрузка...");
    Promise.all(searchOlymps(pid)).then(vals => checkTable(vals, Dname))
      .then(() => {
        setBtnName("Проверить");
        setDisable(true);
      });
  };

  return (
    <button disabled={isDisabled} onClick={search}>{btnName}</button>
  );
};

/** Make full search form */
export const SearchForm: FC = () => {
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
