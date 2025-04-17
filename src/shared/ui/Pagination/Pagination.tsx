import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { pointsList } from '../../api/points'
import { onPointClickAnimation } from '../Animation/Animation'
import styles from './Pagination.module.scss'

type PaginationProps = {
	currentPoint: number
	setCurrentPoint: React.Dispatch<React.SetStateAction<number>>
	setVisiblePoint: React.Dispatch<React.SetStateAction<number | null>>
	currentRotation: number
	setCurrentRotation: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({
	currentPoint,
	setCurrentPoint,
	setVisiblePoint,
	currentRotation,
	setCurrentRotation,
}: PaginationProps) => {
	const handleClick = (direction: 'prev' | 'next') => {
		const wrapper = document.querySelector('.circleWrapper') as HTMLDivElement
		if (!wrapper) return

		const allPoints = Array.from(
			document.querySelectorAll<HTMLElement>('.point, .currentPoint')
		)

		// Обновляем nextPoint
		const nextPoint = direction === 'prev' ? currentPoint - 1 : currentPoint + 1

		// Убедимся, что точка находится в пределах 1-6
		if (nextPoint < 1 || nextPoint > 6) return

		setVisiblePoint(null)

		const stepAngle = 360 / pointsList.length
		const targetIndex = 5 // всегда точка 6

		const clickedIndex = nextPoint - 1
		const realClickedAngle = (clickedIndex * stepAngle + currentRotation) % 360
		const targetAngle = targetIndex * stepAngle

		// Вычисляем разницу углов
		let deltaDeg = targetAngle - realClickedAngle
		if (deltaDeg > 180) deltaDeg -= 360
		if (deltaDeg < -180) deltaDeg += 360

		const newRotation = currentRotation + deltaDeg

		const target = allPoints.find(el => Number(el.dataset.number) === nextPoint)

		if (!target) return

		// Анимация
		onPointClickAnimation(
			wrapper,
			allPoints,
			target,
			newRotation,
			() => {
				setCurrentRotation(newRotation)
				setCurrentPoint(nextPoint)
				setVisiblePoint(nextPoint)
			},
			currentPoint,
			nextPoint
		)
	}

	return (
		<div className={styles.pagination}>
			<div className={styles.count}>0{currentPoint}/06</div>
			<div className={styles.arrows}>
				<div
					className={`${currentPoint === 1 ? styles.disabled : styles.arrow}`}
					onClick={() => handleClick('prev')}
				>
					<ChevronLeft />
				</div>
				<div
					className={`${currentPoint === 6 ? styles.disabled : styles.arrow}`}
					onClick={() => handleClick('next')}
				>
					<ChevronRight />
				</div>
			</div>
		</div>
	)
}

export default Pagination
