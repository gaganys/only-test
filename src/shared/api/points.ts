type AchievementType = {
	year: string
	text: string
}

type PointType = {
	number: number
	category: string
	achievements: AchievementType[]
	startDate: number
	endDate: number
}

export const pointsList: PointType[] = [
	{
		number: 1,
		category: 'Музыка',
		achievements: [
			{
				year: '1980',
				text: 'трагическая смерть Джона Леннона',
			},
			{
				year: '1981',
				text: 'основание телеканала MTV, который изменил музыкальную индустрию',
			},
			{
				year: '1982',
				text: 'выход альбома "Thriller" Майкла Джексона — самого продаваемого альбома в истории',
			},
			{
				year: '1985',
				text: 'организация благотворительного концерта Live Aid (борьба с голодом в Эфиопии)',
			},
			{
				year: '1986',
				text: 'основание группы Pixies, оказавшей огромное влияние на альтернативный рок',
			},
		],
		startDate: 1980,
		endDate: 1986,
	},
	{
		number: 2,
		category: 'Кино',
		achievements: [
			{
				year: '1987',
				text: '"Хищник"/Predator, США(реж. Джон Мактирнан)',
			},
			{
				year: '1988',
				text: '"Кто подставил кролика Роджера"/Who Framed Rodger Rabbit, США(реж. Роберт Земекис)',
			},
			{
				year: '1989',
				text: '"Назад в будущее 2"/Back to the Future 2, США(реж. Роберт Земекис)',
			},
			{
				year: '1990',
				text: '"Крепкий орешек 2"/Die Hard 2, США(реж. Ренни Харлин)',
			},
			{
				year: '1991',
				text: '"Семейка Аддамс"/Addams Family, США(реж. Барри Зонненфельд)',
			},
		],
		startDate: 1987,
		endDate: 1991,
	},
	{
		number: 3,
		category: 'Литература',
		achievements: [
			{
				year: '1992',
				text: 'Нобелевская премия по литературе - Дерек Уолкотт, "За блестящий образец карибского эпоса в 64 разделах"',
			},
			{
				year: '1994',
				text: '"Бессонница" - роман Стивена Кинга',
			},
			{
				year: '1995',
				text: 'Нобелевская премия по литературе - Шеймас Хини',
			},
			{
				year: '1997',
				text: '"Гарри Поттер и философский камень" - Джоан Роулинг',
			},
		],
		startDate: 1992,
		endDate: 1997,
	},
	{
		number: 4,
		category: 'Театр',
		achievements: [
			{
				year: '1999',
				text: 'премьера балета "Золушка" в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона',
			},
			{
				year: '2000',
				text: 'возобновлено издание журнала "Театр"',
			},
			{
				year: '2002',
				text: 'премьера трилогии Тома Стоппарда "Берег Утопии", Королевский Национальный театр, Лондон',
			},
			{
				year: '2003',
				text: 'премьера постановки "Гамлет", театр "Глобус", Лондон',
			},
			{
				year: '2004',
				text: 'открытие Российского национального театра',
			},
		],
		startDate: 1999,
		endDate: 2004,
	},
	{
		number: 5,
		category: 'Технологии',
		achievements: [
			{
				year: '2006',
				text: 'запуск сервиса Twitter',
			},
			{
				year: '2007',
				text: 'презентация первого iPhone компанией Apple',
			},
			{
				year: '2008',
				text: 'основание компании Spotify',
			},
			{
				year: '2010',
				text: 'появление Instagram.',
			},
			{
				year: '2012',
				text: 'запуск первой версии Google Now — начальная форма голосового помощника',
			},
			{
				year: '2013',
				text: 'выход PlayStation 4 и Xbox One',
			},
		],
		startDate: 2006,
		endDate: 2013,
	},
	{
		number: 6,
		category: 'Наука',
		achievements: [
			{
				year: '2015',
				text: '13 сентября - частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
			},
			{
				year: '2016',
				text: 'телескоп "Хаббл" обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11',
			},
			{
				year: '2017',
				text: 'компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
			},
			{
				year: '2018',
				text: 'старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца',
			},
			{
				year: '2019',
				text: 'Google объявил о создании 53-кубитного квантового компьютера',
			},
			{
				year: '2020',
				text: 'корабль Crew Dragon вернулся на Землю из первого пилотируемого полета',
			},
			{
				year: '2022',
				text: 'запуск и начало работы космического телескопа "Джеймс Уэбб"',
			},
		],
		startDate: 2015,
		endDate: 2022,
	},
]
