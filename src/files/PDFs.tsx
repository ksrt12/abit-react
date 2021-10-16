function importAll(r: any) {
    const pdfs: { [key: string]: string; } = {};
    r.keys().forEach((item: any) => { pdfs[item.substring(2, 6)] = r(item); });
    return pdfs;
}
//@ts-ignore
const PDFs = importAll(require.context('./', false, /[0-9]{4}\.(pdf)$/));

export default PDFs;