import ReactDOM from 'react-dom';
import TableHead from "./TableHead";

const results = () => document.getElementById('results');

function InsertTable(caption, trs) {
    document.title = caption;
    ReactDOM.render(
        <table id="table" rules="all" border="all">
            <caption>{caption}</caption>
            <TableHead />
            <tbody>
                {trs}
            </tbody>
        </table>,
        results()
    );
}

function RemoveTable() {
    ReactDOM.unmountComponentAtNode(results());
}

export { InsertTable, RemoveTable };