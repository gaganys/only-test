import React from 'react'
import styles from './Circle.module.scss'

const Circle = () => {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const [center, setCenter] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	const [currentPoint, setCurrentPoint] = React.useState<number>(6)

	const pointsCoordinates = []
	const radius = 265
	const numberOfPoints = 6

	React.useEffect(() => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect()
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

	return (
		<div className={styles.circle} ref={containerRef}>
			{pointsCoordinates.map((point, index) => {
				return (
					<div
						key={index}
						className={`${
							currentPoint === point.number ? styles.current : styles.point
						}`}
						style={{
							left: `${point.x}px`,
							top: `${point.y}px`,
						}}
					>
						{currentPoint === point.number ? point.number : ''}
					</div>
				)
			})}
		</div>
	)
}

export default Circle
