import MakeSelector from "./MakeSelector";

function getSort(event) {
    const target = event.target;
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );
    for (const tBody of target.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    for (const cell of target.parentNode.cells)
        cell.classList.toggle('sorted', cell === target);

}

function TableHead(props) {
    const heads = [
        'Олимпиада',
        'Уровень',
        'Степень',
        'Профиль',
        'Номер электронного диплома',
        'Класс',
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

}

export default TableHead;