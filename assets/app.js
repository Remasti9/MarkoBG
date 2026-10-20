(() => {
'use strict';
const CONFIG = {
  supabaseUrl: 'https://shyztfqmtdeaypxdglnn.supabase.co',
  supabaseKey: 'sb_publishable_uJbb69mVtnOhPihP2FYNsA_PtBjunsL',
  googleKey: 'AIzaSyCAZurB29jd3br63FG4l7YZW_P1r038HvE',
  placeId: 'ChIJh9O5UJ57WkcRpyjV8zggx-U',
  phone: '+381654343363',
  leadStatus: 'Novo',
  storageKey: 'ps.calc.v4',
  simMs: 1500
};
const DEFAULT_RULES = {
  kombi_start: 3000, kamion_start: 6000,
  kombi_km: 70, kamion_km: 110,
  kombi_m3: 15, kamion_m3: 30,
  cena_m3: 1300,
  min_selidba: 10000, min_kombi: 6000,
  sprat_bez_lifta: [0, 10, 20, 30, 40, 50, 60],
  sprat_sa_liftom: [0, 0, 10, 15, 15, 20, 20],
  kutija_rad: 400, kutija_troslojna: 240, kutija_petoslojna: 300, kutija_garderober: 1500,
  zastita: 500,
  teski: { pianino: [12000, 3000], tapec: [6000, 2000], sef: [12000, 3000] },
  montaza: {
    orman1: [2000, 1500], orman2: [3000, 1500], orman3: [4500, 2000],
    klizni: [6500, 4500], stakleni: [8000, 6000],
    sto: [2500, 1500], krevet: [2500, 1500], ugaona: [3000, 1500],
    luster: [1500, 1500], krevetac: [2000, 1500]
  },
  zaokruzi: 100
};
const HTML_LANG = (document.documentElement.lang || 'sr').toLowerCase();
const LANG = HTML_LANG.startsWith('ru') ? 'ru' : HTML_LANG.startsWith('en') ? 'en' : 'sr';
const LOCALE = { sr: 'sr-Latn-RS', en: 'en-GB', ru: 'ru-RU' }[LANG];
const MAPS_LANG = { sr: 'sr-Latn', en: 'en', ru: 'ru' }[LANG];
const TXT = {
  sr: {
    modes: { selidba: ['Selidba sa ekipom', 'Nošenje, prevoz, montaža i pakovanje po želji'], kombi: ['Samo kombi sa vozačem', 'Prevoz bez nošenja – vi utovarate i istovarate'] },
    types: { stan: 'Stan', kuca: 'Kuća', kancelarija: 'Kancelarija' },
    typeSubs: { stan: 'Stambena zgrada', kuca: 'Porodična kuća', kancelarija: 'Poslovni prostor' },
    sizes: { garsonjera: 'Garsonjera', jednosoban: 'Jednosoban', dvosoban: 'Dvosoban', trosoban: 'Trosoban', cetvorosoban: '4+ soban', office: 'Kancelarija' },
    cats: { dnevna: 'Dnevna soba', spavaca: 'Spavaća i radna', kuhinja: 'Kuhinja i tehnika', ostalo: 'Kutije i teški tereti' },
    dem: 'Demontaža', mon: 'Montaža', special: 'Posebno',
    floors: ['Prizemlje', '1. sprat', '2. sprat', '3. sprat', '4. sprat', '5. sprat', '6. sprat', '7. sprat i više'],
    yes: 'Da', no: 'Ne',
    pkg: { sami: ['Pakujete sami', 'Vi pakujete kutije, mi nosimo i vozimo.'], mi: ['Mi pakujemo', 'Rad po kutiji + materijal (kutije).'] },
    boxTypes: { troslojna: 'Troslojne kutije', petoslojna: 'Petoslojne kutije' },
    vehicles: { kombi: 'Kombi', kamion: 'Kamion' },
    volume: 'Zapremina', items: 'Komada', route: 'Ruta',
    cargoEmpty: 'Kliknite na stvari u inventaru – pojaviće se ovde u vozilu.',
    cargoFill: (v, p) => `Popunjenost vozila (${v}): ${p}%`,
    cargoTrips: n => `Veliki tovar – verovatno ${n} ture kamionom. Potvrdićemo telefonom.`,
    toTruck: 'Tovar je veći od kapaciteta kombija – prelazimo na kamion.',
    toVan: 'Sve staje u kombi.',
    check: { space: 'Izaberite veličinu prostora', items: 'Dodajte stvari u inventar', route: 'Izračunajte udaljenost rute' },
    checkItems: (n, v, veh) => `${n} komada · ${v} · ${veh}`,
    checkRoute: (km, a, b) => `Ruta ${km} · utovar: ${a}, istovar: ${b}`,
    floorShort: (f, lift) => f === 0 ? 'prizemlje' : `${f >= 7 ? '7+' : f}. sprat${lift ? ', lift' : ' bez lifta'}`,
    stageIdle: 'Unesite obe adrese i pustite slona na put.',
    stageLoading: 'Računam udaljenost preko Google mapa…',
    stageMin: 'min vožnje', google: 'Google mape', approx: 'ručno',
    addrNeed: 'Unesite obe adrese (odakle i dokle).',
    addrChanged: 'Adresa je promenjena – ponovo izračunajte rutu.',
    routeFail: 'Rutu nismo mogli da izračunamo automatski. Upišite udaljenost u kilometrima.',
    manualKm: 'Udaljenost (km)',
    routeOk: km => `Ruta izračunata: ${km}`,
    floorCall: 'Selidbe bez lifta iznad 6. sprata radimo po dogovoru – pozovite nas za tačnu cenu.',
    needItems: 'Dodajte bar jednu stvar u inventar.',
    needRoute: 'Prvo izračunajte udaljenost rute.',
    errName: 'Unesite ime (najmanje 2 slova).',
    errPhone: 'Unesite ispravan broj telefona (najmanje 8 cifara).',
    errSend: 'Slanje nije uspelo. Proverite internet vezu i pokušajte ponovo.',
    errDb: 'Slanje trenutno nije moguće. Pozovite nas ili pokušajte ponovo za par minuta.',
    sending: 'Šaljem zahtev…', send: 'Pošalji zahtev i vidi cenu',
    thanks: (ime, tel) => `Hvala${ime ? ', ' + ime : ''}! Javljamo vam se uskoro na ${tel} da potvrdimo termin.`,
    lines: {
      vehicle: v => `Vozilo – ${v}`, vehicleSub: 'izlazak vozila i ekipe',
      volume: 'Zapremina stvari', transport: 'Transport',
      md: (n, dem, mon) => `${n}${dem && mon ? ' – demontaža i montaža' : dem ? ' – demontaža' : ' – montaža'}`,
      protect: n => `${n} – zaštita`, heavy: n => `${n} – teški teret`, heavySub: (b, f, n) => `${b} + ${f} po spratu × ${n}`,
      boxes: (n, t) => `Pakovanje – ${n}`, boxesSub: (rad, mat) => `rad ${rad} + materijal ${mat} po kutiji`,
      floors: p => `Spratovi (+${p}%)`, floorsSub: (a, b) => `utovar: ${a} · istovar: ${b}`,
      minimum: 'Dopuna do minimalne cene', minimumSub: m => `minimum ${m}`,
      kombiOnly: 'Samo prevoz – nošenje nije uključeno'
    },
    boxNames: { kutija: 'standardne kutije', velikakutija: 'velike kutije', garderober: 'garderober kutije' },
    rev: { loading: 'Učitavam recenzije sa Google-a…', none: 'Recenzije trenutno nisu dostupne – pogledajte ih direktno na Google-u.', count: n => `${n} recenzija na Google-u` },
    stepsSpace: 'Prostor'
  },
  en: {
    modes: { selidba: ['Move with a crew', 'Carrying, transport, assembly and packing on request'], kombi: ['Van with driver only', 'Transport only – you load and unload'] },
    types: { stan: 'Apartment', kuca: 'House', kancelarija: 'Office' },
    typeSubs: { stan: 'Apartment building', kuca: 'Family house', kancelarija: 'Business premises' },
    sizes: { garsonjera: 'Studio', jednosoban: '1 bedroom', dvosoban: '2 bedrooms', trosoban: '3 bedrooms', cetvorosoban: '4+ bedrooms', office: 'Office' },
    cats: { dnevna: 'Living room', spavaca: 'Bedroom & study', kuhinja: 'Kitchen & appliances', ostalo: 'Boxes & heavy items' },
    dem: 'Disassembly', mon: 'Assembly', special: 'Special',
    floors: ['Ground floor', '1st floor', '2nd floor', '3rd floor', '4th floor', '5th floor', '6th floor', '7th floor or higher'],
    yes: 'Yes', no: 'No',
    pkg: { sami: ['You pack', 'You pack the boxes, we carry and drive.'], mi: ['We pack', 'Labour per box + materials (boxes).'] },
    boxTypes: { troslojna: 'Three-layer boxes', petoslojna: 'Five-layer boxes' },
    vehicles: { kombi: 'Van', kamion: 'Truck' },
    volume: 'Volume', items: 'Items', route: 'Route',
    cargoEmpty: 'Click items in the inventory – they will appear here in the vehicle.',
    cargoFill: (v, p) => `Vehicle load (${v}): ${p}%`,
    cargoTrips: n => `Large load – probably ${n} truck trips. We will confirm by phone.`,
    toTruck: 'The load exceeds the van capacity – switching to a truck.',
    toVan: 'Everything fits in the van.',
    check: { space: 'Choose the size of the space', items: 'Add items to the inventory', route: 'Calculate the route distance' },
    checkItems: (n, v, veh) => `${n} items · ${v} · ${veh}`,
    checkRoute: (km, a, b) => `Route ${km} · pickup: ${a}, delivery: ${b}`,
    floorShort: (f, lift) => f === 0 ? 'ground floor' : `floor ${f >= 7 ? '7+' : f}${lift ? ', lift' : ', no lift'}`,
    stageIdle: 'Enter both addresses and send the elephant on its way.',
    stageLoading: 'Calculating the distance with Google Maps…',
    stageMin: 'min drive', google: 'Google Maps', approx: 'manual',
    addrNeed: 'Enter both addresses (from and to).',
    addrChanged: 'The address changed – calculate the route again.',
    routeFail: 'We could not calculate the route automatically. Enter the distance in kilometres.',
    manualKm: 'Distance (km)',
    routeOk: km => `Route calculated: ${km}`,
    floorCall: 'Moves without a lift above the 6th floor are arranged individually – please call us for an exact price.',
    needItems: 'Add at least one item to the inventory.',
    needRoute: 'Please calculate the route distance first.',
    errName: 'Please enter your name (at least 2 letters).',
    errPhone: 'Please enter a valid phone number (at least 8 digits).',
    errSend: 'Sending failed. Check your connection and try again.',
    errDb: 'Sending is not possible right now. Please call us or try again in a few minutes.',
    sending: 'Sending…', send: 'Send request and see the price',
    thanks: (ime, tel) => `Thank you${ime ? ', ' + ime : ''}! We will call you shortly on ${tel} to confirm the date.`,
    lines: {
      vehicle: v => `Vehicle – ${v}`, vehicleSub: 'vehicle and crew dispatch',
      volume: 'Volume of items', transport: 'Transport',
      md: (n, dem, mon) => `${n}${dem && mon ? ' – disassembly & assembly' : dem ? ' – disassembly' : ' – assembly'}`,
      protect: n => `${n} – protection`, heavy: n => `${n} – heavy item`, heavySub: (b, f, n) => `${b} + ${f} per floor × ${n}`,
      boxes: (n, t) => `Packing – ${n}`, boxesSub: (rad, mat) => `labour ${rad} + materials ${mat} per box`,
      floors: p => `Floors (+${p}%)`, floorsSub: (a, b) => `pickup: ${a} · delivery: ${b}`,
      minimum: 'Top-up to minimum price', minimumSub: m => `minimum ${m}`,
      kombiOnly: 'Transport only – carrying not included'
    },
    boxNames: { kutija: 'standard boxes', velikakutija: 'large boxes', garderober: 'wardrobe boxes' },
    rev: { loading: 'Loading reviews from Google…', none: 'Reviews are not available right now – see them directly on Google.', count: n => `${n} reviews on Google` },
    stepsSpace: 'Space'
  },
  ru: {
    modes: { selidba: ['Переезд с бригадой', 'Подъём, перевозка, сборка и упаковка по желанию'], kombi: ['Только фургон с водителем', 'Только перевозка – погрузка и разгрузка ваши'] },
    types: { stan: 'Квартира', kuca: 'Дом', kancelarija: 'Офис' },
    typeSubs: { stan: 'Многоквартирный дом', kuca: 'Частный дом', kancelarija: 'Коммерческое помещение' },
    sizes: { garsonjera: 'Студия', jednosoban: '1 комната', dvosoban: '2 комнаты', trosoban: '3 комнаты', cetvorosoban: '4+ комнаты', office: 'Офис' },
    cats: { dnevna: 'Гостиная', spavaca: 'Спальня и кабинет', kuhinja: 'Кухня и техника', ostalo: 'Коробки и тяжёлые грузы' },
    dem: 'Разборка', mon: 'Сборка', special: 'Особое',
    floors: ['Партер (уровень улицы)', '1-й этаж над партером', '2-й этаж над партером', '3-й этаж над партером', '4-й этаж над партером', '5-й этаж над партером', '6-й этаж над партером', '7-й этаж и выше'],
    yes: 'Да', no: 'Нет',
    pkg: { sami: ['Упаковываете сами', 'Вы пакуете коробки, мы несём и везём.'], mi: ['Упаковываем мы', 'Работа за коробку + материалы (коробки).'] },
    boxTypes: { troslojna: 'Трёхслойные коробки', petoslojna: 'Пятислойные коробки' },
    vehicles: { kombi: 'Фургон', kamion: 'Грузовик' },
    volume: 'Объём', items: 'Предметов', route: 'Маршрут',
    cargoEmpty: 'Нажимайте на вещи в списке – они появятся здесь, в машине.',
    cargoFill: (v, p) => `Загрузка (${v}): ${p}%`,
    cargoTrips: n => `Большой объём – вероятно, ${n} рейса грузовика. Подтвердим по телефону.`,
    toTruck: 'Объём больше вместимости фургона – переходим на грузовик.',
    toVan: 'Всё помещается в фургон.',
    check: { space: 'Выберите размер помещения', items: 'Добавьте вещи в список', route: 'Рассчитайте маршрут' },
    checkItems: (n, v, veh) => `${n} предм. · ${v} · ${veh}`,
    checkRoute: (km, a, b) => `Маршрут ${km} · погрузка: ${a}, разгрузка: ${b}`,
    floorShort: (f, lift) => f === 0 ? 'партер' : `${f >= 7 ? '7+' : f} этаж${lift ? ', лифт' : ' без лифта'}`,
    stageIdle: 'Укажите оба адреса и отправьте слона в путь.',
    stageLoading: 'Считаю расстояние по Google Картам…',
    stageMin: 'мин в пути', google: 'Google Карты', approx: 'вручную',
    addrNeed: 'Укажите оба адреса (откуда и куда).',
    addrChanged: 'Адрес изменён – рассчитайте маршрут заново.',
    routeFail: 'Не удалось рассчитать маршрут автоматически. Укажите расстояние в километрах.',
    manualKm: 'Расстояние (км)',
    routeOk: km => `Маршрут рассчитан: ${km}`,
    floorCall: 'Переезды без лифта выше 6-го этажа – по договорённости. Позвоните нам для точной цены.',
    needItems: 'Добавьте хотя бы одну вещь в список.',
    needRoute: 'Сначала рассчитайте маршрут.',
    errName: 'Введите имя (минимум 2 буквы).',
    errPhone: 'Введите правильный номер телефона (минимум 8 цифр).',
    errSend: 'Не удалось отправить. Проверьте интернет и попробуйте ещё раз.',
    errDb: 'Отправка сейчас невозможна. Позвоните нам или попробуйте через несколько минут.',
    sending: 'Отправляю…', send: 'Отправить заявку и узнать цену',
    thanks: (ime, tel) => `Спасибо${ime ? ', ' + ime : ''}! Мы скоро перезвоним на ${tel}, чтобы согласовать дату.`,
    lines: {
      vehicle: v => `Транспорт – ${v}`, vehicleSub: 'выезд машины и бригады',
      volume: 'Объём вещей', transport: 'Перевозка',
      md: (n, dem, mon) => `${n}${dem && mon ? ' – разборка и сборка' : dem ? ' – разборка' : ' – сборка'}`,
      protect: n => `${n} – защита`, heavy: n => `${n} – тяжёлый груз`, heavySub: (b, f, n) => `${b} + ${f} за этаж × ${n}`,
      boxes: (n, t) => `Упаковка – ${n}`, boxesSub: (rad, mat) => `работа ${rad} + материал ${mat} за коробку`,
      floors: p => `Этажи (+${p}%)`, floorsSub: (a, b) => `погрузка: ${a} · разгрузка: ${b}`,
      minimum: 'Доплата до минимальной цены', minimumSub: m => `минимум ${m}`,
      kombiOnly: 'Только перевозка – подъём не включён'
    },
    boxNames: { kutija: 'стандартные коробки', velikakutija: 'большие коробки', garderober: 'гардеробные коробки' },
    rev: { loading: 'Загружаю отзывы из Google…', none: 'Отзывы сейчас недоступны – посмотрите их прямо в Google.', count: n => `${n} отзывов в Google` },
    stepsSpace: 'Помещение'
  }
};
const T = TXT[LANG];
const ITEM_ROWS = [
  ['trosed', 'dnevna', 1.5, '', 'Trosed', '3-seater sofa', 'Диван трёхместный'],
  ['dvosed', 'dnevna', 1.1, '', 'Dvosed', '2-seater sofa', 'Диван двухместный'],
  ['ugaona', 'dnevna', 2.5, 'md:ugaona', 'Ugaona garnitura', 'Corner sofa', 'Угловой диван'],
  ['fotelja', 'dnevna', 0.6, '', 'Fotelja', 'Armchair', 'Кресло'],
  ['tvkomoda', 'dnevna', 0.8, '', 'TV komoda', 'TV stand', 'Тумба под ТВ'],
  ['klubsto', 'dnevna', 0.4, '', 'Klub sto', 'Coffee table', 'Журнальный столик'],
  ['polica', 'dnevna', 1.2, '', 'Polica za knjige', 'Bookshelf', 'Книжный стеллаж'],
  ['smarttv', 'dnevna', 0.3, 'protect', 'TV', 'TV', 'Телевизор'],
  ['podnalampa', 'dnevna', 0.2, '', 'Podna lampa', 'Floor lamp', 'Торшер'],
  ['stonalampa', 'dnevna', 0.1, '', 'Stona lampa', 'Table lamp', 'Настольная лампа'],
  ['luster', 'dnevna', 0.2, 'md:luster', 'Luster', 'Chandelier', 'Люстра'],
  ['zvucnici', 'dnevna', 0.25, '', 'Muzička linija / zvučnici', 'Stereo / speakers', 'Музыкальный центр / колонки'],
  ['bracni', 'spavaca', 2.2, 'md:krevet', 'Bračni krevet', 'Double bed', 'Двуспальная кровать'],
  ['singl', 'spavaca', 1.2, '', 'Singl krevet', 'Single bed', 'Односпальная кровать'],
  ['krevetac', 'spavaca', 0.6, 'md:krevetac', 'Dečiji krevetac', 'Cot', 'Детская кроватка'],
  ['dusek', 'spavaca', 0.8, '', 'Dušek', 'Mattress', 'Матрас'],
  ['orman1', 'spavaca', 1.0, 'md:orman1', 'Orman jednokrilni', 'One-door wardrobe', 'Шкаф одностворчатый'],
  ['orman2', 'spavaca', 1.8, 'md:orman2', 'Orman dvokrilni', 'Two-door wardrobe', 'Шкаф двухстворчатый'],
  ['orman3', 'spavaca', 2.5, 'md:orman3', 'Orman trokrilni', 'Three-door wardrobe', 'Шкаф трёхстворчатый'],
  ['ormanklizni', 'spavaca', 2.8, 'md:klizni', 'Orman sa kliznim vratima', 'Sliding-door wardrobe', 'Шкаф-купе'],
  ['ormanstakleni', 'spavaca', 2.8, 'md:stakleni', 'Orman – klizna staklena vrata', 'Wardrobe – sliding glass doors', 'Шкаф-купе со стеклом'],
  ['komoda', 'spavaca', 0.9, '', 'Komoda za odeću', 'Chest of drawers', 'Комод'],
  ['nocni', 'spavaca', 0.18, '', 'Noćni ormarić', 'Nightstand', 'Прикроватная тумба'],
  ['radnisto', 'spavaca', 1.0, 'md:sto', 'Radni / kompjuterski sto', 'Desk / computer desk', 'Рабочий / компьютерный стол'],
  ['kancstolica', 'spavaca', 0.3, '', 'Kancelarijska stolica', 'Office chair', 'Офисный стул'],
  ['racunar', 'spavaca', 0.2, 'protect', 'Računar i monitor', 'Computer & monitor', 'Компьютер и монитор'],
  ['velikifrizider', 'kuhinja', 1.5, '', 'Frižider / zamrzivač', 'Fridge / freezer', 'Холодильник / морозильник'],
  ['malifrizider', 'kuhinja', 0.6, '', 'Mali frižider', 'Small fridge', 'Маленький холодильник'],
  ['vesmasina', 'kuhinja', 0.6, '', 'Veš / sudo mašina', 'Washing machine / dishwasher', 'Стиральная / посудомоечная машина'],
  ['susilica', 'kuhinja', 0.6, '', 'Mašina za sušenje', 'Tumble dryer', 'Сушильная машина'],
  ['sporet', 'kuhinja', 0.6, '', 'Šporet / rerna', 'Cooker / oven', 'Плита / духовка'],
  ['mikrotalasna', 'kuhinja', 0.15, '', 'Mikrotalasna i sitni aparati', 'Microwave & small appliances', 'Микроволновка и мелкая техника'],
  ['trpsto', 'kuhinja', 1.0, '', 'Trpezarijski sto', 'Dining table', 'Обеденный стол'],
  ['trpstolica', 'kuhinja', 0.2, '', 'Trpezarijska stolica', 'Dining chair', 'Стул'],
  ['kutija', 'ostalo', 0.1, 'box:kutija', 'Standardna kutija', 'Standard box', 'Стандартная коробка'],
  ['velikakutija', 'ostalo', 0.18, 'box:velikakutija', 'Velika kutija', 'Large box', 'Большая коробка'],
  ['garderober', 'ostalo', 0.35, 'box:garderober', 'Garderober kutija', 'Wardrobe box', 'Гардеробная коробка'],
  ['gajba', 'ostalo', 0.08, '', 'Plastična gajba', 'Plastic crate', 'Пластиковый ящик'],
  ['ogledalo', 'ostalo', 0.3, 'protect', 'Veliko ogledalo / slika', 'Large mirror / painting', 'Большое зеркало / картина'],
  ['bicikl', 'ostalo', 0.7, '', 'Bicikl', 'Bicycle', 'Велосипед'],
  ['biljka', 'ostalo', 0.25, '', 'Sobna biljka', 'House plant', 'Комнатное растение'],
  ['kofer', 'ostalo', 0.15, '', 'Kofer', 'Suitcase', 'Чемодан'],
  ['pianino', 'ostalo', 3.0, 'heavy:pianino', 'Pianino / klavir', 'Piano', 'Пианино / рояль'],
  ['tapec', 'ostalo', 0.5, 'heavy:tapec', 'TA peć', 'Storage heater', 'Теплонакопитель (ТА)'],
  ['sef', 'ostalo', 0.6, 'heavy:sef', 'Sef / vending aparat', 'Safe / vending machine', 'Сейф / вендинговый аппарат']
];
const CATS = [
  ['dnevna', 'sofa'], ['spavaca', 'bed'], ['kuhinja', 'cooking'], ['ostalo', 'boxes']
];
const LI = { sr: 4, en: 5, ru: 6 }[LANG];
const ITEMS = {};
ITEM_ROWS.forEach(r => {
  const [id, cat, vol, flag] = r;
  const it = { id, cat, vol, label: r[LI] };
  if (flag.startsWith('md:')) it.md = flag.slice(3);
  if (flag.startsWith('heavy:')) it.heavy = flag.slice(6);
  if (flag === 'protect') it.protect = true;
  if (flag.startsWith('box:')) it.box = flag.slice(4);
  ITEMS[id] = it;
});
const SPACE_TYPES = [['stan', 'building'], ['kuca', 'house'], ['kancelarija', 'briefcase']];
const SPACE_SIZES = [['garsonjera', 28], ['jednosoban', 42], ['dvosoban', 58], ['trosoban', 75], ['cetvorosoban', 100], ['office', 80]];
const SH = '<ellipse class="ish" cx="32" cy="57" rx="22" ry="3"/>';
const ILLU = {
    trosed: SH+'<rect class="ia" x="8" y="18" width="48" height="18" rx="6"/><rect class="ia" x="4" y="28" width="10" height="20" rx="4"/><rect class="ia" x="50" y="28" width="10" height="20" rx="4"/><rect class="ib" x="14" y="32" width="11" height="10" rx="2.5"/><rect class="ib" x="26.5" y="32" width="11" height="10" rx="2.5"/><rect class="ib" x="39" y="32" width="11" height="10" rx="2.5"/><rect class="ic" x="8" y="42" width="48" height="6" rx="2"/><rect class="id" x="10" y="48" width="3" height="5" rx="1"/><rect class="id" x="51" y="48" width="3" height="5" rx="1"/>',
    dvosed: SH+'<rect class="ia" x="12" y="18" width="40" height="18" rx="6"/><rect class="ia" x="8" y="28" width="10" height="20" rx="4"/><rect class="ia" x="46" y="28" width="10" height="20" rx="4"/><rect class="ib" x="18" y="32" width="13.5" height="10" rx="2.5"/><rect class="ib" x="32.5" y="32" width="13.5" height="10" rx="2.5"/><rect class="ic" x="12" y="42" width="40" height="6" rx="2"/><rect class="id" x="14" y="48" width="3" height="5" rx="1"/><rect class="id" x="47" y="48" width="3" height="5" rx="1"/>',
    fotelja: SH+'<rect class="ia" x="18" y="14" width="28" height="22" rx="7"/><rect class="ia" x="12" y="28" width="10" height="20" rx="4"/><rect class="ia" x="42" y="28" width="10" height="20" rx="4"/><rect class="ib" x="22" y="32" width="20" height="10" rx="3"/><rect class="ic" x="14" y="42" width="36" height="6" rx="2"/><rect class="id" x="16" y="48" width="3" height="5" rx="1"/><rect class="id" x="45" y="48" width="3" height="5" rx="1"/>',
    tvkomoda: SH+'<rect class="ib" x="14" y="20" width="10" height="8" rx="1.5" opacity=".7"/><rect class="ia" x="6" y="28" width="52" height="22" rx="3"/><rect class="ic" x="10" y="32" width="21" height="14" rx="1.5"/><rect class="ic" x="33" y="32" width="21" height="14" rx="1.5"/><rect class="iw" x="27" y="37" width="2" height="4" rx="1"/><rect class="iw" x="35" y="37" width="2" height="4" rx="1"/><rect class="id" x="9" y="50" width="3" height="5"/><rect class="id" x="52" y="50" width="3" height="5"/>',
    klubsto: SH+'<rect class="ia" x="12" y="34" width="3.5" height="18" rx="1"/><rect class="ia" x="48.5" y="34" width="3.5" height="18" rx="1"/><rect class="ic" x="13" y="44" width="38" height="3" rx="1"/><rect class="ib" x="8" y="29" width="48" height="6" rx="3"/><rect class="iw" x="34" y="24" width="10" height="5" rx="1" opacity=".8"/>',
    polica: SH+'<rect class="ia" x="16" y="5" width="32" height="50" rx="2"/><rect class="id" x="19.5" y="8.5" width="25" height="43"/><rect class="ia" x="19" y="21" width="26" height="2"/><rect class="ia" x="19" y="34" width="26" height="2"/><rect class="ib" x="21" y="11" width="3" height="10"/><rect class="ie" x="25" y="13" width="3" height="8"/><rect class="iw" x="29" y="12" width="2.5" height="9"/><rect class="ik" x="35" y="14" width="7" height="7"/><rect class="ie" x="21" y="26" width="4" height="8"/><rect class="ib" x="26" y="24" width="3" height="10"/><rect class="ib" x="37" y="25" width="3" height="9" transform="rotate(12 38 30)"/><rect class="ik" x="21" y="40" width="9" height="11"/><rect class="iw" x="33" y="39" width="3" height="12"/><rect class="ie" x="37" y="41" width="3" height="10"/>',
    smarttv: SH+'<rect class="ic" x="5" y="10" width="54" height="34" rx="3"/><rect class="ib" x="8" y="13" width="48" height="28" rx="1.5"/><path d="M12 39 L30 15 L38 15 L20 39 Z" fill="#fff" opacity=".18"/><rect class="ia" x="30" y="44" width="4" height="7"/><rect class="ia" x="20" y="51" width="24" height="3" rx="1.5"/>',
    podnalampa: '<ellipse class="ish" cx="32" cy="57" rx="12" ry="2.5"/><circle cx="32" cy="22" r="15" fill="#fde68a" opacity=".16"/><path class="ib" d="M22 6 H42 L48 24 H16 Z"/><rect class="ia" x="31" y="24" width="2" height="28"/><ellipse class="ia" cx="32" cy="53" rx="10" ry="3"/>',
    stonalampa: '<ellipse class="ish" cx="32" cy="57" rx="12" ry="2.5"/><circle cx="32" cy="28" r="13" fill="#fde68a" opacity=".16"/><path class="ib" d="M23 18 H41 L45 31 H19 Z"/><ellipse class="ia" cx="32" cy="43" rx="8" ry="9"/><rect class="ic" x="23" y="51" width="18" height="4" rx="2"/>',
    zvucnici: SH+'<rect class="ic" x="11" y="12" width="17" height="42" rx="3"/><rect class="ic" x="36" y="12" width="17" height="42" rx="3"/><circle class="ib" cx="19.5" cy="22" r="3.5"/><circle class="ib" cx="44.5" cy="22" r="3.5"/><circle class="ia" cx="19.5" cy="39" r="6.5"/><circle class="ia" cx="44.5" cy="39" r="6.5"/><circle class="id" cx="19.5" cy="39" r="2.5"/><circle class="id" cx="44.5" cy="39" r="2.5"/>',
    bracni: SH+'<rect class="ia" x="6" y="12" width="52" height="22" rx="5"/><rect class="iw" x="10" y="22" width="20" height="9" rx="3.5"/><rect class="iw" x="34" y="22" width="20" height="9" rx="3.5"/><rect class="ib" x="6" y="31" width="52" height="14" rx="3"/><rect class="ic" x="6" y="45" width="52" height="5" rx="1.5"/><rect class="id" x="8" y="50" width="3" height="5"/><rect class="id" x="53" y="50" width="3" height="5"/>',
    singl: SH+'<rect class="ia" x="16" y="12" width="32" height="22" rx="5"/><rect class="iw" x="21" y="22" width="22" height="9" rx="3.5"/><rect class="ib" x="16" y="31" width="32" height="14" rx="3"/><rect class="ic" x="16" y="45" width="32" height="5" rx="1.5"/><rect class="id" x="18" y="50" width="3" height="5"/><rect class="id" x="43" y="50" width="3" height="5"/>',
    orman3: SH+'<rect class="ic" x="8" y="3" width="48" height="5" rx="1.5"/><rect class="ia" x="10" y="7" width="44" height="46" rx="1.5"/><rect class="ib" x="13" y="10" width="18.5" height="40" rx="1" opacity=".55"/><rect class="ib" x="32.5" y="10" width="18.5" height="40" rx="1" opacity=".55"/><rect class="iw" x="28" y="27" width="2" height="8" rx="1"/><rect class="iw" x="34" y="27" width="2" height="8" rx="1"/><rect class="id" x="12" y="53" width="3" height="3"/><rect class="id" x="49" y="53" width="3" height="3"/>',
    komoda: SH+'<rect class="ia" x="10" y="17" width="44" height="36" rx="2"/><rect class="ib" x="14" y="21" width="36" height="8.5" rx="1" opacity=".6"/><rect class="ib" x="14" y="32" width="36" height="8.5" rx="1" opacity=".6"/><rect class="ib" x="14" y="43" width="36" height="8" rx="1" opacity=".6"/><circle class="iw" cx="32" cy="25" r="1.6"/><circle class="iw" cx="32" cy="36" r="1.6"/><circle class="iw" cx="32" cy="47" r="1.6"/><rect class="id" x="12" y="53" width="3" height="3"/><rect class="id" x="49" y="53" width="3" height="3"/>',
    nocni: SH+'<path class="ib" d="M27 14 H37 L39 20 H25 Z"/><rect class="ia" x="31" y="20" width="2" height="6"/><rect class="ia" x="18" y="26" width="28" height="27" rx="2"/><rect class="ib" x="21" y="29" width="22" height="9" rx="1" opacity=".6"/><circle class="iw" cx="32" cy="33.5" r="1.5"/><rect class="id" x="21" y="41" width="22" height="9" rx="1"/><rect class="iw" x="25" y="44" width="4" height="6" opacity=".7"/><rect class="id" x="20" y="53" width="3" height="3"/><rect class="id" x="41" y="53" width="3" height="3"/>',
    dusek: SH+'<path class="ib" d="M6 30 L32 20 L58 30 L32 40 Z"/><path class="ia" d="M6 30 L32 40 L32 48 L6 38 Z"/><path class="ic" d="M32 40 L58 30 L58 38 L32 48 Z"/><path d="M15 30 L32 24 M22 33 L40 26 M28 35.5 L48 28" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>',
    radnisto: SH+'<rect class="ib" x="5" y="24" width="54" height="5" rx="1.5"/><rect class="ia" x="8" y="29" width="3.5" height="24"/><rect class="ia" x="40" y="29" width="16" height="24" rx="1"/><rect class="ic" x="43" y="32" width="10" height="5" rx="1"/><rect class="ic" x="43" y="40" width="10" height="5" rx="1"/><rect class="ie" x="12" y="17" width="4" height="7" rx="1.5"/><path class="ie" d="M14 17 C10 10 12 8 14 12 C16 8 18 10 14 17Z"/><rect class="iw" x="24" y="19" width="12" height="5" rx="1" opacity=".8"/>',
    kancstolica: '<ellipse class="ish" cx="32" cy="58" rx="16" ry="2.5"/><rect class="ib" x="21" y="8" width="22" height="24" rx="7"/><rect class="ia" x="18" y="32" width="28" height="7" rx="3.5"/><rect class="ic" x="14" y="27" width="4" height="10" rx="2"/><rect class="ic" x="46" y="27" width="4" height="10" rx="2"/><rect class="ic" x="30.5" y="39" width="3" height="10"/><rect class="ic" x="16" y="49" width="32" height="3" rx="1.5"/><circle class="id" cx="17" cy="54" r="2.5"/><circle class="id" cx="32" cy="54" r="2.5"/><circle class="id" cx="47" cy="54" r="2.5"/>',
    racunar: SH+'<rect class="ic" x="3" y="10" width="38" height="26" rx="2"/><rect class="ib" x="6" y="13" width="32" height="20" rx="1"/><path d="M9 31 L21 15 L26 15 L14 31Z" fill="#fff" opacity=".2"/><rect class="ia" x="20" y="36" width="4" height="7"/><rect class="ia" x="13" y="43" width="18" height="3" rx="1.5"/><rect class="ia" x="45" y="12" width="15" height="40" rx="2"/><circle class="ie" cx="52.5" cy="18" r="2"/><rect class="id" x="48" y="26" width="9" height="1.5"/><rect class="id" x="48" y="30" width="9" height="1.5"/><rect class="id" x="48" y="34" width="9" height="1.5"/>',
    velikifrizider: SH+'<rect class="iw" x="16" y="3" width="32" height="51" rx="4"/><rect class="ic" x="16" y="20" width="32" height="1.6"/><rect class="ia" x="42" y="8" width="2.5" height="8" rx="1.2"/><rect class="ia" x="42" y="25" width="2.5" height="14" rx="1.2"/><rect class="ib" x="19" y="6" width="4" height="12" rx="1" opacity=".5"/><rect class="id" x="18" y="54" width="4" height="2"/><rect class="id" x="42" y="54" width="4" height="2"/>',
    malifrizider: SH+'<rect class="iw" x="18" y="22" width="28" height="32" rx="3.5"/><rect class="ic" x="18" y="30" width="28" height="1.5"/><rect class="ia" x="40" y="34" width="2.5" height="10" rx="1.2"/><rect class="ia" x="40" y="24.5" width="2.5" height="4" rx="1.2"/><rect class="ib" x="21" y="34" width="4" height="12" rx="1" opacity=".5"/>',
    vesmasina: SH+'<rect class="iw" x="13" y="8" width="38" height="46" rx="4"/><rect class="ia" x="13" y="8" width="38" height="9" rx="4"/><circle class="iw" cx="42" cy="12.5" r="2.5"/><rect class="ib" x="18" y="11" width="10" height="3" rx="1.5"/><circle class="ic" cx="32" cy="35" r="13"/><circle class="ib" cx="32" cy="35" r="9"/><path d="M26 31 a8 8 0 0 1 8 -4" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/>',
    sporet: SH+'<rect class="ia" x="12" y="10" width="40" height="44" rx="3"/><rect class="id" x="12" y="10" width="40" height="5" rx="2"/><circle class="iw" cx="19" cy="20" r="2"/><circle class="iw" cx="26" cy="20" r="2"/><circle class="iw" cx="38" cy="20" r="2"/><circle class="iw" cx="45" cy="20" r="2"/><rect class="id" x="16" y="26" width="32" height="24" rx="2"/><rect class="ib" x="20" y="31" width="24" height="13" rx="1.5" opacity=".55"/><rect class="iw" x="20" y="28" width="24" height="2" rx="1"/>',
    mikrotalasna: SH+'<rect class="ia" x="5" y="18" width="54" height="32" rx="3.5"/><rect class="id" x="9" y="22" width="34" height="24" rx="2"/><rect class="ib" x="12" y="25" width="28" height="18" rx="1.5" opacity=".45"/><rect class="ic" x="46" y="22" width="9" height="24" rx="1.5"/><circle class="iw" cx="50.5" cy="27" r="1.5"/><circle class="iw" cx="50.5" cy="33" r="1.5"/><rect class="iw" x="48" y="39" width="5" height="3" rx="1"/>',
    trpsto: SH+'<rect class="ia" x="11" y="31" width="4" height="22" rx="1"/><rect class="ia" x="49" y="31" width="4" height="22" rx="1"/><rect class="ic" x="10" y="29" width="44" height="4"/><rect class="ib" x="5" y="23" width="54" height="6" rx="2"/><circle class="ie" cx="32" cy="18" r="4"/><rect class="iw" x="31" y="13" width="2" height="6"/>',
    trpstolica: SH+'<rect class="ia" x="20" y="6" width="24" height="24" rx="3"/><rect class="id" x="24" y="10" width="16" height="3" rx="1"/><rect class="id" x="24" y="16" width="16" height="3" rx="1"/><rect class="id" x="24" y="22" width="16" height="3" rx="1"/><rect class="ib" x="17" y="30" width="30" height="6" rx="2"/><rect class="ia" x="19" y="36" width="3.5" height="18"/><rect class="ia" x="41.5" y="36" width="3.5" height="18"/>',
    kutija: SH+'<path class="ik" d="M32 14 L54 24 L32 34 L10 24 Z"/><path class="ikk" d="M10 24 L32 34 L32 54 L10 44 Z"/><path d="M32 34 L54 24 L54 44 L32 54 Z" fill="#a8692f"/><path d="M21 19 L43 29" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>',
    velikakutija: '<ellipse class="ish" cx="32" cy="59" rx="26" ry="3"/><path class="ik" d="M32 8 L58 20 L32 32 L6 20 Z"/><path class="ikk" d="M6 20 L32 32 L32 57 L6 45 Z"/><path d="M32 32 L58 20 L58 45 L32 57 Z" fill="#a8692f"/><path d="M19 14 L45 26" stroke="#fff" stroke-opacity=".55" stroke-width="3.5"/><path d="M12 33 L22 37.6" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>',
    gajba: SH+'<path class="ia" d="M10 22 H54 L50 53 H14 Z"/><rect class="ib" x="7" y="17" width="50" height="7" rx="2"/><rect class="id" x="12" y="18.5" width="7" height="3" rx="1.5"/><rect class="id" x="45" y="18.5" width="7" height="3" rx="1.5"/><path d="M20 28 L21 48 M28 28 L28.5 48 M36 28 L35.5 48 M44 28 L43 48" stroke="#0b1222" stroke-opacity=".45" stroke-width="2"/>',
    ogledalo: SH+'<rect class="ik" x="13" y="3" width="38" height="52" rx="3"/><rect class="ib" x="17" y="7" width="30" height="44" rx="1.5"/><path d="M20 30 L38 9 L44 9 L22 36 Z" fill="#fff" opacity=".35"/><path d="M24 44 L44 20 L46 24 L28 46 Z" fill="#fff" opacity=".18"/>',
    bicikl: SH+'<circle class="is" cx="16" cy="40" r="11"/><circle class="is" cx="48" cy="40" r="11"/><path d="M16 40 L27 24 H42 L48 40 M27 24 L33 40 H16 M42 24 L33 40" fill="none" stroke="url(#ilA)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><rect class="ic" x="22" y="19" width="10" height="3.5" rx="1.75"/><path d="M42 24 L40 15 H47" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/><circle class="ib" cx="33" cy="40" r="2.5"/>',
    pianino: SH+'<rect class="ia" x="6" y="9" width="52" height="5" rx="1.5"/><rect class="ic" x="8" y="14" width="48" height="38" rx="1.5"/><rect class="ib" x="18" y="18" width="28" height="9" rx="1" opacity=".5"/><rect class="iw" x="8" y="31" width="48" height="7"/><rect class="id" x="12" y="31" width="2" height="4"/><rect class="id" x="17" y="31" width="2" height="4"/><rect class="id" x="25" y="31" width="2" height="4"/><rect class="id" x="30" y="31" width="2" height="4"/><rect class="id" x="35" y="31" width="2" height="4"/><rect class="id" x="43" y="31" width="2" height="4"/><rect class="id" x="48" y="31" width="2" height="4"/><rect class="ia" x="10" y="52" width="3" height="4"/><rect class="ia" x="51" y="52" width="3" height="4"/>',
    biljka: '<ellipse class="ish" cx="32" cy="58" rx="12" ry="2.5"/><ellipse class="ie" cx="24" cy="24" rx="6" ry="15" transform="rotate(-28 24 24)"/><ellipse class="ie" cx="40" cy="22" rx="6" ry="15" transform="rotate(26 40 22)"/><ellipse class="ie" cx="32" cy="17" rx="5.5" ry="15" opacity=".85"/><path d="M32 40 V22" stroke="#065f46" stroke-width="2"/><path class="ia" d="M21 38 H43 L40 56 H24 Z"/><rect class="ib" x="19" y="36" width="26" height="4" rx="2"/>',
    kofer: SH+'<path d="M26 16 V10 H38 V16" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linejoin="round"/><rect class="ia" x="15" y="15" width="34" height="38" rx="5"/><rect class="ic" x="23" y="18" width="2.5" height="32" rx="1"/><rect class="ic" x="38.5" y="18" width="2.5" height="32" rx="1"/><circle class="id" cx="21" cy="55" r="2.5"/><circle class="id" cx="43" cy="55" r="2.5"/>',
    orman1: SH+'<rect class="ic" x="16" y="3" width="32" height="5" rx="1.5"/><rect class="ia" x="18" y="7" width="28" height="46" rx="1.5"/><rect class="ib" x="21" y="10" width="22" height="40" rx="1" opacity=".55"/><rect class="iw" x="38" y="27" width="2" height="8" rx="1"/><rect class="id" x="20" y="53" width="3" height="3"/><rect class="id" x="41" y="53" width="3" height="3"/>',
    orman2: SH+'<rect class="ic" x="11" y="3" width="42" height="5" rx="1.5"/><rect class="ia" x="13" y="7" width="38" height="46" rx="1.5"/><rect class="ib" x="16" y="10" width="15.5" height="40" rx="1" opacity=".55"/><rect class="ib" x="32.5" y="10" width="15.5" height="40" rx="1" opacity=".55"/><rect class="iw" x="28" y="27" width="2" height="8" rx="1"/><rect class="iw" x="34" y="27" width="2" height="8" rx="1"/><rect class="id" x="15" y="53" width="3" height="3"/><rect class="id" x="46" y="53" width="3" height="3"/>',
    ormanklizni: SH+'<rect class="ic" x="5" y="3" width="54" height="5" rx="1.5"/><rect class="ia" x="7" y="7" width="50" height="46" rx="1.5"/><rect class="ib" x="10" y="10" width="24" height="40" rx="1" opacity=".5"/><rect class="ib" x="30" y="10" width="24" height="40" rx="1" opacity=".75"/><path d="M8 9 H56 M8 51 H56" stroke="#0b1222" stroke-width="1.6"/><rect class="iw" x="31.5" y="26" width="2" height="10" rx="1"/><rect class="id" x="9" y="53" width="3" height="3"/><rect class="id" x="52" y="53" width="3" height="3"/>',
    ormanstakleni: SH+'<rect class="ic" x="5" y="3" width="54" height="5" rx="1.5"/><rect class="ia" x="7" y="7" width="50" height="46" rx="1.5"/><rect x="10" y="10" width="24" height="40" rx="1" fill="#bae6fd" opacity=".55"/><rect x="30" y="10" width="24" height="40" rx="1" fill="#e0f2fe" opacity=".8"/><path d="M14 38 L28 14 L31 14 L17 38 Z M34 44 L50 16 L52 18 L37 44 Z" fill="#fff" opacity=".5"/><path d="M8 9 H56 M8 51 H56" stroke="#0b1222" stroke-width="1.6"/><rect class="id" x="9" y="53" width="3" height="3"/><rect class="id" x="52" y="53" width="3" height="3"/>',
    ugaona: SH+'<rect class="ia" x="4" y="18" width="36" height="16" rx="5"/><rect class="ia" x="38" y="18" width="22" height="34" rx="5"/><rect class="ib" x="8" y="30" width="12" height="9" rx="2.5"/><rect class="ib" x="21" y="30" width="12" height="9" rx="2.5"/><rect class="ib" x="34" y="30" width="18" height="18" rx="3"/><rect class="ic" x="4" y="39" width="36" height="7" rx="2"/><rect class="ia" x="2" y="26" width="7" height="20" rx="3"/><rect class="id" x="6" y="46" width="3" height="5"/><rect class="id" x="54" y="52" width="3" height="3"/>',
    luster: '<ellipse class="ish" cx="32" cy="58" rx="14" ry="2.5"/><rect class="ic" x="31" y="2" width="2" height="16"/><circle cx="32" cy="34" r="16" fill="#fde68a" opacity=".14"/><path class="ia" d="M14 26 H50 L46 32 H18 Z"/><path d="M18 32 Q 16 40 12 42 M26 32 Q 26 40 24 44 M38 32 Q 38 40 40 44 M46 32 Q 48 40 52 42" stroke="url(#ilA)" stroke-width="2.5" fill="none" stroke-linecap="round"/><path class="ib" d="M8 40 h8 l-2 8 h-4 z M20 42 h8 l-2 8 h-4 z M36 42 h8 l-2 8 h-4 z M48 40 h8 l-2 8 h-4 z"/><circle cx="32" cy="22" r="4" class="iw"/>',
    krevetac: SH+'<rect class="ia" x="8" y="14" width="4" height="40" rx="1.5"/><rect class="ia" x="52" y="14" width="4" height="40" rx="1.5"/><rect class="ia" x="8" y="14" width="48" height="4" rx="1.5"/><rect class="ib" x="12" y="34" width="40" height="8" rx="2"/><path d="M16 18 V34 M21 18 V34 M26 18 V34 M31 18 V34 M36 18 V34 M41 18 V34 M46 18 V34" stroke="url(#ilA)" stroke-width="2"/><rect class="ia" x="8" y="42" width="48" height="4" rx="1.5"/><circle class="iw" cx="20" cy="31" r="3"/>',
    susilica: SH+'<rect class="iw" x="13" y="8" width="38" height="46" rx="4"/><rect class="ia" x="13" y="8" width="38" height="9" rx="4"/><circle class="iw" cx="42" cy="12.5" r="2.5"/><rect class="ib" x="18" y="11" width="10" height="3" rx="1.5"/><circle class="ic" cx="32" cy="35" r="13"/><circle cx="32" cy="35" r="9" fill="#fde68a" opacity=".45"/><path d="M26 33 q3 -4 6 0 t6 0 M26 38 q3 -4 6 0 t6 0" stroke="#fff" stroke-opacity=".7" stroke-width="1.8" fill="none"/>',
    tapec: SH+'<rect class="iw" x="6" y="16" width="52" height="34" rx="3"/><rect class="ic" x="10" y="20" width="44" height="18" rx="2"/><path d="M14 24 H50 M14 28 H50 M14 32 H50" stroke="#94a3b8" stroke-width="1.6"/><rect x="44" y="41" width="8" height="5" rx="1" fill="#f97316"/><circle class="ia" cx="16" cy="43.5" r="2.5"/><circle class="ia" cx="24" cy="43.5" r="2.5"/><rect class="id" x="10" y="50" width="4" height="5"/><rect class="id" x="50" y="50" width="4" height="5"/>',
    sef: SH+'<rect class="ic" x="12" y="10" width="40" height="44" rx="3"/><rect class="ia" x="15" y="13" width="34" height="38" rx="2"/><circle class="iw" cx="32" cy="32" r="8"/><circle class="ic" cx="32" cy="32" r="3"/><path d="M32 24 V27 M32 37 V40 M24 32 H27 M37 32 H40" stroke="#1e3a5f" stroke-width="2"/><rect class="iw" x="44" y="28" width="3" height="10" rx="1.5"/><rect class="id" x="14" y="54" width="4" height="3"/><rect class="id" x="46" y="54" width="4" height="3"/>',
    garderober: '<ellipse class="ish" cx="32" cy="59" rx="20" ry="3"/><path class="ik" d="M32 6 L50 13 L32 20 L14 13 Z"/><path class="ikk" d="M14 13 L32 20 L32 57 L14 50 Z"/><path d="M32 20 L50 13 L50 50 L32 57 Z" fill="#a8692f"/><path d="M19 22 L28 25.5" stroke="#fff" stroke-opacity=".6" stroke-width="2.5"/><path d="M17 26 Q 23 22 29 28" stroke="#e2e8f0" stroke-width="2" fill="none"/><path d="M23 23 v-3 a2 2 0 1 1 2 2" stroke="#e2e8f0" stroke-width="1.6" fill="none"/>'
};
const illSvg = (id, cls) => `<svg viewBox="0 0 64 64" class="ill ${cls || ''}" aria-hidden="true">${ILLU[id] || ''}</svg>`;
const ICONS = {"home": "<path d=\"M3 10.5 12 3l9 7.5\"/><path d=\"M5 9.5V21h14V9.5\"/><path d=\"M10 21v-6h4v6\"/>", "house": "<path d=\"M3 10.5 12 3l9 7.5\"/><path d=\"M5 9.5V21h14V9.5\"/><path d=\"M10 21v-6h4v6\"/>", "building": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"1.5\"/><path d=\"M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2\"/><path d=\"M10 21v-3h4v3\"/>", "briefcase": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/><path d=\"M3 13h18\"/>", "route": "<circle cx=\"6\" cy=\"19\" r=\"2.5\"/><circle cx=\"18\" cy=\"5\" r=\"2.5\"/><path d=\"M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5\"/>", "wrench": "<path d=\"M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3l9.4-9.4\"/><path d=\"M14.7 6.3 17 4l3 3-2.3 2.3\"/>", "package": "<path d=\"M21 8 12 3 3 8v8l9 5 9-5V8Z\"/><path d=\"M3 8l9 5 9-5\"/><path d=\"M12 13v8\"/><path d=\"m7.5 5.5 9 5\"/>", "warehouse": "<path d=\"M3 21V9l9-5 9 5v12\"/><path d=\"M7 21v-8h10v8\"/><path d=\"M7 17h10\"/>", "fridge": "<rect x=\"6\" y=\"2.5\" width=\"12\" height=\"19\" rx=\"2\"/><path d=\"M6 10h12\"/><path d=\"M9 6v1.5M9 13v3\"/>", "sofa": "<path d=\"M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3\"/><path d=\"M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2v-5Z\"/><path d=\"M5 18v2M19 18v2\"/>", "bed": "<path d=\"M3 20V6\"/><path d=\"M3 12h18v8\"/><path d=\"M3 16h18\"/><path d=\"M7 12V9h5a2 2 0 0 1 2 2v1\"/>", "cooking": "<path d=\"M3 11h18\"/><path d=\"M5 11v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-7\"/><path d=\"M8 7c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7c0-1 1-1.5 1-2.5\"/>", "boxes": "<path d=\"M3 12h8v8H3zM13 12h8v8h-8zM8 4h8v8H8z\"/><path d=\"M6 12v2M16 12v2M11 4v2\"/>", "music": "<path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/>", "shield": "<path d=\"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z\"/><path d=\"m9 12 2 2 4-4\"/>", "trash": "<path d=\"M3 6h18\"/><path d=\"M8 6V4h8v2\"/><path d=\"M6 6l1 15h10l1-15\"/><path d=\"M10 11v6M14 11v6\"/>", "hammer": "<path d=\"m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9\"/><path d=\"M17.6 15 22 10.6 13.4 2 9 6.4l2 2 1.6-1.6 3.5 3.5-1.6 1.6 3.1 3.1Z\"/>", "box": "<path d=\"M21 8 12 3 3 8v8l9 5 9-5V8Z\"/><path d=\"M3 8l9 5 9-5\"/><path d=\"M12 13v8\"/>", "truck": "<path d=\"M2 6h11v10H2z\"/><path d=\"M13 9h4.5l3.5 3.5V16h-8\"/><circle cx=\"6\" cy=\"17.5\" r=\"2\"/><circle cx=\"17\" cy=\"17.5\" r=\"2\"/>", "car": "<path d=\"M3 15V9l3-4h9l5 4h1v6\"/><path d=\"M3 15h18\"/><circle cx=\"7.5\" cy=\"16.5\" r=\"2\"/><circle cx=\"16.5\" cy=\"16.5\" r=\"2\"/>", "stairs": "<path d=\"M3 20h5v-5h5v-5h5V5h3\"/>", "phone": "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z\"/>", "mail": "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m22 7-10 6L2 7\"/>", "pin": "<path d=\"M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z\"/><circle cx=\"12\" cy=\"9\" r=\"2.5\"/>", "flag": "<path d=\"M4 22V4\"/><path d=\"M4 4h13l-2 4 2 4H4\"/>", "nav": "<path d=\"m3 11 19-9-9 19-2-8-8-2Z\"/>", "calc": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><path d=\"M8 6h8\"/><path d=\"M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4\"/>", "sparkles": "<path d=\"M12 3l1.8 4.6L18.5 9l-4.7 1.6L12 15l-1.8-4.4L5.5 9l4.7-1.4Z\"/><path d=\"M19 15l.8 2 2.2.8-2.2.8L19 21l-.8-2.4-2.2-.8 2.2-.8Z\"/>", "check": "<path d=\"M20 6 9 17l-5-5\"/>", "check-circle": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"m8 12 3 3 5-6\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "minus": "<path d=\"M5 12h14\"/>", "x": "<path d=\"M18 6 6 18M6 6l12 12\"/>", "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\"/>", "chevron-down": "<path d=\"m6 9 6 6 6-6\"/>", "arrow-right": "<path d=\"M5 12h14\"/><path d=\"m13 6 6 6-6 6\"/>", "arrow-left": "<path d=\"M19 12H5\"/><path d=\"m11 6-6 6 6 6\"/>", "map": "<path d=\"m9 4-6 2.5v14L9 18l6 2.5 6-2.5v-14L15 6.5 9 4Z\"/><path d=\"M9 4v14M15 6.5v14\"/>", "loader": "<path d=\"M21 12a9 9 0 1 1-6.2-8.6\"/>", "info": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M12 16v-4M12 8h.01\"/>", "alert": "<path d=\"M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z\"/><path d=\"M12 9v4M12 17h.01\"/>", "lock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>", "unlock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 7.8-1.2\"/>", "send": "<path d=\"M22 2 11 13\"/><path d=\"M22 2 15 22l-4-9-9-4 20-7Z\"/>", "user": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/>", "receipt": "<path d=\"M5 2v20l3-2 2 2 2-2 2 2 2-2 3 2V2l-3 2-2-2-2 2-2-2-2 2-3-2Z\"/><path d=\"M9 8h6M9 12h6M9 16h4\"/>", "rotate": "<path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5\"/>", "ruler": "<path d=\"M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z\"/><path d=\"m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2\"/>", "grid": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>", "star": "<path d=\"M12 2.8 14.9 9l6.6.6-5 4.4 1.5 6.5L12 17.1 6 20.5l1.5-6.5-5-4.4L9.1 9Z\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M12 7v5l3 2\"/>", "coins": "<circle cx=\"8\" cy=\"8\" r=\"5.5\"/><path d=\"M18.1 10.4A5.5 5.5 0 1 1 10.4 18\"/><path d=\"M7 6h1v4M16.7 13.9l.7.7-2.8 2.8\"/>", "list": "<path d=\"M9 6h12M9 12h12M9 18h12\"/><path d=\"m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2\"/>", "glass": "<path d=\"M7 3h10l-1 8a4 4 0 0 1-8 0L7 3Z\"/><path d=\"M12 15v6M8 21h8\"/>", "click": "<path d=\"M9 9l5 12 1.8-5.2L21 14 9 9Z\"/><path d=\"M7.2 2.2 8 5.1M5.1 8l-2.9-.8M14 4.1 12 6.2M6.2 12 4.1 14\"/>", "instagram": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M17.5 6.5h.01\"/>", "facebook": "<path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z\"/>", "globe": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M2.5 12h19\"/><path d=\"M12 2.5a14.5 14.5 0 0 1 0 19M12 2.5a14.5 14.5 0 0 0 0 19\"/>", "external": "<path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>", "arrow-up": "<path d=\"M12 19V5\"/><path d=\"m5 12 7-7 7 7\"/>"};
const ic = (name, cls) => `<svg viewBox="0 0 24 24" class="${cls || 'w-5 h-5'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
function elephantSVG() {
  const leg = (cls, x, y, fill) => `<g class="el-leg ${cls}"><rect x="${x}" y="${y}" width="19" height="44" rx="9" fill="${fill}"/><circle cx="${x + 5}" cy="${y + 41}" r="2.2" fill="#e0f2fe" opacity=".85"/><circle cx="${x + 9.5}" cy="${y + 42}" r="2.2" fill="#e0f2fe" opacity=".85"/><circle cx="${x + 14}" cy="${y + 41}" r="2.2" fill="#e0f2fe" opacity=".85"/></g>`;
  return `<svg viewBox="0 0 270 200" class="mascot w-full h-auto overflow-visible" aria-hidden="true">
    <ellipse class="el-shadow" cx="118" cy="188" rx="74" ry="7" fill="#000" opacity=".45"/>
    <g class="el-dust"><circle cx="54" cy="178" r="7" fill="#94a3b8"/><circle cx="44" cy="174" r="5" fill="#94a3b8"/><circle cx="62" cy="182" r="4" fill="#cbd5e1"/></g>
    <g class="el-bob">
      <path class="el-tail" d="M54 100 C 42 108, 40 118, 35 126" stroke="#1d4ed8" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${leg('el-leg-b', 70, 128, '#1e40af')}
      ${leg('el-leg-a', 136, 128, '#1e40af')}
      <ellipse class="el-belly" cx="112" cy="104" rx="64" ry="44" fill="url(#elBodyG)"/>
      <ellipse cx="108" cy="124" rx="40" ry="13" fill="#fff" opacity=".07"/>
      <path d="M68 78 Q112 64 156 78 L152 112 Q112 122 72 112 Z" fill="url(#elBlanketG)" opacity=".92"/>
      <path d="M72 112 Q112 122 152 112" stroke="#0f172a" stroke-width="2" stroke-dasharray="3 4" fill="none" opacity=".5"/>
      <g class="el-box3"><rect x="92" y="20" width="30" height="26" rx="2.5" fill="url(#ilK)"/><rect x="104" y="20" width="6" height="26" fill="#fff" opacity=".45"/></g>
      <g class="el-box1"><rect x="80" y="44" width="38" height="30" rx="2.5" fill="url(#ilK)"/><rect x="80" y="44" width="38" height="5" fill="#c88a45" opacity=".6"/><rect x="96" y="44" width="6" height="30" fill="#fff" opacity=".45"/></g>
      <g class="el-box2"><rect x="120" y="50" width="32" height="24" rx="2.5" fill="url(#ilKK)"/><rect x="133" y="50" width="6" height="24" fill="#fff" opacity=".35"/></g>
      <path d="M76 76 Q112 66 152 76" stroke="#4cc3f5" stroke-width="2.5" fill="none" opacity=".8"/>
      ${leg('el-leg-a', 82, 132, '#3b82f6')}
      ${leg('el-leg-b', 150, 132, '#3b82f6')}
      <circle cx="178" cy="90" r="36" fill="url(#elHeadG)"/>
      <g class="el-ear"><ellipse cx="160" cy="94" rx="23" ry="31" fill="#2563eb"/><ellipse cx="158" cy="96" rx="14" ry="20" fill="#1d4ed8" opacity=".7"/></g>
      <g class="el-trunk">
        <path d="M202 102 C 216 122, 212 148, 230 160" stroke="#60a5fa" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M207 116 l8 -3 M209 128 l8 -2 M212 140 l8 0" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      </g>
      <g class="el-horn" stroke="#4cc3f5" stroke-width="3.5" fill="none" stroke-linecap="round">
        <path d="M226 52 q10 12 0 24"/><path d="M236 46 q15 18 0 36"/><path d="M246 40 q20 24 0 48"/>
      </g>
      <path d="M196 116 Q 208 126 218 120" stroke="#f8fafc" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="196" cy="102" rx="7" ry="3.5" fill="#f472b6" opacity=".3"/>
      <g class="el-eye"><ellipse cx="190" cy="80" rx="5.5" ry="6" fill="#0f172a"/><circle cx="192" cy="78" r="1.8" fill="#fff"/></g>
      <path d="M182 70 q8 -5 15 0" stroke="#1e3a8a" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>
    </g>
  </svg>`;
}
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const numFmt = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });
const volFmt = new Intl.NumberFormat(LOCALE, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const kmFmt = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });
const fmtMoney = n => numFmt.format(Math.round(n)) + ' RSD';
const fmtVol = v => volFmt.format(v) + ' m³';
const fmtKm = k => kmFmt.format(k) + ' km';
const wait = ms => new Promise(res => setTimeout(res, ms));
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const escapeHtml = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const has = sel => !!document.querySelector(sel);
let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  $('#toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
function countUp(el, to, ms, fmt) {
  if (!el) return;
  if (REDUCED) { el.textContent = fmt(to); return; }
  const start = performance.now();
  const step = now => {
    const t = Math.min(1, (now - start) / ms), e = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(to * e);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function freshState() {
  const counts = {}, md = {};
  Object.keys(ITEMS).forEach(k => { counts[k] = 0; if (ITEMS[k].md) md[k] = { d: false, m: false }; });
  return {
    mode: 'selidba', type: 'stan', size: null, sqm: null, counts, md, tab: 'dnevna',
    pkg: 'sami', boxType: 'troslojna',
    from: { addr: '', floor: 0, lift: false, loc: null },
    to: { addr: '', floor: 0, lift: false, loc: null },
    distance: null, durationMin: null, routeSource: null,
    simulating: false, submitting: false
  };
}
let state = freshState();
let R = JSON.parse(JSON.stringify(DEFAULT_RULES));
let lastQuote = null;
function saveState() {
  try {
    const copy = Object.assign({}, state, { simulating: false, submitting: false });
    copy.from = Object.assign({}, state.from, { loc: null });
    copy.to = Object.assign({}, state.to, { loc: null });
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(copy));
  } catch (e) { }
}
function loadState() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    if (!raw) return;
    const saved = JSON.parse(raw), base = freshState();
    Object.keys(base.counts).forEach(k => { if (saved.counts && Number.isFinite(saved.counts[k])) base.counts[k] = Math.max(0, saved.counts[k]); });
    Object.keys(base.md).forEach(k => { if (saved.md && saved.md[k]) base.md[k] = { d: !!saved.md[k].d, m: !!saved.md[k].m }; });
    ['mode', 'type', 'size', 'sqm', 'pkg', 'boxType', 'tab', 'distance', 'durationMin', 'routeSource'].forEach(k => { if (saved[k] !== undefined) base[k] = saved[k]; });
    ['from', 'to'].forEach(k => { if (saved[k]) base[k] = Object.assign(base[k], saved[k], { loc: null }); });
    if (!CATS.some(c => c[0] === base.tab)) base.tab = 'dnevna';
    state = base;
  } catch (e) { }
}
function clearSaved() { try { localStorage.removeItem(CONFIG.storageKey); } catch (e) { } }
let db = null;
function mergeRules(src) {
  if (!src || typeof src !== 'object') return;
  Object.keys(DEFAULT_RULES).forEach(k => {
    const v = src[k];
    if (v === undefined || v === null) return;
    if (Array.isArray(DEFAULT_RULES[k])) { if (Array.isArray(v) && v.length === DEFAULT_RULES[k].length && v.every(Number.isFinite)) R[k] = v.map(Number); return; }
    if (typeof DEFAULT_RULES[k] === 'object') {
      Object.keys(DEFAULT_RULES[k]).forEach(sub => {
        const pair = v[sub];
        if (Array.isArray(pair) && pair.length === 2 && pair.every(x => Number.isFinite(Number(x)))) R[k][sub] = pair.map(Number);
      });
      return;
    }
    if (Number.isFinite(Number(v))) R[k] = Number(v);
  });
}
async function initDb() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') return;
  try {
    db = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);
    const { data, error } = await db.from('config').select('*').order('id', { ascending: true }).limit(1).maybeSingle();
    if (error) throw error;
    if (data) {
      let p = data.pravila;
      if (typeof p === 'string') { try { p = JSON.parse(p); } catch (e) { p = null; } }
      mergeRules(p);
    }
  } catch (err) {
    console.warn('config:', err && err.message);
  }
  if (typeof update === 'function' && has('#inventory')) update();
}
let mapsPromise = null;
function loadMaps() {
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise(resolve => {
    if (window.google && window.google.maps && window.google.maps.importLibrary) { resolve(true); return; }
    let done = false;
    const finish = ok => { if (!done) { done = true; resolve(ok); } };
    window.__psMaps = () => finish(true);
    window.gm_authFailure = () => finish(false);
    const s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(CONFIG.googleKey) +
      '&loading=async&libraries=places,routes&region=RS&language=' + encodeURIComponent(MAPS_LANG) + '&v=weekly&callback=__psMaps';
    s.async = true; s.defer = true;
    s.onerror = () => finish(false);
    document.head.appendChild(s);
    setTimeout(() => finish(false), 15000);
  });
  return mapsPromise;
}
let placesLib = null;
function setupAddressField(input, side) {
  const wrap = input.parentNode;
  const list = document.createElement('ul');
  list.className = 'sugg'; list.id = 'sugg-' + side; list.hidden = true;
  list.setAttribute('role', 'listbox');
  wrap.appendChild(list);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', list.id);
  let items = [], active = -1, timer = null, seq = 0;
  let token = new placesLib.AutocompleteSessionToken();
  const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); active = -1; };
  const highlight = i => { active = i; $$('li[data-i]', list).forEach((li, n) => li.setAttribute('aria-selected', String(n === i))); };
  const render = () => {
    list.innerHTML = items.map((s, i) => `<li role="option" data-i="${i}" aria-selected="false">${escapeHtml(s.text)}</li>`).join('') + '<li class="attr" aria-hidden="true">powered by Google</li>';
    list.hidden = !items.length;
    input.setAttribute('aria-expanded', String(!!items.length));
  };
  async function choose(i) {
    const s = items[i]; if (!s) return;
    input.value = s.text; close();
    state[side].addr = s.text; state[side].loc = null;
    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({ fields: ['location', 'formattedAddress'] });
      state[side].loc = place.location;
    } catch (e) { }
    token = new placesLib.AutocompleteSessionToken();
    if (state.distance != null) { resetRoute(); update(); }
    saveState();
  }
  async function fetchSuggestions(q) {
    const req = { input: q, includedRegionCodes: ['rs'], sessionToken: token, language: MAPS_LANG };
    try { return await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(req); }
    catch (e) { delete req.language; return await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(req); }
  }
  input.addEventListener('input', () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 3) { items = []; close(); return; }
    timer = setTimeout(async () => {
      const my = ++seq;
      try {
        const { suggestions } = await fetchSuggestions(q);
        if (my !== seq) return;
        items = suggestions.filter(s => s.placePrediction).slice(0, 5).map(s => ({
          text: (s.placePrediction.text && s.placePrediction.text.text) || String(s.placePrediction.text),
          prediction: s.placePrediction
        }));
        active = -1; render();
      } catch (e) { items = []; close(); }
    }, 220);
  });
  input.addEventListener('keydown', e => {
    if (list.hidden) return;
    const n = items.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); highlight((active + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight((active - 1 + n) % n); }
    else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); e.stopPropagation(); choose(active); }
    else if (e.key === 'Escape') close();
  });
  list.addEventListener('mousedown', e => {
    e.preventDefault();
    const li = e.target.closest('li[data-i]'); if (li) choose(+li.dataset.i);
  });
  input.addEventListener('blur', () => setTimeout(close, 120));
}
let addressReady = false;
async function initAddressSearch() {
  if (addressReady || !has('#fromAddr')) return;
  addressReady = true;
  const ok = await loadMaps();
  if (!ok) return;
  try {
    placesLib = await google.maps.importLibrary('places');
    setupAddressField($('#fromAddr'), 'from');
    setupAddressField($('#toAddr'), 'to');
  } catch (e) { }
}
async function routeMeters(from, to) {
  try {
    const { Route } = await google.maps.importLibrary('routes');
    const { routes } = await Route.computeRoutes({ origin: from, destination: to, travelMode: 'DRIVING', fields: ['distanceMeters', 'durationMillis'] });
    if (routes && routes[0] && routes[0].distanceMeters != null) return { m: routes[0].distanceMeters, ms: routes[0].durationMillis || null };
  } catch (e) { }
  const wp = w => typeof w === 'string' ? { address: w } : { location: { latLng: { latitude: w.lat(), longitude: w.lng() } } };
  const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': CONFIG.googleKey, 'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration' },
    body: JSON.stringify({ origin: wp(from), destination: wp(to), travelMode: 'DRIVE', regionCode: 'RS', languageCode: MAPS_LANG })
  });
  if (!res.ok) throw new Error('Routes ' + res.status);
  const j = await res.json();
  const r = j.routes && j.routes[0];
  if (!r || r.distanceMeters == null) throw new Error('no route');
  return { m: r.distanceMeters, ms: r.duration ? parseInt(r.duration, 10) * 1000 : null };
}
async function computeDistance() {
  const ok = await loadMaps();
  if (!ok) throw new Error('maps');
  const pick = side => state[side].loc || `${state[side].addr}, Srbija`;
  const r = await routeMeters(pick('from'), pick('to'));
  const km = Math.round(r.m / 100) / 10;
  const min = r.ms ? Math.round(r.ms / 60000) : Math.round(km / 40 * 60);
  return { km, min, source: 'google' };
}
let reviewsLoaded = false;
async function loadReviews() {
  if (reviewsLoaded || !has('#revGrid')) return;
  reviewsLoaded = true;
  const grid = $('#revGrid'), status = $('#revStatus'), summary = $('#revSummary');
  status.textContent = T.rev.loading;
  const ok = await loadMaps();
  try {
    if (!ok) throw new Error('maps');
    const { Place } = await google.maps.importLibrary('places');
    const place = new Place({ id: CONFIG.placeId, requestedLanguage: MAPS_LANG });
    await place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] });
    const reviews = (place.reviews || []).filter(r => r && (r.text || r.rating));
    if (place.googleMapsURI) $$('[data-rev-all]').forEach(a => { a.href = place.googleMapsURI; });
    if (place.rating) {
      const full = Math.round(place.rating);
      summary.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="font-display text-5xl font-bold text-white tabular">${place.rating.toFixed(1).replace('.', LANG === 'en' ? '.' : ',')}</div>
          <div>
            <div class="flex gap-0.5 text-amber-300">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="${i <= full ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${ICONS.star}</svg>`).join('')}</div>
            <div class="text-sm text-slate-400 mt-1">${escapeHtml(T.rev.count(place.userRatingCount || reviews.length))}</div>
          </div>
        </div>`;
      summary.hidden = false;
    }
    if (!reviews.length) throw new Error('none');
    grid.innerHTML = reviews.slice(0, 5).map((r, i) => {
      const a = r.authorAttribution || {};
      const stars = Math.round(r.rating || 0);
      const text = String(r.text || '').trim();
      const initial = escapeHtml(String(a.displayName || '?').trim().charAt(0).toUpperCase());
      return `
        <article class="glass pointer-glow p-5 flex flex-col on-scroll in" style="transition-delay:${i * .06}s">
          <div class="flex items-center gap-3">
            ${a.photoURI ? `<img src="${escapeHtml(a.photoURI)}" alt="" class="w-10 h-10 rounded-full object-cover" loading="lazy" referrerpolicy="no-referrer">` : `<span class="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">${initial}</span>`}
            <div class="min-w-0">
              ${a.uri ? `<a href="${escapeHtml(a.uri)}" target="_blank" rel="noopener" class="font-bold text-white hover:text-acc truncate block">${escapeHtml(a.displayName || '')}</a>` : `<div class="font-bold text-white truncate">${escapeHtml(a.displayName || '')}</div>`}
              <div class="text-xs text-slate-500">${escapeHtml(r.relativePublishTimeDescription || '')}</div>
            </div>
          </div>
          <div class="flex gap-0.5 text-amber-300 mt-3">${[1, 2, 3, 4, 5].map(k => `<svg viewBox="0 0 24 24" class="w-4 h-4" fill="${k <= stars ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${ICONS.star}</svg>`).join('')}</div>
          <p class="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-6">${escapeHtml(text)}</p>
        </article>`;
    }).join('');
    status.hidden = true;
  } catch (e) {
    status.textContent = T.rev.none;
  }
}
const floorIdx = f => Math.max(0, Math.min(6, Number(f) || 0));
function floorPct(p) {
  const f = Number(p.floor) || 0;
  return (p.lift ? R.sprat_sa_liftom : R.sprat_bez_lifta)[floorIdx(f)] || 0;
}
const roundTo = n => Math.round(n / (R.zaokruzi || 1)) * (R.zaokruzi || 1);
function calculate(t = T) {
  const nm = it => t === T ? it.label : (ITEM_ROWS.find(x => x[0] === it.id) || [])[4] || it.label;
  let volume = 0, itemCount = 0;
  const catCounts = {};
  CATS.forEach(c => { catCounts[c[0]] = 0; });
  Object.values(ITEMS).forEach(it => {
    const n = state.counts[it.id] || 0;
    volume += n * it.vol; itemCount += n; catCounts[it.cat] += n;
  });
  volume = Math.round(volume * 100) / 100;
  const hasCargo = itemCount > 0;
  const isTruck = volume > R.kombi_m3;
  const vehicle = isTruck ? 'kamion' : 'kombi';
  const cap = isTruck ? R.kamion_m3 : R.kombi_m3;
  const trips = isTruck && volume > R.kamion_m3 ? Math.ceil(volume / R.kamion_m3) : 1;
  const startFee = isTruck ? R.kamion_start : R.kombi_start;
  const perKm = isTruck ? R.kamion_km : R.kombi_km;
  const km = state.distance != null ? state.distance : null;
  const kmFee = km != null ? km * perKm : 0;
  const lines = [];
  const add = (key, label, sub, val) => lines.push({ key, label, sub, val: Math.round(val) });
  const callUs = state.mode === 'selidba' && [state.from, state.to].some(p => !p.lift && Number(p.floor) >= 7);
  add('vehicle', t.lines.vehicle(t.vehicles[vehicle]), t.lines.vehicleSub, startFee);
  if (km != null) add('transport', t.lines.transport, `${fmtKm(km)} × ${fmtMoney(perKm)}`, kmFee);
  let sub = startFee + kmFee, pct = 0, floorFee = 0, minimum, total;
  if (state.mode === 'kombi') {
    add('note', t.lines.kombiOnly, '', 0);
    minimum = R.min_kombi;
  } else {
    const volFee = volume * R.cena_m3;
    add('volume', t.lines.volume, `${fmtVol(volume)} × ${fmtMoney(R.cena_m3)}`, volFee);
    sub += volFee;
    Object.values(ITEMS).forEach(it => {
      const n = state.counts[it.id] || 0;
      if (!n || !it.md) return;
      const sel = state.md[it.id] || {};
      if (!sel.d && !sel.m) return;
      const price = R.montaza[it.md] || [0, 0];
      const one = (sel.m ? price[0] : 0) + (sel.d ? price[1] : 0);
      add('md', t.lines.md(nm(it), sel.d, sel.m), `${n} × ${fmtMoney(one)}`, n * one);
      sub += n * one;
    });
    Object.values(ITEMS).forEach(it => {
      const n = state.counts[it.id] || 0;
      if (!n || !it.protect) return;
      add('protect', t.lines.protect(nm(it)), `${n} × ${fmtMoney(R.zastita)}`, n * R.zastita);
      sub += n * R.zastita;
    });
    const floorsNoLift = [state.from, state.to].reduce((a, p) => a + (p.lift ? 0 : Math.min(Number(p.floor) || 0, 7)), 0);
    Object.values(ITEMS).forEach(it => {
      const n = state.counts[it.id] || 0;
      if (!n || !it.heavy) return;
      const [base, perFloor] = R.teski[it.heavy] || [0, 0];
      const val = n * (base + perFloor * floorsNoLift);
      add('heavy', t.lines.heavy(nm(it)), t.lines.heavySub(fmtMoney(base), fmtMoney(perFloor), floorsNoLift), val);
      sub += val;
    });
    if (state.pkg === 'mi') {
      const matStd = state.boxType === 'petoslojna' ? R.kutija_petoslojna : R.kutija_troslojna;
      const mats = { kutija: matStd, velikakutija: R.kutija_petoslojna, garderober: R.kutija_garderober };
      Object.values(ITEMS).forEach(it => {
        const n = state.counts[it.id] || 0;
        if (!n || !it.box) return;
        const one = R.kutija_rad + mats[it.box];
        add('boxes', t.lines.boxes(`${n} × ${t.boxNames[it.box]}`), t.lines.boxesSub(fmtMoney(R.kutija_rad), fmtMoney(mats[it.box])), n * one);
        sub += n * one;
      });
    }
    pct = floorPct(state.from) + floorPct(state.to);
    floorFee = sub * pct / 100;
    if (pct > 0) add('floors', t.lines.floors(pct), t.lines.floorsSub(t.floorShort(Number(state.from.floor), state.from.lift), t.floorShort(Number(state.to.floor), state.to.lift)), floorFee);
    minimum = R.min_selidba;
  }
  const rounded = roundTo(sub + floorFee);
  total = Math.max(rounded, minimum);
  if (hasCargo && total > rounded) add('minimum', t.lines.minimum, t.lines.minimumSub(fmtMoney(minimum)), total - rounded);
  if (!hasCargo) total = 0;
  return { volume, itemCount, catCounts, hasCargo, isTruck, vehicle, cap, trips, km, pct, callUs, lines, total };
}
function leadDetails(r) {
  const fl = p => ({ sprat: Number(p.floor) >= 7 ? '7+' : Number(p.floor), lift: !!p.lift });
  const size = SPACE_SIZES.find(s => s[0] === state.size);
  return {
    jezik: LANG,
    usluga: state.mode === 'kombi' ? 'Samo kombi sa vozačem' : 'Selidba sa ekipom',
    prostor: TXT.sr.types[state.type] || null,
    velicina: size ? TXT.sr.sizes[size[0]] : null,
    inventar: Object.keys(state.counts).filter(id => state.counts[id] > 0).map(id => {
      const row = ITEM_ROWS.find(x => x[0] === id);
      const o = { naziv: row ? row[4] : id, kom: state.counts[id], m3: Math.round(ITEMS[id].vol * state.counts[id] * 100) / 100 };
      if (ITEMS[id].md && state.md[id]) { o.demontaza = !!state.md[id].d; o.montaza = !!state.md[id].m; }
      return o;
    }),
    utovar: fl(state.from), istovar: fl(state.to),
    pakovanje: state.pkg === 'mi' ? 'Mi pakujemo (' + (state.boxType === 'petoslojna' ? 'petoslojne' : 'troslojne') + ')' : 'Pakuju sami',
    vozilo: TXT.sr.vehicles[r.vehicle],
    ture: r.trips,
    ruta_izvor: state.routeSource === 'google' ? 'Google mape' : 'ručno',
    trajanje_min: state.durationMin,
    napomena: r.callUs ? 'Sprat 7+ bez lifta – pozvati klijenta za tačnu cenu' : null,
    obracun: calculate(TXT.sr).lines.filter(l => l.key !== 'note').map(l => ({ stavka: l.label, opis: l.sub, iznos: l.val }))
  };
}
function renderModes() {
  $('#svcModes').innerHTML = ['selidba', 'kombi'].map(m => `
    <button type="button" class="tilt-card pointer-glow p-4 sm:p-5 ${state.mode === m ? 'active' : ''}" data-mode="${m}" aria-pressed="${state.mode === m}">
      <span class="tilt-dot"></span>
      <span class="tilt-icon text-slate-400 block mb-2">${ic(m === 'selidba' ? 'boxes' : 'truck', 'w-7 h-7')}</span>
      <span class="block font-bold text-white">${T.modes[m][0]}</span>
      <span class="block text-xs text-slate-400 mt-1 leading-snug">${T.modes[m][1]}</span>
    </button>`).join('');
  $$('[data-only-selidba]').forEach(el => { el.hidden = state.mode !== 'selidba'; });
}
function renderSpaceTypes() {
  $('#spaceTypes').innerHTML = SPACE_TYPES.map(([id, icn]) => `
    <button type="button" class="tilt-card pointer-glow p-3 sm:p-4 flex sm:block items-center gap-3 ${state.type === id ? 'active' : ''}" data-type="${id}" aria-pressed="${state.type === id}">
      <span class="tilt-dot"></span>
      <span class="tilt-icon text-slate-400 block shrink-0 sm:mb-2.5">${ic(icn, 'w-6 h-6 sm:w-7 sm:h-7')}</span>
      <span class="block min-w-0 pr-5 sm:pr-0">
        <span class="block font-bold text-white text-sm sm:text-base break-words">${T.types[id]}</span>
        <span class="block text-[11px] text-slate-500">${T.typeSubs[id]}</span>
      </span>
    </button>`).join('');
}
function renderSizes() {
  $('#spaceSizes').innerHTML = SPACE_SIZES.map(([id, sqm]) => `
    <button type="button" class="tilt-card pointer-glow p-4 ${state.size === id ? 'active' : ''}" data-size="${id}" aria-pressed="${state.size === id}">
      <span class="tilt-dot"></span>
      <span class="block font-bold text-white text-sm hyph pr-4">${T.sizes[id]}</span>
      <span class="block text-[11px] text-slate-500">~${sqm} m²</span>
    </button>`).join('');
  const sq = $('#sqmInput');
  if (sq && document.activeElement !== sq) sq.value = state.sqm ? state.sqm : '';
}
function renderTabs() {
  const r = calculate();
  $('#invTabs').innerHTML = CATS.map(([id, icn]) => `
    <button type="button" role="tab" aria-selected="${state.tab === id}" class="inv-tab ${state.tab === id ? 'active' : ''} flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 text-left" data-tab="${id}">
      <span class="inv-tab-icon shrink-0 hidden sm:inline">${ic(icn, 'w-4 h-4')}</span>
      <span class="text-xs font-bold leading-tight flex-1 min-w-0 hyph">${T.cats[id]}</span>
      <span class="text-[10px] font-extrabold tabular px-1.5 py-0.5 rounded-md ${r.catCounts[id] ? 'bg-acc text-brand-900' : 'bg-white/[0.06] text-slate-500'}" data-tabcount="${id}">${r.catCounts[id]}</span>
    </button>`).join('');
}
function mdChips(it) {
  if (!it.md || state.mode !== 'selidba') return '';
  const sel = state.md[it.id] || {};
  const price = R.montaza[it.md] || [0, 0];
  return `<div class="mt-2 flex flex-wrap gap-1.5 justify-center">
    <label class="md-chip ${sel.d ? 'on' : ''}" title="${fmtMoney(price[1])}"><input type="checkbox" data-md="d" data-id="${it.id}" ${sel.d ? 'checked' : ''}>${T.dem}</label>
    <label class="md-chip ${sel.m ? 'on' : ''}" title="${fmtMoney(price[0])}"><input type="checkbox" data-md="m" data-id="${it.id}" ${sel.m ? 'checked' : ''}>${T.mon}</label>
  </div>`;
}
function renderInventory() {
  const items = Object.values(ITEMS).filter(it => it.cat === state.tab);
  $('#inventory').innerHTML = items.map((it, i) => `
    <div class="item-card p-2.5 flex flex-col" data-row="${it.id}" style="animation-delay:${i * 0.03}s">
      <span class="item-badge" data-badge="${it.id}">0</span>
      ${it.heavy || it.protect ? `<span class="absolute top-2 left-2 z-10 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-acc/15 text-acc border border-acc/30">${T.special}</span>` : ''}
      <div class="item-art" data-act="inc" data-id="${it.id}" role="button" tabindex="-1" aria-label="+ ${escapeHtml(it.label)}">${illSvg(it.id)}</div>
      <div class="mt-2 px-1 flex-1">
        <div class="text-[13px] sm:text-sm font-bold text-white leading-tight hyph">${escapeHtml(it.label)}</div>
        <div class="text-[11px] text-slate-500 mt-0.5 tabular">${volFmt.format(it.vol)} m³</div>
      </div>
      <div class="mt-2 flex justify-center">
        <div class="seg">
          <button type="button" class="seg-btn" data-act="dec" data-id="${it.id}" aria-label="− ${escapeHtml(it.label)}">${ic('minus', 'w-4 h-4')}</button>
          <span class="seg-val" data-count="${it.id}">0</span>
          <button type="button" class="seg-btn" data-act="inc" data-id="${it.id}" aria-label="+ ${escapeHtml(it.label)}">${ic('plus', 'w-4 h-4')}</button>
        </div>
      </div>
      <div data-mdwrap="${it.id}">${mdChips(it)}</div>
    </div>`).join('');
}
function renderRouteControls() {
  const opts = T.floors.map((l, i) => `<option value="${i}">${l}</option>`).join('');
  ['from', 'to'].forEach(side => {
    const sel = $('#' + side + 'Floor');
    sel.innerHTML = opts;
    sel.value = String(Math.min(7, Number(state[side].floor) || 0));
    $('#' + side + 'Addr').value = state[side].addr;
  });
  $$('.toggle[data-elev]').forEach(t => $$('button', t).forEach(b => b.classList.toggle('active', (b.dataset.v === 'da') === !!state[t.dataset.elev].lift)));
}
function renderPackaging() {
  $('#packaging').innerHTML = ['sami', 'mi'].map(p => `
    <button type="button" class="tilt-card pointer-glow p-3 sm:p-4 ${state.pkg === p ? 'active' : ''}" data-pkg="${p}" aria-pressed="${state.pkg === p}">
      <span class="tilt-dot"></span>
      <span class="tilt-icon text-slate-400 block mb-2">${ic(p === 'sami' ? 'user' : 'package', 'w-6 h-6')}</span>
      <span class="block font-bold text-white text-sm hyph pr-4">${T.pkg[p][0]}</span>
      <span class="block text-[11px] text-slate-500 mt-0.5 leading-snug">${T.pkg[p][1]}</span>
    </button>`).join('');
  $('#boxTypeWrap').hidden = state.pkg !== 'mi';
  $$('#boxTypeWrap button').forEach(b => b.classList.toggle('active', b.dataset.box === state.boxType));
}
function buildSkyline(kind) {
  let seed = kind === 'far' ? 7 : 31;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const H = 160, W = 1200;
  let x = 0, out = '';
  const base = kind === 'far' ? '#0f2a55' : '#0a1d3f';
  while (x < W) {
    const w = kind === 'far' ? 34 + rnd() * 50 : 40 + rnd() * 60;
    const h = kind === 'far' ? 50 + rnd() * 90 : 40 + rnd() * 80;
    out += `<rect x="${x.toFixed(1)}" y="${(H - h).toFixed(1)}" width="${(w - 3).toFixed(1)}" height="${h.toFixed(1)}" fill="${base}"/>`;
    if (kind === 'near') {
      for (let wy = H - h + 8; wy < H - 10; wy += 14) {
        for (let wx = x + 6; wx < x + w - 10; wx += 11) {
          const r = rnd();
          if (r > 0.55) out += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7" style="fill:${r > 0.85 ? '#fde68a' : '#4cc3f5'}" opacity="${(0.3 + r * 0.5).toFixed(2)}" ${r > 0.93 ? 'class="win-flicker"' : ''}/>`;
        }
      }
    } else if (rnd() > 0.6) {
      out += `<rect x="${(x + w / 2 - 1).toFixed(1)}" y="${(H - h - 10).toFixed(1)}" width="2" height="10" fill="${base}"/><circle cx="${(x + w / 2).toFixed(1)}" cy="${(H - h - 11).toFixed(1)}" r="1.8" fill="#f43f5e" class="win-flicker"/>`;
    }
    x += w;
  }
  if (kind === 'far') out += '<rect x="602" y="20" width="6" height="140" fill="#123366"/><path d="M596 46 h18 l-3 14 h-12 z" fill="#17407c"/><rect x="604" y="2" width="2" height="18" fill="#123366"/><circle cx="605" cy="2" r="2.2" fill="#f43f5e" class="win-flicker"/>';
  const svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${out}</svg>`;
  return svg + svg;
}
function renderStage(mode) {
  const box = $('#stageStatus');
  if (!box) return;
  if (mode === 'loading') {
    box.innerHTML = `
      <div class="inline-flex flex-col gap-2 max-w-full rounded-xl bg-brand-900/85 border border-acc/40 px-4 py-2.5 backdrop-blur-md">
        <div class="flex items-center gap-2 text-sm font-bold text-white">${ic('loader', 'w-4 h-4 text-acc spin')}<span>${T.stageLoading}</span></div>
        <div class="h-1 w-56 max-w-full rounded-full bg-white/10 overflow-hidden"><div class="sim-progress h-full rounded-full bg-gradient-to-r from-acc to-price"></div></div>
      </div>`;
  } else if (state.distance != null) {
    const src = state.routeSource === 'google'
      ? `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-price/10 text-price-soft border border-price/30">${T.google}</span>`
      : `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">${T.approx}</span>`;
    box.innerHTML = `
      <div class="km-pop inline-flex flex-wrap items-center gap-x-3 gap-y-1 max-w-full rounded-xl bg-brand-900/85 border border-price/40 px-4 py-2.5 backdrop-blur-md">
        <span class="font-display text-3xl font-bold text-price tabular leading-none"><span id="kmCounter">${kmFmt.format(state.distance)}</span> km</span>
        ${src}
        ${state.durationMin ? `<span class="text-xs text-slate-400">~${state.durationMin} ${T.stageMin}</span>` : ''}
      </div>`;
  } else {
    box.innerHTML = `<div class="inline-flex items-center gap-2 rounded-xl bg-brand-900/75 border border-white/10 px-3 py-2 text-xs text-slate-300 backdrop-blur-md">${ic('map', 'w-4 h-4 text-acc')}<span>${T.stageIdle}</span></div>`;
  }
}
function placeElephant(where) {
  const wrap = $('#elWrap'), stage = $('#mapStage'), prog = $('#routeProgress');
  if (!wrap) return;
  if (where === 'end') {
    wrap.style.left = Math.max(0, stage.clientWidth * 0.97 - wrap.offsetWidth) + 'px';
    prog.style.width = '100%';
  } else {
    wrap.style.left = '3%';
    prog.style.transition = 'width .6s ease';
    prog.style.width = '0%';
    setTimeout(() => { prog.style.transition = ''; }, 650);
  }
}
function confettiBurst() {
  if (REDUCED) return;
  const layer = $('#confettiLayer'), stage = $('#mapStage'), pin = $('#pinB');
  const sr = stage.getBoundingClientRect(), pr = pin.getBoundingClientRect();
  const cx = pr.left - sr.left + pr.width / 2, cy = pr.top - sr.top;
  const colors = ['#4cc3f5', '#34d399', '#5e95e8', '#fde68a', '#f472b6', '#bfe9fb'];
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    s.className = 'confetti';
    const ang = Math.PI * (1 + Math.random()), dist = 60 + Math.random() * 110;
    s.style.left = cx + 'px'; s.style.top = cy + 'px';
    s.style.background = colors[i % colors.length];
    s.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(0) + 'px');
    s.style.setProperty('--dy', (Math.sin(ang) * dist + 40).toFixed(0) + 'px');
    s.style.setProperty('--rot', (Math.random() * 720 - 360).toFixed(0) + 'deg');
    s.style.animationDelay = (Math.random() * 0.15).toFixed(2) + 's';
    layer.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }
}
function renderReceipt(el, r) {
  el.innerHTML = r.lines.filter(l => l.key !== 'note').map(l => `
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0"><div class="text-slate-200">${escapeHtml(l.label)}</div>${l.sub ? `<div class="text-[11px] text-slate-500 leading-snug">${escapeHtml(l.sub)}</div>` : ''}</div>
      <div class="font-bold tabular shrink-0 text-price">${fmtMoney(l.val)}</div>
    </div>`).join('') + (state.mode === 'kombi' ? `<div class="text-xs text-amber-300">${escapeHtml(T.lines.kombiOnly)}</div>` : '');
}
let lastVehicle = null;
const lastChipIds = new Set();
function update() {
  const r = calculate();
  Object.keys(state.counts).forEach(id => {
    const n = state.counts[id];
    const el = $(`[data-count="${id}"]`);
    if (el && el.textContent !== String(n)) { el.textContent = n; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    const badge = $(`[data-badge="${id}"]`); if (badge) badge.textContent = '×' + n;
    const row = $(`[data-row="${id}"]`); if (row) row.classList.toggle('has-count', n > 0);
    const dec = $(`.seg-btn[data-act="dec"][data-id="${id}"]`); if (dec) dec.disabled = n <= 0;
  });
  CATS.forEach(([id]) => {
    const t = $(`[data-tabcount="${id}"]`);
    if (t) { t.textContent = r.catCounts[id]; t.className = 'text-[10px] font-extrabold tabular px-1.5 py-0.5 rounded-md ' + (r.catCounts[id] ? 'bg-acc text-brand-900' : 'bg-white/[0.06] text-slate-500'); }
  });
  $('#invVolume').textContent = fmtVol(r.volume);
  $('#vehicleName').textContent = T.vehicles[r.vehicle];
  $('#vehicleTag').textContent = T.vehicles[r.vehicle].toUpperCase();
  $('#cargoBox').style.width = r.isTruck ? '72%' : '48%';
  $('#wheelMid').style.display = r.isTruck ? '' : 'none';
  if (lastVehicle && lastVehicle !== r.vehicle) {
    const tv = $('#truckViz');
    tv.classList.add('truck-drive');
    setTimeout(() => tv.classList.remove('truck-drive'), 900);
    toast(r.isTruck ? T.toTruck : T.toVan);
  }
  lastVehicle = r.vehicle;
  const pct = Math.min(100, (r.volume / r.cap) * 100);
  $('#cargoFill').style.height = pct + '%';
  $('#cargoPct').textContent = Math.round((r.volume / r.cap) * 100) + '%';
  const selected = Object.keys(state.counts).filter(id => state.counts[id] > 0).sort((a, b) => (ITEMS[b].vol * state.counts[b]) - (ITEMS[a].vol * state.counts[a]));
  const shown = selected.slice(0, 14);
  $('#cargoItems').innerHTML = shown.map(id => `<span class="cargo-chip" style="${lastChipIds.has(id) ? 'animation:none' : ''}" title="${escapeHtml(ITEMS[id].label)}">${illSvg(id)}<b class="text-[10px] text-acc-soft tabular">${state.counts[id]}</b></span>`).join('') +
    (selected.length > 14 ? `<span class="cargo-chip text-[10px] font-extrabold text-acc-soft px-1.5">+${selected.length - 14}</span>` : '');
  lastChipIds.clear(); shown.forEach(id => lastChipIds.add(id));
  $('#sumVolume').textContent = fmtVol(r.volume);
  $('#sumItems').textContent = r.itemCount;
  $('#sumKm').textContent = state.distance != null ? fmtKm(state.distance) : '— km';
  $('#cargoNote').innerHTML = !r.hasCargo
    ? `<span class="flex items-center gap-1.5">${ic('click', 'w-3.5 h-3.5 text-acc shrink-0')}${T.cargoEmpty}</span>`
    : r.trips > 1 ? `<span class="flex items-center gap-1.5 text-amber-300">${ic('alert', 'w-3.5 h-3.5 shrink-0')}${T.cargoTrips(r.trips)}</span>`
    : `<span class="flex items-center gap-1.5">${ic('check-circle', 'w-3.5 h-3.5 text-price shrink-0')}${T.cargoFill(T.vehicles[r.vehicle], Math.round(pct))}</span>`;
  const size = SPACE_SIZES.find(s => s[0] === state.size);
  const row = (ok, icn, text) => `<div class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${ok ? 'bg-price/15 text-price' : 'bg-white/[0.05] text-slate-600'}">${ic(ok ? 'check' : icn, 'w-3.5 h-3.5')}</span><span class="${ok ? 'text-slate-200' : 'text-slate-500'}">${text}</span></div>`;
  $('#checklist').innerHTML = [
    row(true, state.mode === 'kombi' ? 'truck' : 'boxes', T.modes[state.mode][0]),
    row(!!(size || state.sqm), 'home', (size || state.sqm) ? [T.types[state.type], size ? T.sizes[size[0]] : '', state.sqm ? state.sqm + ' m²' : ''].filter(Boolean).join(' · ') : T.check.space),
    row(r.hasCargo, 'boxes', r.hasCargo ? T.checkItems(r.itemCount, fmtVol(r.volume), T.vehicles[r.vehicle]) : T.check.items),
    row(state.distance != null, 'route', state.distance != null ? T.checkRoute(fmtKm(state.distance), T.floorShort(Number(state.from.floor), state.from.lift), T.floorShort(Number(state.to.floor), state.to.lift)) : T.check.route)
  ].join('');
  const care = [];
  if (state.mode === 'selidba') {
    Object.values(ITEMS).forEach(it => {
      const n = state.counts[it.id]; if (!n) return;
      const sel = state.md[it.id];
      if (it.md && sel && (sel.d || sel.m)) care.push(['wrench', `${it.label} ×${n}`]);
      if (it.protect) care.push(['shield', `${it.label} ×${n}`]);
      if (it.heavy) care.push(['alert', `${it.label} ×${n}`]);
    });
  }
  $('#careList').innerHTML = care.map(([icn, t]) => `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-acc/10 text-acc-soft border border-acc/30">${ic(icn, 'w-3 h-3')}${escapeHtml(t)}</span>`).join('');
  $('#floorWarn').hidden = !r.callUs;
  const done = { 1: !!state.size || !!state.sqm || state.mode === 'kombi', 2: r.itemCount > 0, 3: state.distance != null, 4: false };
  $$('.calc-step').forEach(el => el.classList.toggle('done', !!done[el.dataset.cs]));
  $('#mobileVolume').textContent = fmtVol(r.volume);
  $('#mobileVehicle').textContent = '· ' + T.vehicles[r.vehicle];
  if (!lastQuote) $('#mobileBar').classList.toggle('translate-y-full', !r.hasCargo);
  saveState();
  return r;
}
async function runRoute() {
  if (state.simulating) return;
  state.from.addr = $('#fromAddr').value.trim();
  state.to.addr = $('#toAddr').value.trim();
  if (state.from.addr.length < 3 || state.to.addr.length < 3) {
    toast(T.addrNeed);
    (state.from.addr.length < 3 ? $('#fromAddr') : $('#toAddr')).focus();
    return;
  }
  const manual = parseFloat(String($('#manualKm').value).replace(',', '.'));
  const useManual = !$('#manualKmWrap').hidden && manual > 0;
  state.simulating = true;
  $('#simBtn').disabled = true;
  const wrap = $('#elWrap'), stage = $('#mapStage'), inner = $('#elInner');
  wrap.classList.remove('walking', 'trumpet');
  placeElephant('start');
  await wait(120);
  renderStage('loading');
  wrap.classList.add('walking');
  stage.classList.add('running');
  placeElephant('end');
  let res = null;
  const job = useManual ? Promise.resolve({ km: Math.round(manual * 10) / 10, min: null, source: 'rucno' }) : computeDistance().catch(() => null);
  [res] = await Promise.all([job, wait(CONFIG.simMs)]);
  wrap.classList.remove('walking');
  stage.classList.remove('running');
  state.simulating = false;
  $('#simBtn').disabled = false;
  if (!res) {
    $('#manualKmWrap').hidden = false;
    placeElephant('start');
    state.distance = null;
    renderStage('idle');
    toast(T.routeFail);
    $('#manualKm').focus();
    update();
    return;
  }
  state.distance = res.km; state.durationMin = res.min; state.routeSource = res.source;
  inner.classList.remove('hop'); void inner.offsetWidth; inner.classList.add('hop');
  wrap.classList.add('trumpet');
  setTimeout(() => wrap.classList.remove('trumpet'), 1300);
  confettiBurst();
  renderStage('done');
  countUp($('#kmCounter'), res.km, 700, v => kmFmt.format(Math.round(v * 10) / 10));
  toast(T.routeOk(fmtKm(res.km)));
  const rr = update();
  if (rr && rr.hasCargo && !lastQuote && !leadAutoOpened) { leadAutoOpened = true; setTimeout(openLead, 1700); }
}
function resetRoute() {
  state.distance = null; state.durationMin = null; state.routeSource = null;
  const wrap = $('#elWrap');
  if (wrap) wrap.classList.remove('walking', 'trumpet');
  const st = $('#mapStage'); if (st) st.classList.remove('running');
  placeElephant('start');
  renderStage('idle');
}
function leadPayload(r, extra) {
  const p = {
    ime: $('#leadName').value.trim(),
    telefon: $('#leadPhone').value.trim(),
    pocetna_adresa: state.from.addr,
    krajnja_adresa: state.to.addr,
    kvadratura: state.sqm ? Math.round(state.sqm) : null,
    udaljenost_km: state.distance,
    zapremina_m3: Math.round(r.volume * 10) / 10,
    ukupna_cena: Math.round(r.total),
    status: CONFIG.leadStatus,
    created_at: new Date().toISOString()
  };
  if (extra) p.detalji = leadDetails(r);
  return p;
}
function showFormMsg(type, msg) {
  const el = $('#formMsg');
  if (!type) { el.hidden = true; return; }
  el.hidden = false;
  el.className = 'text-xs rounded-xl px-3 py-2.5 border ' + (type === 'ok' ? 'bg-price/10 border-price/30 text-price-soft' : 'bg-rose-500/10 border-rose-400/30 text-rose-300');
  el.textContent = msg;
}
function setSubmitting(on) {
  state.submitting = on;
  const btn = $('#submitBtn');
  btn.disabled = on;
  btn.innerHTML = on ? `${ic('loader', 'w-4 h-4 spin')}<span>${T.sending}</span>` : `${ic('unlock', 'w-4 h-4')}<span>${T.send}</span>`;
}
async function submitLead(e) {
  e.preventDefault();
  if (state.submitting) return;
  const nameEl = $('#leadName'), phoneEl = $('#leadPhone');
  nameEl.classList.remove('invalid'); phoneEl.classList.remove('invalid');
  showFormMsg(null);
  const r = calculate();
  if (!r.hasCargo) { toast(T.needItems); $('#inventory').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (state.distance == null) { toast(T.needRoute); $('#mapStage').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (nameEl.value.trim().length < 2) { nameEl.classList.add('invalid'); nameEl.focus(); showFormMsg('err', T.errName); return; }
  if (phoneEl.value.replace(/\D/g, '').length < 8) { phoneEl.classList.add('invalid'); phoneEl.focus(); showFormMsg('err', T.errPhone); return; }
  if ($('#leadWebsite').value) { onSubmitSuccess(r); return; }
  if (!db) { showFormMsg('err', T.errDb); return; }
  setSubmitting(true);
  try {
    let { error } = await db.from('leads').insert([leadPayload(r, true)]);
    if (error && ['PGRST204', '42703'].includes(error.code)) ({ error } = await db.from('leads').insert([leadPayload(r, false)]));
    if (error) throw error;
    onSubmitSuccess(r);
  } catch (err) {
    console.warn('leads:', err && err.message);
    showFormMsg('err', T.errSend);
  } finally {
    setSubmitting(false);
  }
}
function onSubmitSuccess(r) {
  lastQuote = r;
  const ime = $('#leadName').value.trim().split(' ')[0];
  $('#successText').textContent = T.thanks(ime, $('#leadPhone').value.trim());
  $('#modalMeta').textContent = `${fmtVol(r.volume)} · ${T.vehicles[r.vehicle]} · ${fmtKm(state.distance)}`;
  renderReceipt($('#modalReceipt'), r);
  $('#sentTotal').textContent = numFmt.format(r.total);
  $('#quoteModule').hidden = true;
  $('#sentModule').hidden = false;
  $('#mobileBar').classList.add('translate-y-full');
  closeLead();
  openModal();
  setTimeout(() => countUp($('#modalTotal'), r.total, 1200, v => numFmt.format(Math.round(v / 10) * 10)), 450);
  clearSaved();
}
function showDialog(id, focusSel) {
  const m = $('#' + id);
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (focusSel) setTimeout(() => { const f = $(focusSel); if (f) f.focus(); }, 350);
}
function hideDialog(id) {
  const m = $('#' + id);
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  if (!$$('.modal.open').length) document.body.style.overflow = '';
}
const openModal = () => showDialog('successModal', '#modalClose');
const closeModal = () => hideDialog('successModal');
let leadAutoOpened = false;
function openLead() {
  const r = calculate();
  if (lastQuote) { $('#modalTotal').textContent = numFmt.format(lastQuote.total); openModal(); return; }
  if (!r.hasCargo) { toast(T.needItems); $('#inventory').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (state.distance == null) { toast(T.needRoute); $('#mapStage').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  $('#leadSummary').innerHTML = $('#checklist').innerHTML;
  $('#leadCare').innerHTML = $('#careList').innerHTML;
  $('#leadCare').hidden = !$('#careList').children.length;
  $('#toast').classList.remove('show');
  showFormMsg(null);
  showDialog('leadModal', $('#leadName').value.trim() ? '#leadPhone' : '#leadName');
}
const closeLead = () => hideDialog('leadModal');
function resetAll() {
  state = freshState();
  lastQuote = null;
  clearSaved();
  ['leadName', 'leadPhone', 'leadWebsite', 'manualKm'].forEach(id => { $('#' + id).value = ''; $('#' + id).classList.remove('invalid'); });
  $('#manualKmWrap').hidden = true;
  leadAutoOpened = false;
  showFormMsg(null);
  $('#quoteModule').hidden = false;
  $('#sentModule').hidden = true;
  resetRoute();
  renderCalc();
  $('#kalkulator').scrollIntoView({ behavior: 'smooth' });
}
function changeCount(id, delta, fromArt) {
  state.counts[id] = Math.max(0, (state.counts[id] || 0) + delta);
  if (fromArt || delta > 0) {
    const art = $(`[data-row="${id}"] .item-art svg`);
    if (art) { art.classList.remove('art-bounce'); void art.getBoundingClientRect(); art.classList.add('art-bounce'); }
  }
  if (ITEMS[id].md && state.counts[id] === 0) state.md[id] = { d: false, m: false };
  const wrapMd = $(`[data-mdwrap="${id}"]`); if (wrapMd) wrapMd.innerHTML = mdChips(ITEMS[id]);
  update();
}
function bindCalc() {
  $('#svcModes').addEventListener('click', e => {
    const b = e.target.closest('[data-mode]'); if (!b) return;
    state.mode = b.dataset.mode;
    renderModes(); renderInventory(); update();
  });
  $('#spaceTypes').addEventListener('click', e => {
    const b = e.target.closest('[data-type]'); if (!b) return;
    state.type = b.dataset.type;
    if (state.type === 'kancelarija' && state.size !== 'office') state.size = 'office';
    else if (state.type !== 'kancelarija' && state.size === 'office') state.size = null;
    renderSpaceTypes(); renderSizes(); renderTabs(); renderInventory(); update();
  });
  $('#spaceSizes').addEventListener('click', e => {
    const b = e.target.closest('[data-size]'); if (!b) return;
    state.size = b.dataset.size;
    if (state.size === 'office') state.type = 'kancelarija'; else if (state.type === 'kancelarija') state.type = 'stan';
    renderSpaceTypes(); renderSizes(); renderTabs(); renderInventory(); update();
  });
  $('#sqmInput').addEventListener('input', e => {
    const v = parseInt(String(e.target.value).replace(/\D/g, ''), 10);
    state.sqm = v > 0 ? Math.min(v, 5000) : null;
    update();
  });
  $('#invTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-tab]'); if (!b) return;
    state.tab = b.dataset.tab;
    renderTabs(); renderInventory(); update();
  });
  $('#inventory').addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    changeCount(b.dataset.id, b.dataset.act === 'inc' ? 1 : -1, b.classList.contains('item-art'));
  });
  $('#inventory').addEventListener('change', e => {
    const c = e.target.closest('[data-md]'); if (!c) return;
    const id = c.dataset.id;
    if (!state.counts[id]) state.counts[id] = 1;
    state.md[id] = Object.assign({ d: false, m: false }, state.md[id], { [c.dataset.md]: c.checked });
    $(`[data-mdwrap="${id}"]`).innerHTML = mdChips(ITEMS[id]);
    update();
  });
  ['from', 'to'].forEach(side => {
    $('#' + side + 'Floor').addEventListener('change', e => { state[side].floor = Number(e.target.value); update(); });
    $('#' + side + 'Addr').addEventListener('input', e => {
      state[side].addr = e.target.value.trim(); state[side].loc = null;
      if (state.distance != null && !state.simulating) { resetRoute(); update(); toast(T.addrChanged); } else saveState();
    });
    $('#' + side + 'Addr').addEventListener('focus', initAddressSearch, { once: true });
    $('#' + side + 'Addr').addEventListener('keydown', e => { if (e.key === 'Enter') { const open = $('#sugg-' + side); if (!open || open.hidden) { e.preventDefault(); runRoute(); } } });
  });
  $$('.toggle[data-elev]').forEach(t => t.addEventListener('click', e => {
    const b = e.target.closest('button[data-v]'); if (!b) return;
    state[t.dataset.elev].lift = b.dataset.v === 'da';
    $$('button', t).forEach(x => x.classList.toggle('active', x === b));
    update();
  }));
  $('#manualKm').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runRoute(); } });
  $('#simBtn').addEventListener('click', runRoute);
  $('#packaging').addEventListener('click', e => {
    const b = e.target.closest('[data-pkg]'); if (!b) return;
    state.pkg = b.dataset.pkg; renderPackaging(); update();
  });
  $('#boxTypeWrap').addEventListener('click', e => {
    const b = e.target.closest('[data-box]'); if (!b) return;
    state.boxType = b.dataset.box; renderPackaging(); update();
  });
  $('#leadForm').addEventListener('submit', submitLead);
  ['leadName', 'leadPhone'].forEach(id => $('#' + id).addEventListener('input', e => e.target.classList.remove('invalid')));
  $('#modalClose').addEventListener('click', closeModal);
  $('#successModal').addEventListener('click', e => { if (e.target.id === 'successModal') closeModal(); });
  $$('[data-open-lead]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openLead(); }));
  $('#leadClose').addEventListener('click', closeLead);
  $('#leadModal').addEventListener('click', e => { if (e.target.id === 'leadModal') closeLead(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if ($('#successModal').classList.contains('open')) closeModal();
    else if ($('#leadModal').classList.contains('open')) closeLead();
  });
  $('#newQuoteBtn').addEventListener('click', resetAll);
  $('#showReceiptBtn').addEventListener('click', () => { if (lastQuote) { $('#modalTotal').textContent = numFmt.format(lastQuote.total); openModal(); } });
  window.addEventListener('resize', () => { if (state.distance != null && !state.simulating) placeElephant('end'); });
}
function renderCalc() {
  renderModes(); renderSpaceTypes(); renderSizes(); renderTabs(); renderInventory(); renderRouteControls(); renderPackaging();
  lastVehicle = null;
  update();
}
function bindPointerFx() {
  document.addEventListener('pointermove', e => {
    const t = e.target instanceof Element ? e.target : null;
    const g = t && t.closest('.pointer-glow');
    if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
  }, { passive: true });
}
function initHeroDots() {
  const canvas = $('#heroDots');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, mx = -999, my = -999, running = true;
  const gap = 28;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), r = canvas.getBoundingClientRect();
    w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    const t = (time || 0) / 1000;
    for (let y = gap / 2; y < h; y += gap) {
      for (let x = gap / 2; x < w; x += gap) {
        const near = Math.max(0, 1 - Math.hypot(x - mx, y - my) / 160);
        const wave = REDUCED ? 0 : (Math.sin(x * 0.015 + y * 0.01 + t * 1.2) + 1) / 2;
        ctx.fillStyle = near > 0.05 ? `rgba(76,195,245,${0.08 + wave * 0.08 + near * 0.6})` : `rgba(148,163,184,${0.07 + wave * 0.07})`;
        ctx.beginPath(); ctx.arc(x, y, 1 + near * 1.6, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (running && !REDUCED) requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize', () => { resize(); if (REDUCED) draw(0); });
  canvas.parentElement.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
  canvas.parentElement.addEventListener('pointerleave', () => { mx = my = -999; });
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { const was = running; running = en.isIntersecting; if (running && !was && !REDUCED) requestAnimationFrame(draw); }).observe(canvas);
  requestAnimationFrame(draw);
}
function initScrollFx() {
  const els = $$('.on-scroll');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        $$('[data-count-to]', en.target).forEach(c => countUp(c, Number(c.dataset.countTo), 1100, v => Math.round(v)));
        io.unobserve(en.target);
      }
    }), { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    const links = $$('#mainNav .nav-link');
    const secIo = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href').endsWith('#' + en.target.id)));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => secIo.observe(s));
    const lazy = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      if (en.target.id === 'recenzije') loadReviews();
      if (en.target.id === 'kalkulator') initAddressSearch();
      lazy.unobserve(en.target);
    }), { rootMargin: '400px 0px' });
    ['recenzije', 'kalkulator'].forEach(id => { const s = document.getElementById(id); if (s) lazy.observe(s); });
  } else {
    els.forEach(el => el.classList.add('in'));
    loadReviews();
  }
  const parallax = $$('[data-parallax]');
  const mascot = $('#scrollMascot'), fill = $('#scrollFill'), stepsFill = $('#stepsLineFill'), steps = $('#kako-radi');
  const fab = $('#fabWrap');
  let lastY = window.scrollY, stopTimer = null, ticking = false;
  function onScroll() {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const p = Math.min(1, Math.max(0, y / max));
    if (!REDUCED) parallax.forEach(el => { el.style.transform = `translate3d(0, ${(y * Number(el.dataset.parallax)).toFixed(1)}px, 0)`; });
    if (fill) fill.style.width = (p * 100) + '%';
    if (mascot) {
      const mw = mascot.offsetWidth || 70;
      mascot.style.transform = `translateX(${(p * (window.innerWidth - mw)).toFixed(1)}px)`;
      mascot.classList.toggle('back', y < lastY);
      mascot.classList.toggle('arrived', p > 0.985);
      if (Math.abs(y - lastY) > 1) { mascot.classList.add('walking'); clearTimeout(stopTimer); stopTimer = setTimeout(() => mascot.classList.remove('walking'), 180); }
    }
    if (fab) fab.classList.toggle('lift-up', !!$('#mobileBar') && !$('#mobileBar').classList.contains('translate-y-full'));
    lastY = y;
    if (steps && stepsFill) {
      const r = steps.getBoundingClientRect();
      stepsFill.style.width = (Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25))) * 100) + '%';
    }
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}
function bindHeader() {
  const btn = $('#langBtn'), menu = $('#langMenu');
  if (btn && menu) {
    const setOpen = open => { menu.classList.toggle('closed', !open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', e => { e.stopPropagation(); setOpen(menu.classList.contains('closed')); });
    document.addEventListener('click', e => { if (!menu.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }
  $$('[data-setlang]').forEach(a => a.addEventListener('click', () => { try { localStorage.setItem('ps.lang', a.dataset.setlang); } catch (e) { } }));
  const mb = $('#menuBtn'), mm = $('#mobileMenu');
  if (mb && mm) {
    const setOpen = open => { mm.classList.toggle('closed', !open); mb.setAttribute('aria-expanded', String(open)); };
    mb.addEventListener('click', () => setOpen(mm.classList.contains('closed')));
    $$('a', mm).forEach(a => a.addEventListener('click', () => setOpen(false)));
  }
}
function initLangBanner() {
  let chosen = null, dismissed = false;
  try { chosen = localStorage.getItem('ps.lang'); dismissed = !!localStorage.getItem('ps.lang.banner'); } catch (e) { }
  if (chosen || dismissed) return;
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  const want = nav.toLowerCase().startsWith('ru') ? 'ru' : nav.toLowerCase().startsWith('en') ? 'en' : (/^(sr|hr|bs|sh|cnr)/i.test(nav) ? 'sr' : null);
  if (!want || want === LANG) return;
  const b = $(`.lang-banner[data-lang="${want}"]`);
  if (!b) return;
  b.hidden = false;
  $$('[data-banner-close]', b).forEach(x => x.addEventListener('click', () => { b.hidden = true; try { localStorage.setItem('ps.lang.banner', '1'); } catch (e) { } }));
}
document.documentElement.classList.remove('no-js');
document.addEventListener('DOMContentLoaded', () => {
  $$('[data-mascot]').forEach(el => { el.innerHTML = elephantSVG(); });
  $$('[data-skyline]').forEach(el => { el.innerHTML = buildSkyline(el.dataset.skyline); });
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  bindHeader();
  initLangBanner();
  bindPointerFx();
  initHeroDots();
  if (has('#inventory')) {
    loadState();
    renderCalc();
    renderStage(state.distance != null ? 'done' : 'idle');
    if (state.distance != null) requestAnimationFrame(() => placeElephant('end'));
    bindCalc();
  }
  initScrollFx();
  initDb();
});
})();
