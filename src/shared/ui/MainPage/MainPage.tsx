import React from 'react'
import Circle from '../../components/Circle/Circle'
import Dates from '../Dates/Dates'
import Pagination from '../Pagination/Pagination'
import Title from '../Title/Title'
import styles from './MainPage.module.scss'

const MainPage = () => {
	const [currentPoint, setCurrentPoint] = React.useState<number>(6)
	const [visiblePoint, setVisiblePoint] = React.useState<number | null>(6)
	const [currentRotation, setCurrentRotation] = React.useState<number>(0)

	return (
		<main className={styles.pageWrapper}>
			<div className={styles.lines}>
				<div className={styles.verticalLine}></div>
				<div className={styles.horizontalLine}></div>
				<div className={styles.leftLimit}></div>
				<div className={styles.rightLimit}></div>
			</div>

			<Title />
			<Dates currentPoint={currentPoint} />
			<Pagination
				currentPoint={currentPoint}
				setCurrentPoint={setCurrentPoint}
				setVisiblePoint={setVisiblePoint}
				currentRotation={currentRotation}
				setCurrentRotation={setCurrentRotation}
			/>

			<Circle
				currentPoint={currentPoint}
				setCurrentPoint={setCurrentPoint}
				visiblePoint={visiblePoint}
				setVisiblePoint={setVisiblePoint}
				currentRotation={currentRotation}
				setCurrentRotation={setCurrentRotation}
			/>
		</main>
	)
}

export default MainPage
