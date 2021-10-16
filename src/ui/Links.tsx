import PDFs from "../files/PDFs";

function Link(href: string, text: string, key = href) {
    return (
        <p key={key}><a href={href}>{text}</a></p>
    );
}

function Links() {
    const years = Object.keys(PDFs).reverse();
    const abit = "https://abit.itmo.ru";
    const links = [
        { href: "/file/pages/82/rsosh_2021_bvi.pdf", name: "РСОШ 2021, дающие БВИ" },
        { href: "/file/pages/82/100ballov_2021.pdf", name: "РСОШ 2021, дающие 100 баллов" },
        { href: "/file/pages/82/vosh_2021.pdf", name: "ВСОШ(предметы и направления)" },
        { href: "/page/101/", name: "Ответственные лица(бакалавриат)" },
        { href: "/page/102/", name: "Ответственные лица(магистратура)" }
    ];

    return (
        <div className="links">
            <div className="side left">
                {years.map(year => Link(PDFs[year], `Списки ВСЕРОСа ${year}`, year))}
            </div>
            <div className="side right">
                {links.map(({ href, name }) => Link(abit + href, name))}
            </div>
        </div>
    );
}

export default Links;