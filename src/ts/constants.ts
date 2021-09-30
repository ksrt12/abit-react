export const subjects: { [key: string]: string; } = {
    'm': 'математика',
    'r': 'русский язык',
    'i': 'информатика',
    'f': 'физика',
    'e': 'иностранный язык',
    'o': 'обществознание',
    'c': 'химия',
    'b': 'биология'
},
    ids = Object.keys(subjects),
    ia = 'ИД',
    bvi = 'БВИ',
    sto = '100',
    wtf = '—',
    itin = 'спросить у Итина',
    confPoints = 75,
    physics = ['12.03.02', '12.03.03', '12.03.05', '16.03.01', '16.03.03'],
    chemistry = ['12.03.04', '18.03.01', '18.03.02', '19.03.01'],
    social = ['27.03.05', '38.03.05'],
    informatics = ['09.03.01', '09.03.04', '10.03.01', '11.03.03', '12.03.01',
        '13.03.02', '15.03.04', '15.03.06', '23.03.03', '24.03.02', '27.03.04'],
    olympSubjBy: { [key: string]: any; } = {
        'автоматизация бизнес-процессов': {
            'информатика': ['44.03.04'],
            'обществознание': social
        },
        'автономные транспортные системы': 'информатика',
        'академический рисунок, живопись, композиция, история искусства и культуры': 'информатика',
        'анализ космических снимков и геопространственных данных': 'физика',
        'английский язык': false, // рсош 2021
        'архитектура, изобразительные и прикладные виды искусств': 'информатика',
        'астрономия и науки о земле': 'физика',
        'астрономия': 'физика',
        'аэрокосмические системы': 'информатика',
        'беспилотные авиационные системы': 'информатика',
        'биология': 'биология',
        'водные робототехнические системы': 'информатика',
        'восточные языки': 'иностранный язык',
        'графика': 'информатика',
        'графический дизайн': 'информатика',
        'гуманитарные и социальные науки': 'обществознание',
        'дизайн': 'информатика',
        'естественные науки': {
            'химия': chemistry,
            'физика': physics,
            'обществознание': social
        },
        'журналистика': false,
        'инженерное дело': {
            'физика': physics,
            'информатика': informatics
        },
        'инженерные биологические системы: агробиотехнологии': 'биология',
        'инженерные биологические системы': 'биология',
        'инженерные науки': {
            'физика': physics,
            'информатика': informatics
        },
        'инженерные системы': {
            'физика': physics,
            'информатика': informatics
        },
        'иностранные языки': 'иностранный язык',
        'иностранный язык': 'иностранный язык',
        'интеллектуальные робототехнические системы': 'информатика',
        'интеллектуальные энергетические системы': 'информатика',
        'информатика': 'информатика',
        'информационная безопасность': 'информатика',
        'информационные и коммуникационные технологии': 'информатика',
        'информационные технологии': 'информатика',
        'искусственный интеллект': 'информатика',
        'искусство, черчение': 'информатика',
        'китайский язык': 'иностранный язык',
        'комплекс предметов (физика, информатика, математика)': 'физика',
        'компьютерная безопасность': 'информатика',
        'компьютерное моделирование и графика': 'информатика',
        'космонавтика': 'физика',
        'криптография': 'математика',
        'летающая робототехника': 'информатика',
        'лингвистика': 'иностранный язык',
        'математика': 'математика',
        'медицина': 'биология',
        'механика и математическое моделирование': 'физика',
        'наносистемы и наноинженерия': {
            'физика': physics,
            'химия': chemistry
        },
        'нанотехнологии': {
            'физика': physics,
            'химия': chemistry
        },
        'нейротехнологии и когнитивные науки': 'информатика',
        'нейротехнологии': 'информатика',
        'обществознание': 'обществознание',
        'педагогические науки и образование': false,
        'передовые производственные технологии': 'информатика',
        'политология': 'обществознание',
        'программирование': 'информатика',
        'предпрофессиональная': false,
        'программная инженерия финансовых технологий': 'информатика',
        'разработка приложений виртуальной и дополненной реальности': 'информатика',
        'рисунок, живопись, скульптура, дизайн': 'информатика',
        'рисунок': 'информатика',
        'робототехника': 'информатика',
        'русский язык': 'русский язык',
        'системы связи и дистанционного зондирования земли': 'информатика',
        'социология': 'обществознание',
        'спутниковые системы': 'информатика',
        'техника и технологии': 'физика',
        'технический рисунок и декоративная композиция': 'информатика',
        'технологии беспроводной связи': 'информатика',
        'умный город': 'информатика',
        'физика': 'физика',
        'филология': false,
        'финансовая грамотность': 'обществознание',
        'химия': 'химия',
        'экономика': 'обществознание',
        'электроника и вычислительная техника': 'информатика',
        'электронная инженерия: умный дом': 'информатика',
        'ядерные технологии': 'физика'
    },
    RSROLYMP = 'https://diploma.rsr-olymp.ru/files/rsosh-diplomas-static/compiled-storage-',
    WLS = window.location.search,
    fromWLS = WLS.includes('LN=');