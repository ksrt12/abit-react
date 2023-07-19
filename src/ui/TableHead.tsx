import React, { FC } from "react";
import { IStreamState, MakeSelector } from "@/ui";

/** Sorting function */
function getSort(event: React.MouseEvent<HTMLTableCellElement>) {
  const target = event.target as any;
  const order = (target.dataset.order = -(target.dataset.order || -1));
  const index = [...target.parentNode!.cells].indexOf(target);
  const collator = new Intl.Collator(["en", "ru"], { numeric: true });
  const comparator = (index: number, order: number) => (a: any, b: any) => order * collator.compare(
    a.children[index].innerHTML,
    b.children[index].innerHTML
  );
  for (const tBody of target.closest("table").tBodies)
    tBody.append(...[...tBody.rows].sort(comparator(index, order)));
  for (const cell of target.parentNode!.cells)
    cell.classList.toggle("sorted", cell === target);

}

/** Make table head */
export const TableHead: FC<IStreamState> = React.memo((props) => {
  const heads = [
    "Олимпиада",
    "Уровень",
    "Степень",
    "Профиль",
    "Номер электронного диплома",
    "Класс",
  ];
  return (
    <thead>
      <tr>
        {heads.map(th => <th key={th} onClick={getSort}>{th}</th>)}
        <th id="stream">
          <MakeSelector {...props} />
        </th>
      </tr>
    </thead>
  );
});

TableHead.displayName = "TableHead";
