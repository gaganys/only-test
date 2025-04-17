type PointType = {
	number: number
	category?: string
	startDate: number
	endDate: number
}

export const pointsList: PointType[] = [
	{
		number: 1,
		startDate: 1980,
		endDate: 1986,
	},
	{
		number: 2,
		category: 'Кино',
		startDate: 1987,
		endDate: 1991,
	},
	{
		number: 3,
		category: 'Литература',
		startDate: 1992,
		endDate: 1997,
	},
	{
		number: 4,
		startDate: 1999,
		endDate: 2004,
	},
	{
		number: 5,
		startDate: 2006,
		endDate: 2013,
	},
	{
		number: 6,
		category: 'Наука',
		startDate: 2015,
		endDate: 2022,
	},
]
