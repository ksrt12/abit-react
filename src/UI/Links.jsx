import React from "react";
import PDFs from "../files/PDFs";

function Links() {
    const years = Object.keys(PDFs).reverse();
    const abit = "https://abit.itmo.ru";
    return (
        <div className="links">
            <div className="side left">
                {years.map(year => (<p key={year}><a href={PDFs[year].default}>Списки ВСЕРОСа {year}</a></p>))}
            </div>
            <div className="side right">
                <p><a href={abit + "/file/pages/82/rsosh_2021_bvi.pdf"}>РСОШ 2021, дающие БВИ</a></p>
                <p><a href={abit + "/file/pages/82/100ballov_2021.pdf"}>РСОШ 2021, дающие 100 баллов</a></p>
                <p><a href={abit + "/file/pages/82/vosh_2021.pdf"}>ВСОШ (предметы и направления)</a></p>
                <p><a href={abit + "/page/101/"}>Ответственные лица (бакалавриат)</a></p>
                <p><a href={abit + "/page/102/"}>Ответственные лица (магистратура)</a></p>
            </div>
        </div>
    );
}

export default Links;