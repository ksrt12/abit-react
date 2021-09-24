import { bvi, sto, ia, itin, wtf, conf_points } from "./constants";
import { olympSubjBy, subjects, ids, fromWLS } from "./constants";
import { setPinkColor } from "./colors";
import { EGE, yesconf, nonconf } from "./diploma";

function checkBVI(stream: string, grad_in: string, subj_in: string, name_in: string, lvl_in: string | number, dip_in: string | number) {
    let status: string;
    const
        grad = Number(grad_in),
        lvl = Number(lvl_in),
        dip = Number(dip_in),
        subj = subj_in,
        name = name_in;

    const ch75 = checkConf(stream, subj);
    const bviORia = (local_lvl: number) => (lvl === local_lvl) ? bvi : ia;
    const lvldip1 = (local_lvl: number) => (lvl === local_lvl && dip === 1) ? bvi : sto;

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
                        case 'Московская олимпиада школьников':
                        case 'Всесибирская открытая олимпиада школьников':
                        case 'Олимпиада школьников "Ломоносов"':
                        case 'Олимпиада школьников по информатике и программированию':
                        case 'Олимпиада школьников по программированию "ТехноКубок"':
                        case 'Олимпиада школьников Санкт-Петербургского государственного университета':
                        case 'Олимпиада школьников СПбГУ':
                        case 'Открытая олимпиада школьников по программированию':
                        case 'Межрегиональная олимпиада школьников "Высшая проба"':
                        case 'Всероссийская олимпиада школьников "Высшая проба"':
                            status = (lvl === 1) ? bvi : sto;
                            break;
                        case 'Открытая олимпиада школьников':
                            status = (lvl === 1) ? (grad === 11 || (grad === 10 && dip === 1)) ? bvi : sto : sto;
                            break;
                        case 'Олимпиада Университета Иннополис "Innopolis Open"':
                            status = (lvl === 3) ? sto : bvi;
                            break;
                        default:
                            status = sto;
                    }
                    break;
                case 'информатика и икт':
                    status = (lvl === 2) ? bvi : sto;
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
                        case 'Межрегиональная олимпиада школьников "Высшая проба"':
                        case 'Всероссийская олимпиада школьников "Высшая проба"':
                        case 'Московская олимпиада школьников':
                        case 'Олимпиада школьников Санкт-Петербургского государственного университета':
                        case 'Санкт-Петербургская олимпиада школьников':
                        case 'Турнир городов':
                            status = (lvl === 1) ? bvi : sto;
                            break;
                        case 'Олимпиада школьников "Ломоносов"':
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
                        case 'Отраслевая физико-математическая олимпиада школьников "Росатом"':
                        case 'Олимпиада "Росатом"':
                            status = lvldip1(2);
                            break;
                        case 'Олимпиада Юношеской математической школы':
                        case 'Турнир Ломоносова':
                        case 'Турнир имени М.В. Ломоносова':
                            status = (lvl === 2) ? bvi : sto;
                            break;
                        case 'Открытая олимпиада школьников':
                        case 'Межрегиональная олимпиада школьников по математике "САММАТ"':
                        case 'Многопрофильная олимпиада школьников Уральского федерального университета "Изумруд"':
                        case 'Олимпиада Университета Иннополис "Innopolis Open"':
                            status = lvldip1(3);
                            break;
                        default:
                            status = sto;
                    }
                    break;
                case 'большие данные и машинное обучение':
                case 'информационные технологии':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'умный город':
                    status = sto;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '09.03.02':
            if (grad === 11) {
                switch (subj) {
                    case 'информатика':
                        status = (lvl === 3) ? sto : bvi;
                        break;
                    case 'программирование':
                        status = lvldip1(2);
                        break;
                    case 'математика':
                        status = (lvl === 3) ? (name === 'Открытая олимпиада школьников') ? bvi : sto : bvi;
                        break;
                    case 'большие данные и машинное обучение':
                    case 'информационные и коммуникационные технологии':
                    case 'искусственный интеллект':
                    case 'умный город':
                    case 'информатика и икт':
                    case 'информационные технологии':
                        status = sto;
                        break;
                    default:
                        status = wtf;
                }
            } else {
                switch (subj) {
                    case 'информатика':
                    case 'программирование':
                    case 'математика':
                    case 'большие данные и машинное обучение':
                    case 'информационные и коммуникационные технологии':
                    case 'искусственный интеллект':
                    case 'умный город':
                    case 'информатика и икт':
                    case 'информационные технологии':
                        status = sto;
                        break;
                    default:
                        status = wtf;
                }
            }
            break;
        case '09.03.03':
            switch (subj) {
                case 'информатика':
                case 'математика':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'умный город':
                    status = bvi;
                    break;
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'большие данные и машинное обучение':
                    status = bviORia(2);
                    break;
                case 'информатика и икт':
                case 'программирование':
                    status = (lvl === 2) ? bvi : sto;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '11.03.02':
            switch (subj) {
                case 'информатика':
                case 'математика':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'умный город':
                case 'спутниковые системы':
                    status = bvi;
                    break;
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'большие данные и машинное обучение':
                    status = bviORia(2);
                    break;
                case 'информатика и икт':
                case 'программирование':
                case 'технологии беспроводной связи':
                    status = (lvl === 2) ? bvi : sto;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '45.03.04':
            switch (subj) {
                case 'информатика':
                case 'математика':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'умный город':
                case 'иностранный язык':
                case 'иностранные языки':
                case 'китайский язык':
                case 'восточные языки':
                case 'лингвистика':
                    status = bvi;
                    break;
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'большие данные и машинное обучение':
                case 'информатика и икт':
                case 'программирование':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '09.03.01':
        case '09.03.04':
        case '10.03.01':
        case '11.03.03':
        case '12.03.01':
        case '13.03.02':
        case '15.03.04':
        case '15.03.06':
        case '23.03.03':
        case '24.03.02':
        case '27.03.04':
            switch (subj) {
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'математика':
                case 'информатика':
                case 'компьютерная безопасность':
                case 'информационная безопасность':
                case 'автономные транспортные системы':
                case 'аэрокосмические системы':
                case 'интеллектуальные энергетические системы':
                case 'нейротехнологии':
                case 'программная инженерия финансовых технологий':
                case 'робототехника':
                case 'летающая робототехника':
                case 'компьютерное моделирование и графика':
                case 'спутниковые системы':
                case 'инженерные системы':
                case 'инженерные науки':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'программирование':
                    status = bvi;
                    break;
                case 'разработка приложений виртуальной и дополненной реальности':
                case 'нейротехнологии и когнитивные науки':
                case 'водные робототехнические системы':
                case 'беспилотные авиационные системы':
                case 'электроника и вычислительная техника':
                case 'инженерное дело':
                case 'большие данные и машинное обучение':
                case 'информатика и икт':
                    status = bviORia(2);
                    break;
                case 'интеллектуальные робототехнические системы':
                    status = (lvl === 3) ? ia : bvi;
                    break;
                default:
                    status = wtf;
            }
            break;
        case '44.03.04':
            switch (subj) {
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'математика':
                case 'информатика':
                case 'информационные и коммуникационные технологии':
                case 'искусственный интеллект':
                case 'нейротехнологии':
                case 'программная инженерия финансовых технологий':
                case 'компьютерное моделирование и графика':
                    status = bvi;
                    break;
                case 'технический рисунок и декоративная композиция':
                case 'академический рисунок, живопись, композиция, история искусства и культуры':
                case 'рисунок, живопись, скульптура, дизайн':
                case 'дизайн':
                    status = bviORia(1);
                    break;
                case 'искусство, черчение':
                case 'графический дизайн':
                case 'рисунок':
                case 'графика':
                case 'архитектура, изобразительные и прикладные виды искусств':
                case 'автоматизация бизнес-процессов':
                case 'разработка приложений виртуальной и дополненной реальности':
                case 'нейротехнологии и когнитивные науки':
                case 'электроника и вычислительная техника':
                case 'большие данные и машинное обучение':
                case 'информатика и икт':
                case 'программирование':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '12.03.02':
        case '12.03.03':
        case '12.03.05':
            switch (subj) {
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
                case 'информатика':
                case 'математика':
                case 'информационные и коммуникационные технологии':
                case 'техника и технологии':
                case 'естественные науки':
                case 'инженерное дело':
                case 'инженерные науки':
                case 'инженерные системы':
                case 'системы связи и дистанционного зондирования земли':
                case 'ядерные технологии':
                case 'технологии беспроводной связи':
                case 'нанотехнологии':
                case 'анализ космических снимков и геопространственных данных':
                case 'астрономия':
                case 'астрономия и науки о земле':
                case 'физика':
                case 'аэрокосмические системы':
                case 'комплекс предметов (физика, информатика, математика)':
                    status = bvi;
                    break;
                case 'программирование':
                case 'информатика и икт':
                case 'электроника и вычислительная техника':
                case 'наносистемы и наноинженерия':
                case 'передовые производственные технологии':
                case 'космонавтика':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '13.03.01':
            status = wtf;
            break;
        case '16.03.01':
        case '16.03.03':
            switch (subj) {
                case 'математика':
                case 'техника и технологии':
                case 'естественные науки':
                case 'инженерное дело':
                case 'инженерные науки':
                case 'инженерные системы':
                case 'системы связи и дистанционного зондирования земли':
                case 'ядерные технологии':
                case 'технологии беспроводной связи':
                case 'нанотехнологии':
                case 'анализ космических снимков и геопространственных данных':
                case 'астрономия':
                case 'астрономия и науки о земле':
                case 'физика':
                case 'аэрокосмические системы':
                case 'комплекс предметов (физика, информатика, математика)':
                case 'робототехника':
                case 'нейротехнологии':
                    status = bvi;
                    break;
                case 'наносистемы и наноинженерия':
                case 'передовые производственные технологии':
                case 'космонавтика':
                case 'нейротехнологии и когнитивные науки':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '12.03.04':
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
                case 'техника и технологии':
                    status = bvi;
                    break;
                case 'наносистемы и наноинженерия':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '18.03.01':
            switch (subj) {
                case 'математика':
                    status = sto;
                    break;
                case 'нанотехнологии':
                case 'естественные науки':
                case 'химия':
                    status = bvi;
                    break;
                case 'наносистемы и наноинженерия':
                    status = bviORia(2);
                    break;
                default:
                    status = wtf;
            }
            break;
        case '27.03.05':
        case '38.03.05':
            switch (subj) {
                case 'информационные технологии':
                    status = bviORia(1);
                    break;
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

function getIdBySubj(subj: string) {
    return ids.filter(id => subjects[id] === subj).toString();
}

function checkConfNum(stream: string, curr_subj: string, curr_profile?: string) {
    let proof = true;
    const conf = EGE[curr_subj] >= conf_points;

    if (curr_profile) {
        proof = olympSubjBy[curr_profile][curr_subj].includes(stream);
    }
    if (!fromWLS) {
        setPinkColor(getIdBySubj(curr_subj), Boolean(EGE[curr_subj]) === false, conf);
    }
    return Number(proof && conf);
}

function checkConf(stream: string, olymp_profile: string) {
    let stat = 0;
    const conf_subj = olympSubjBy[olymp_profile];
    switch (typeof conf_subj) {
        case 'undefined':
            return itin;
        case 'boolean':
            return wtf;
        case 'object':
            for (const i of Object.keys(conf_subj)) {
                stat += checkConfNum(stream, i, olymp_profile);
            }
            break;
        case 'string':
            stat = checkConfNum(stream, conf_subj);
            break;
        default:
            alert("Ну параша, девки!");
    }
    return (stat > 0) ? yesconf : nonconf;
}

export { checkBVI };