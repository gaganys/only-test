import gsap from 'gsap'
import { pointsList } from '../../api/points'

export const onPointClickAnimation = (
	wrapper: HTMLDivElement,
	allPoints: HTMLElement[],
	targetPoint: HTMLElement,
	newRotation: number,
	onComplete: () => void,
	currentPoint: number,
	nextPoint: number
) => {
	const others = allPoints.filter(el => el !== targetPoint)

	// Получаем данные о датах
	const currentPointData = pointsList.find(
		point => point.number === currentPoint
	)
	const nextPointData = pointsList.find(point => point.number === nextPoint)

	if (!currentPointData || !nextPointData) return

	// Находим элементы дат
	const leftDateEl = document.querySelector('.startDate') as HTMLElement
	const rightDateEl = document.querySelector('.endDate') as HTMLElement

	const tl = gsap.timeline({
		defaults: { duration: 0.5, ease: 'power2.out' },
		onComplete,
	})

	// Анимация круга и точек
	tl.to(
		others,
		{
			width: 6,
			height: 6,
			padding: 0,
			backgroundColor: '#42567a',
			border: 'none',
		},
		0
	)
		.to(
			wrapper,
			{
				rotation: newRotation,
				transformOrigin: '50% 50%',
			},
			0
		)
		.to(
			targetPoint,
			{
				width: 56,
				height: 56,
				backgroundColor: '#f4f5f9',
				border: '1px solid rgba(48, 62, 88, 0.5)',
				padding: '13px 23px',
			},
			0
		)

	// Анимация дат
	if (leftDateEl && rightDateEl) {
		tl.to(
			{},
			{
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: function () {
					const progress = this.progress()

					// Анимация стартовой даты
					const startDiff = nextPointData.startDate - currentPointData.startDate
					const currentStart =
						currentPointData.startDate +
						Math.floor(progress * Math.abs(startDiff)) *
							(startDiff > 0 ? 1 : -1)
					leftDateEl.textContent = String(currentStart)

					// Анимация конечной даты
					const endDiff = nextPointData.endDate - currentPointData.endDate
					const currentEnd =
						currentPointData.endDate +
						Math.floor(progress * Math.abs(endDiff)) * (endDiff > 0 ? 1 : -1)
					rightDateEl.textContent = String(currentEnd)
				},
				onComplete: () => {
					leftDateEl.textContent = String(nextPointData.startDate)
					rightDateEl.textContent = String(nextPointData.endDate)
				},
			},
			0
		)
	}
}

