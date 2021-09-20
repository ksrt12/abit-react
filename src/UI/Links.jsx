import pdf2021 from "../files/2021.pdf";
import pdf2020 from "../files/2020.pdf";
import pdf2019 from "../files/2019.pdf";
import pdf2018 from "../files/2018.pdf";

function Links() {
    return (
        <div className="links">
            <div className="side left">
                <p><a href={pdf2021}>Списки ВСЕРОСа 2021</a></p>
                <p><a href={pdf2020}>Списки ВСЕРОСа 2020</a></p>
                <p><a href={pdf2019}>Списки ВСЕРОСа 2019</a></p>
                <p><a href={pdf2018}>Списки ВСЕРОСа 2018</a></p>
            </div>
            <div className="side right">
                <p><a href="https://abit.itmo.ru/file/pages/82/rsosh_2021_bvi.pdf">РСОШ 2021, дающие БВИ</a></p>
                <p><a href="https://abit.itmo.ru/file/pages/82/100ballov_2021.pdf">РСОШ 2021, дающие 100 баллов</a></p>
                <p><a href="https://abit.itmo.ru/file/pages/82/vosh_2021.pdf">ВСОШ (предметы и направления)</a></p>
                <p><a href="https://abit.ifmo.ru/page/101/">Ответственные лица (бакалавриат)</a></p>
                <p><a href="https://abit.ifmo.ru/page/102/">Ответственные лица (магистратура)</a></p>
            </div>
        </div>
    );
}

export default Links;