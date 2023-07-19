import { FC } from "react";

type TLink = {
  href: string;
  name: string;
};

const links: TLink[] = [
  { href: "/file/pages/82/rsosh_2023_bvi.pdf", name: "РСОШ 2023, дающие БВИ" },
  { href: "/file/pages/82/100ballov_2023.pdf", name: "РСОШ 2023, дающие 100 баллов" },
  { href: "/file/pages/82/vosh_2023.pdf", name: "ВСОШ (предметы и направления)" },
  { href: "/contacts", name: "Ответственные лица (бакалавриат)" },
  { href: "/contacts", name: "Ответственные лица (магистратура)" },
];
const abit = "https://abit.itmo.ru";

const years = [2018, 2019, 2020, 2021];

/** Generate link */
const Link: FC<TLink> = ({ href, name }) => <p key={href}><a href={href}>{name}</a></p>;

/** Make links */
export const Links: FC = () => (
  <div className="links">
    <div className="side left">
      {years.map(year => Link({ href: `/files/${year}.pdf`, name: `Списки ВСЕРОСа ${year}` }))}
    </div>
    <div className="side right">
      {links.map(({ href, name }) => Link({ href: abit + href, name }))}
    </div>
  </div>
);

