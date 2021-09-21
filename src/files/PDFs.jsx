function importAll(r) {
    let pdfs = {};
    r.keys().forEach(item => { pdfs[item.substring(2, 6)] = r(item); });
    return pdfs;
}

const PDFs = importAll(require.context('./', false, /[0-9]{4}\.(pdf)$/));

export default PDFs;