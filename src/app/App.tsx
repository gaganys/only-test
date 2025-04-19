import React from 'react'
import Circle from '../features/MainPage/ui/Circle/Circle'
import Dates from '../features/MainPage/ui/Dates/Dates'
import Pagination from '../features/MainPage/ui/Pagination/Pagination'
import Slider from '../features/MainPage/ui/Slider/Slider'
import Title from '../features/MainPage/ui/Title/Title'
import styles from './App.module.scss'

function App() {
	const [currentPoint, setCurrentPoint] = React.useState<number>(6)
	const [visiblePoint, setVisiblePoint] = React.useState<number | null>(6)
	const [currentRotation, setCurrentRotation] = React.useState<number>(0)

	return (
		<main className={styles.pageWrapper}>
			<div className={`${styles.limit} ${styles.limitLeft}`}></div>
			<div className={`${styles.limit} ${styles.limitRight}`}></div>

			<div className={styles.content}>
				<Title />
				<Dates currentPoint={currentPoint} />
				<Circle
					currentPoint={currentPoint}
					setCurrentPoint={setCurrentPoint}
					visiblePoint={visiblePoint}
					setVisiblePoint={setVisiblePoint}
					currentRotation={currentRotation}
					setCurrentRotation={setCurrentRotation}
				/>
				<Pagination
					currentPoint={currentPoint}
					setCurrentPoint={setCurrentPoint}
					setVisiblePoint={setVisiblePoint}
					currentRotation={currentRotation}
					setCurrentRotation={setCurrentRotation}
				/>
			</div>
			<Slider currentPoint={currentPoint} />
		</main>
	)
}

export default App
