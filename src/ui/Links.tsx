/** Generate link */
function Link(href: string, text: string) {
    return (
        <p key={href}><a href={href}>{text}</a></p>
    );
}

/** Make links */
function Links() {
    const abit = "https://abit.itmo.ru";
    const links = [
        { href: "/file/pages/82/rsosh_2022_bvi.pdf", name: "РСОШ 2022, дающие БВИ" },
        { href: "/file/pages/82/100ballov_2022.pdf", name: "РСОШ 2022, дающие 100 баллов" },
        { href: "/file/pages/82/vosh_2022.pdf", name: "ВСОШ (предметы и направления)" },
        { href: "/page/101/", name: "Ответственные лица(бакалавриат)" },
        { href: "/page/102/", name: "Ответственные лица(магистратура)" }
    ];

    const years = [2018, 2019, 2020, 2021];

    return (
        <div className="links">
            <div className="side left">
                {years.map(year => Link(`/files/${year}.pdf`, `Списки ВСЕРОСа ${year}`))}
            </div>
            <div className="side right">
                {links.map(({ href, name }) => Link(abit + href, name))}
            </div>
        </div>
    );
}

export default Links;