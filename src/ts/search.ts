import { RSROLYMP } from "@/ts";

interface ICodes {
  code: number,
  oa: string,
  name: string,
  form: number,
  hashed: string;
}

interface IOlymp {
  name: string;
  lvl: number;
  dip: number;
  subj: string;
  year: number;
  code: number;
  grad: number;
}

declare global {
  interface Window {
    diplomaCodes: ICodes[];
  }
}

/** Parse olymp params */
function getSubTitles(olympName: string) {
  return {
    name: olympName.substring(olympName.indexOf(". \"") + 3, olympName.indexOf("(\"") - 2).replace(/[«»]+/g, "\"").trim(),
    lvl: Number(olympName.substring(olympName.indexOf("уровень") - 2, olympName.indexOf("уровень") - 1).trim()),
    dip: Number(olympName.substring(olympName.indexOf("Диплом") + 7, olympName.indexOf("Диплом") + 8).trim()),
    subj: olympName.substring(olympName.indexOf("(\"") + 2, olympName.indexOf("\")")).toLowerCase().replace("cистемы", "системы").trim(),
  };
}

/** Get olymps list for current year */
function getOlymps(year: number, codes: ICodes[]): IOlymp[] {
  const trs = [];
  for (const d of codes) {
    if (d.form > 9) {
      trs.push({
        year: year,
        code: d.code,
        grad: d.form,
        ...getSubTitles(d.oa),
      });
    }
  }
  return trs;
}

/** Get olymps from RSOSH */
function loadDiplomaList(year: number, pid: string): Promise<IOlymp[]> {
  const s = document.createElement("script");
  s.async = false;
  s.src = `${RSROLYMP}${year}/by-person-released/${pid}/codes.js`;
  document.head.appendChild(s);
  return new Promise(resolve => {
    s.onload = () => resolve(getOlymps(year, window.diplomaCodes));
    s.onerror = () => resolve([]);
  });
}

/** Get olymps from last 4 year*/
function searchOlymps(personID: string) {
  const currYear = new Date().getFullYear();
  const years = [];
  for (let year = currYear; year >= currYear - 4; year--) {
    years.push(loadDiplomaList(year, personID));
  }
  return years;
}

export { searchOlymps };
export type { IOlymp };
