import { AppContext } from "@/context";
import { useState, useContext, FC } from "react";
import { OlympRow, TableHead } from "@/ui";

/** Make olymps table */
export const MyTable: FC = () => {
  const { caption, trs } = useContext(AppContext);
  const [stream, setStream] = useState("01.03.02");
  const state = { stream, setStream };

  return (
    <table id="table">
      <caption>{caption}</caption>
      <TableHead {...state} />
      <tbody>
        {trs.map(item => <OlympRow key={item.code} olymp={item} {...state} />)}
      </tbody>
    </table>
  );
};
