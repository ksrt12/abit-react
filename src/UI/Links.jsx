import PDFs from "../files/PDFs";

function Link(href, text, key = href) {
    return (
        <p key={key}><a href={href}>{text}</a></p>
    );
}

function Links() {
    const years = Object.keys(PDFs).reverse();
    const abit = "https://abit.itmo.ru";
    const links = {
        "/file/pages/82/rsosh_2021_bvi.pdf": "РСОШ 2021, дающие БВИ",
        "/file/pages/82/100ballov_2021.pdf": "РСОШ 2021, дающие 100 баллов",
        "/file/pages/82/vosh_2021.pdf": "ВСОШ(предметы и направления)",
        "/page/101/": "Ответственные лица(бакалавриат)",
        "/page/102/": "Ответственные лица(магистратура)"
    };

    return (
        <div className="links">
            <div className="side left">
                {years.map(year => Link(PDFs[year].default, `Списки ВСЕРОСа ${year}`, year))}
            </div>
            <div className="side right">
                {Object.keys(links).map(href => Link(abit + href, links[href]))}
            </div>
        </div>
    );
}

export default Links;