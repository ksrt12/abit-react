import { bvi, sto, ia, itin, wtf, confPoints } from "./constants";
import { olympSubjBy, ids, fromWLS } from "./constants";
import { setPointsColor } from "./colors";
import { EGE, yesconf, nonconf } from "./diploma";
import { IOlymp } from "./search";

/** Check current olymp status by params */
function checkBVI(stream: string, { lvl, dip, subj, name }: IOlymp) {
    let status: string;

    const ch75 = checkConf(stream, subj);
    const bvi_wtf = (local_lvl: number) => (lvl === local_lvl) ? bvi : ia;
    const bvi_sto = (local_lvl: number) => (lvl <= local_lvl) ? bvi : sto;
    const lvldip1 = (local_lvl: number) => (lvl <= local_lvl && dip === 1) ? bvi : sto;

    if (subj === 'русский язык') {
        return (ch75 === yesconf) ? sto : wtf;
    }
    if (ch75 === wtf) {
        // break now if olymp profile is false
        return wtf;
    }

    switch (stream) {
        case '01.03.02':
            switch (subj) {
                case 'информатика':
                    switch (name) {
                        case 'Олимпиада школьников "Ломоносов"':
                        case 'Всесибирская открытая олимпиада школьников':
                        case 'Олимпиада Университета Иннополис "Innopolis Open"':
                        case 'Вузовско-академическая олимпиада по информатике':
                            status = bvi_sto(2);
                            break;
                        case 'Московская олимпиада школьников':
                        case 'Олимпиада школьников по информатике и программированию':
                        case 'Олимпиада школьников по программированию "ТехноКубок"':
                        case 'Олимпиада школьников Санкт-Петербургского государственного университета':
                        case 'Олимпиада школьников СПбГУ':
                        case 'Открытая олимпиада школьников':
                        case 'Открытая олимпиада школьников по программированию':
                        case 'Всероссийская олимпиада школьников "Высшая проба"':
                            status = bvi_sto(1);
                            break;
                        default:
                            status = sto;
                    }
                    break;
                case 'информатика и икт':
                    status = lvldip1(2);
                    break;
                case 'программирование':
                    switch (name) {
                        case 'Олимпиада школьников "Шаг в будущее"':
                            status = lvldip1(2);
                            break;
                        case 'Вузовско-академическая олимпиада по программированию на Урале':
                            status = lvldip1(3);
                            break;
                        default:
                            status = sto;
                    }
                    break;
                case 'математика':
                    switch (name) {
                        // case 'Межрегиональная олимпиада школьников "Высшая проба"':
                        case 'Всероссийская олимпиада школьников "Высшая проба"':
                        case 'Московская олимпиада школьников':
                        case 'Олимпиада школьников "Ломоносов"':
                        case 'Олимпиада школьников Санкт-Петербургского государственного университета':
                        case 'Санкт-Петербургская олимпиада школьников':
                        case 'Турнир городов':
                            status = bvi_sto(1);
                            break;
                        case 'Олимпиада школьников "Покори Воробьѐвы горы!"':
                        case 'Олимпиада школьников "Покори Воробьёвы горы!"':
                            status = lvldip1(1);;
                            break;
                        case 'Всесибирская открытая олимпиада школьников':
                        case 'Межрегиональная олимпиада школьников им. И.Я.Верченко':
                        case 'Межрегиональная олимпиада школьников на базе ведомственных образовательных организаций':
                        case 'Объединённая межвузовская математическая олимпиада школьников':
                        case 'Объединённая международная математическая олимпиада "Формула Единства" / "Третье тысячелетие"':
                        case 'Олимпиада Курчатов':
                        case 'Олимпиада школьников "Физтех"':
                        case 'Олимпиада Юношеской математической школы':
                        case 'Отраслевая физико-математическая олимпиада школьников "Росатом"':
                            // case 'Олимпиада "Росатом"':
                            status = lvldip1(2);
                            break;
                        // case 'Турнир Ломоносова':
                        case 'Турнир имени М.В. Ломоносова':
                            status = bvi_sto(2);
                            break;
                        case 'Открытая олимпиада школьников':
                        case 'Межрегиональная олимпиада школьников по математике "САММАТ"':
                            // case 'Многопрофильная олимпиада школьников Уральского федерального университета "Изумруд"':
                            // case 'Олимпиада Университета Иннополис "Innopolis Open"':
                            status = lvldip1(3);
                            break;
                        default:
                            status = sto;
                    }
                    break;
                case 'большие данные и машинное обучение':
                    status = lvldip1(2);
                    break;
                // case 'информационные технологии':
                // case 'информационные и коммуникационные технологии':
                // case 'умный город':
                case 'искусственный интеллект':
                case 'информационная безопасность':
                case 'нейротехнологии и когнитивные науки':
                    status = sto;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '09.03.02':
            switch (subj) {
                case 'информатика':
                    status = bvi_sto(2);
                    break;
                case 'программирование':
                case 'искусственный интеллект':
                    status = lvldip1(3);
                    break;
                case 'математика':
                    status = (lvl === 3) ? (name === 'Открытая олимпиада школьников') ? bvi : sto : bvi;
                    break;
                case 'большие данные и машинное обучение':
                    status = bvi_sto(2);
                    break;
                // case 'информационные и коммуникационные технологии':
                // case 'умный город':
                // case 'информационные технологии':
                case 'информационная безопасность':
                case 'нейротехнологии и когнитивные науки':
                case 'информатика и икт':
                    status = sto;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '45.03.04':
            switch (subj) {
                case 'информатика':
                case 'математика':
                case 'программирование':
                case 'информатика и икт':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'большие данные и машинное обучение':
                case 'умный город':
                case 'иностранный язык':
                case 'иностранные языки':
                case 'китайский язык':
                case 'восточные языки':
                case 'лингвистика':
                    status = bvi;
                    break;
                // case 'информационные технологии':
                //     status = bvi_wtf(1);
                //     break;
                default:
                    status = wtf;
            }
            break;
        case '09.03.01':
        case '09.03.03':
        case '09.03.04':
        case '10.03.01':
        case '11.03.02':
        case '11.03.03':
        case '12.03.01':
        case '13.03.02':
        case '15.03.04':
        case '15.03.06':
        case '23.03.03':
        case '24.03.02':
        case '27.03.04':
            switch (subj) {
                // case 'информационные технологии':
                //     status = bvi_wtf(1);
                //     break;
                case 'информатика':
                case 'математика':
                case 'программирование':
                case 'программная инженерия финансовых технологий':
                case 'аэрокосмические системы':
                case 'интеллектуальные робототехнические системы':
                case 'беспилотные авиационные системы':
                case 'технологии беспроводной связи':
                case 'интеллектуальные энергетические системы':
                case 'искусственный интеллект':
                case 'информационная безопасность':
                case 'анализ космических снимков и геопространственных данных':
                case 'водные робототехнические системы':
                case 'нейротехнологии и когнитивные науки':
                case 'передовые производственные технологии':
                case 'спутниковые системы':
                case 'автономные транспортные системы':
                case 'летающая робототехника':
                    // case 'компьютерная безопасность':
                    // case 'нейротехнологии':
                    // case 'робототехника':
                    // case 'компьютерное моделирование и графика':
                    // case 'инженерные системы':
                    // case 'инженерные науки':
                    // case 'информационные и коммуникационные технологии':
                    status = bvi;
                    break;
                // case 'разработка приложений виртуальной и дополненной реальности':
                // case 'электроника и вычислительная техника':
                // case 'инженерное дело':
                case 'автоматизация бизнес-процессов':
                case 'умный город':
                case 'большие данные и машинное обучение':
                    status = bvi_sto(2);
                    break;
                case 'информатика и икт':
                    status = bvi_wtf(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '44.03.04':
            switch (subj) {
                // case 'информационные технологии':
                //     status = bvi_wtf(1);
                //     break;
                case 'математика':
                case 'информатика':
                case 'программирование':
                case 'информатика и икт':
                case 'информационные и коммуникационные технологии':
                case 'нейротехнологии и когнитивные науки':
                case 'компьютерное моделирование и графика':
                case 'разработка приложений виртуальной и дополненной реальности':
                case 'дизайн':
                case 'искусство, черчение':
                case 'графический дизайн':
                case 'рисунок или технический рисунок и декоративная композиция':
                case 'графика':
                case 'академический рисунок, живопись, композиция, история искусства и культуры':
                    // case 'искусственный интеллект':
                    // case 'нейротехнологии':
                    // case 'программная инженерия финансовых технологий':
                    status = bvi;
                    break;
                // case 'рисунок, живопись, скульптура, дизайн':
                //     status = bvi_wtf(1);
                //     break;
                // case 'рисунок':
                // case 'архитектура, изобразительные и прикладные виды искусств':
                // case 'автоматизация бизнес-процессов':
                // case 'электроника и вычислительная техника':
                // case 'большие данные и машинное обучение':
                //     status = bvi_wtf(2);
                //     break;
                default:
                    status = wtf;
            }
            break;
        case '12.03.02':
        case '12.03.03':
        case '12.03.05':
        case '13.03.01':
        case '16.03.03':
            switch (subj) {
                // case 'информационные технологии':
                //     status = bvi_wtf(1);
                //     break;
                // case 'информационные и коммуникационные технологии':
                // case 'системы связи и дистанционного зондирования земли':
                // case 'технологии беспроводной связи':
                // case 'нанотехнологии':
                // case 'анализ космических снимков и геопространственных данных':
                // case 'аэрокосмические системы':
                case 'информатика':
                case 'математика':
                case 'техника и технологии':
                case 'естественные науки':
                case 'инженерное дело':
                case 'инженерные науки':
                case 'инженерные системы':
                case 'ядерные технологии':
                case 'астрономия':
                case 'астрономия и науки о земле':
                case 'физика':
                case 'наносистемы и наноинженерия':
                case 'передовые производственные технологии':
                case 'комплекс предметов (физика, информатика, математика)':
                case 'предпрофессиональная':
                    status = bvi;
                    break;
                // case 'программирование':
                // case 'электроника и вычислительная техника':
                // case 'космонавтика':
                case 'информатика и икт':
                    status = bvi_wtf(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '16.03.01':
            switch (subj) {
                case 'математика':
                case 'астрономия':
                case 'астрономия и науки о земле':
                case 'физика':
                case 'естественные науки':
                case 'инженерное дело':
                case 'инженерные науки':
                case 'инженерные системы':
                case 'наносистемы и наноинженерия':
                case 'нанотехнологии':
                    // case 'системы связи и дистанционного зондирования земли':
                    // case 'ядерные технологии':
                    // case 'технологии беспроводной связи':
                    // case 'анализ космических снимков и геопространственных данных':
                    // case 'техника и технологии':
                    // case 'аэрокосмические системы':
                    // case 'комплекс предметов (физика, информатика, математика)':
                    // case 'робототехника':
                    // case 'нейротехнологии':
                    status = bvi;
                    break;
                // case 'передовые производственные технологии':
                // case 'космонавтика':
                // case 'нейротехнологии и когнитивные науки':
                //     status = bvi_wtf(2);
                //     break;
                default:
                    status = wtf;
            }
            break;
        case '05.03.06':
        case '12.03.04':
        case '18.03.01':
        case '18.03.02':
        case '19.03.01':
            switch (subj) {
                case 'математика':
                case 'нанотехнологии':
                case 'естественные науки':
                case 'химия':
                case 'инженерные биологические системы':
                case 'инженерные биологические системы: агробиотехнологии':
                case 'биология':
                case 'наносистемы и наноинженерия':
                case 'техника и технологии':
                case 'генетика':
                case 'геномное редактирование':
                case 'экология':
                    status = bvi;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '27.03.05':
        case '38.03.05':
            switch (subj) {
                // case 'информационные технологии':
                //     status = bvi_wtf(1);
                //     break;
                case 'математика':
                case 'информатика':
                case 'иностранный язык':
                case 'иностранные языки':
                case 'китайский язык':
                case 'восточные языки':
                case 'лингвистика':
                case 'экономика':
                case 'обществознание':
                case 'социология':
                case 'гуманитарные и социальные науки':
                case 'финансовая грамотность':
                case 'естественные науки':
                case 'автоматизация бизнес-процессов':
                case 'право':
                    status = bvi;
                    break;
                default:
                    status = wtf;
            }
            break;
        default:
            status = wtf;
    }

    if (status !== wtf) {
        status += ch75;
    }

    return status;
}

/** Check olymp confirmation by subject profile points */
function checkConfNum(currSubj: string, multiSubjs?: { [key: string]: string[]; }, stream?: string) {
    const currEge = EGE[currSubj];
    const proof = (stream) ? multiSubjs![currSubj].includes(stream) : true;
    const conf = currEge >= confPoints;
    if (!fromWLS) {
        setPointsColor(ids[currSubj], proof, Boolean(currEge) === false, conf);
    }
    return proof && conf;
}

/** Check olymp confirmation by stream and subject profile */
function checkConf(stream: string, olympProfile: string) {
    let stat = false;
    const confSubj = olympSubjBy[olympProfile];
    switch (typeof confSubj) {
        case 'undefined':
            return itin;
        case 'boolean':
            return wtf;
        case 'object':
            for (const i of Object.keys(confSubj)) {
                stat = checkConfNum(i, confSubj, stream);
                if (stat) {
                    break;
                }
            }
            break;
        case 'string':
            stat = checkConfNum(confSubj);
            break;
        default:
            alert("Ну параша, девки!");
    }
    return (stat) ? yesconf : nonconf;
}

export { checkBVI };