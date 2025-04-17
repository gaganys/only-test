import gsap from 'gsap'
import React from 'react'
import styles from './Circle.module.scss'

const CATEGORIES_LIST = ['', 'Кино', 'Литература', '', '', 'Наука']

const Circle = () => {
	const wrapperRef = React.useRef<HTMLDivElement>(null)
	const [center, setCenter] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})
	const [currentPoint, setCurrentPoint] = React.useState<number>(6)
	const [visiblePoint, setVisiblePoint] = React.useState<number | null>(6)
	const [currentRotation, setCurrentRotation] = React.useState<number>(0)

	const pointsCoordinates: { x: number; y: number; number: number }[] = []
	const radius = 265
	const numberOfPoints = 6
	const stepAngle = 360 / numberOfPoints
	const targetIndex = 5 // фиксированное "гнездо" точки 6

	React.useEffect(() => {
		if (wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			setCenter({
				x: rect.width / 2,
				y: rect.height / 2,
			})
		}
	}, [])

	for (let i = 0; i < numberOfPoints; i++) {
		const angle = (i * 2 * Math.PI) / numberOfPoints
		const x = center.x + radius * Math.cos(angle)
		const y = center.y + radius * Math.sin(angle)
		pointsCoordinates.push({ x, y, number: i + 1 })
	}

	// Обработчик клика с объединённой анимацией
	const onPointClick = (n: number, target: HTMLElement) => {
		if (!wrapperRef.current || n === currentPoint) return
		setVisiblePoint(null)

		const clickedIndex = n - 1

		// Нахождение текущей фактической позиции точки
		const realClickedAngle = (clickedIndex * stepAngle + currentRotation) % 360

		const targetAngle = targetIndex * stepAngle

		let deltaDeg = targetAngle - realClickedAngle
		// Минимизация угла: если >180°, крутим в другую сторону
		if (deltaDeg > 180) deltaDeg -= 360
		if (deltaDeg < -180) deltaDeg += 360

		const newRotation = currentRotation + deltaDeg

		const allEls = Array.from(
			document.querySelectorAll<HTMLElement>(
				`.${styles.point}, .${styles.current}`
			)
		)
		const others = allEls.filter(el => el !== target)

		const tl = gsap.timeline({
			defaults: { duration: 0.5, ease: 'power2.out' },
			onComplete: () => {
				setCurrentRotation(newRotation)
				setCurrentPoint(n)
				setVisiblePoint(n)
			},
		})

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
				wrapperRef.current!,
				{
					rotation: newRotation,
					transformOrigin: '50% 50%',
				},
				0
			)
			.to(
				target,
				{
					width: 56,
					height: 56,
					backgroundColor: '#f4f5f9',
					border: '1px solid rgba(48, 62, 88, 0.5)',
					padding: '13px 23px',
				},
				0
			)
	}

	return (
		<div className={styles.circle} ref={wrapperRef}>
			{pointsCoordinates.map(point => {
				return (
					<div
						key={point.number}
						data-number={point.number}
						className={`${
							currentPoint === point.number ? styles.current : styles.point
						}`}
						style={{
							left: `${point.x}px`,
							top: `${point.y}px`,
						}}
						// Анимация изменения точки
						onClick={e => onPointClick(point.number, e.currentTarget)}
					>
						<div
							className={styles.content}
							style={{
								transform: `rotate(${-currentRotation}deg)`,
							}}
						>
							{visiblePoint === point.number && point.number}
							<span className={styles.category}>
								{visiblePoint === point.number &&
									CATEGORIES_LIST[point.number - 1]}
							</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Circle
