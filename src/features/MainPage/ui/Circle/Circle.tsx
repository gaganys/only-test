import gsap from 'gsap'
import React from 'react'
import { pointsList } from '../../../../shared/api/points'
import { onPointClickAnimation } from '../../../Animation/Animation'
import styles from './Circle.module.scss'

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
	const pointsRefs = React.useRef<(HTMLDivElement | null)[]>([])

	const [center, setCenter] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	const pointsCoordinates: { x: number; y: number; number: number }[] = []
	const radius = 210
	const stepAngle = 360 / pointsList.length
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
	for (let i = 0; i < pointsList.length; i++) {
		const angle = (i * 2 * Math.PI) / pointsList.length
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
			},
			currentPoint,
			n
		)
	}

	const handleHoverEnter = (index: number) => {
		const point = pointsRefs.current[index]
		if (!point) return

		if (index + 1 !== currentPoint) {
			gsap.to(point, {
				width: 56,
				height: 56,
				backgroundColor: '#f4f5f9',
				border: '1px solid rgba(48, 62, 88, 0.5)',
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleHoverLeave = (index: number) => {
		const point = pointsRefs.current[index]
		if (!point) return

		if (index + 1 !== currentPoint) {
			gsap.to(point, {
				width: 6,
				height: 6,
				backgroundColor: '#42567a',
				border: 'none',
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<div className={`${styles.circle} circleWrapper`} ref={wrapperRef}>
			{pointsCoordinates.map(point => {
				return (
					<div
						key={point.number}
						ref={el => {
							pointsRefs.current[point.number - 1] = el
						}}
						data-number={point.number}
						className={`${
							currentPoint === point.number ? 'currentPoint' : 'point'
						} ${currentPoint === point.number ? styles.current : styles.point}`}
						style={{
							left: `${point.x}px`,
							top: `${point.y}px`,
						}}
						onClick={e => onPointClick(point.number, e.currentTarget)}
						onMouseEnter={() => handleHoverEnter(point.number - 1)}
						onMouseLeave={() => handleHoverLeave(point.number - 1)}
					>
						<div
							className={styles.content}
							style={{
								transform: `rotate(${-currentRotation}deg)`,
							}}
						>
							{visiblePoint === point.number && point.number}
							{visiblePoint === point.number && (
								<span className={styles.category}>
									{pointsList[point.number - 1]?.category}
								</span>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Circle
