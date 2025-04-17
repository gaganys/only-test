import React from 'react'
import { onPointClickAnimation } from '../../ui/Animation/Animation'
import styles from './Circle.module.scss'

const CATEGORIES_LIST = ['', 'Кино', 'Литература', '', '', 'Наука']

type CircleProps = {
	currentPoint: number
	setCurrentPoint: React.Dispatch<React.SetStateAction<number>>
	visiblePoint: number | null
	setVisiblePoint: React.Dispatch<React.SetStateAction<number | null>>
	currentRotation: number
	setCurrentRotation: React.Dispatch<React.SetStateAction<number>>
}

const Circle = ({
	currentPoint,
	setCurrentPoint,
	visiblePoint,
	setVisiblePoint,
	currentRotation,
	setCurrentRotation,
}: CircleProps) => {
	const wrapperRef = React.useRef<HTMLDivElement>(null)
	const [center, setCenter] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	const pointsCoordinates: { x: number; y: number; number: number }[] = []
	const radius = 240
	const numberOfPoints = 6
	const stepAngle = 360 / numberOfPoints
	const targetIndex = 5 // фиксированное "гнездо" точки 6

	React.useEffect(() => {
		if (wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			setCenter({
				x: rect.width / 2,
				y: rect.height / 2,
			})
		}
	}, [])

	// Вычисляем координаты всех точек на круге
	for (let i = 0; i < numberOfPoints; i++) {
		const angle = (i * 2 * Math.PI) / numberOfPoints
		const x = center.x + radius * Math.cos(angle)
		const y = center.y + radius * Math.sin(angle)
		pointsCoordinates.push({ x, y, number: i + 1 })
	}

	const onPointClick = (n: number, target: HTMLElement) => {
		if (!wrapperRef.current || n === currentPoint) return
		setVisiblePoint(null)

		const clickedIndex = n - 1
		const realClickedAngle = (clickedIndex * stepAngle + currentRotation) % 360
		const targetAngle = targetIndex * stepAngle

		let deltaDeg = targetAngle - realClickedAngle
		if (deltaDeg > 180) deltaDeg -= 360
		if (deltaDeg < -180) deltaDeg += 360

		const newRotation = currentRotation + deltaDeg

		const allEls = Array.from(
			document.querySelectorAll<HTMLElement>(
				`.${styles.point}, .${styles.current}`
			)
		)

		onPointClickAnimation(
			wrapperRef.current!,
			allEls,
			target,
			newRotation,
			() => {
				setCurrentRotation(newRotation)
				setCurrentPoint(n)
				setVisiblePoint(n)
			}
		)
	}

	return (
		<div className={`${styles.circle} circleWrapper`} ref={wrapperRef}>
			{pointsCoordinates.map(point => {
				return (
					<div
						key={point.number}
						data-number={point.number}
						className={`${
							currentPoint === point.number ? 'currentPoint' : 'point'
						} ${currentPoint === point.number ? styles.current : styles.point}`}
						style={{
							left: `${point.x}px`,
							top: `${point.y}px`,
						}}
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
