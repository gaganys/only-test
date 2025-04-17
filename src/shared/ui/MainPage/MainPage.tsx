import Circle from '../../components/Circle/Circle'
import styles from './MainPage.module.scss'

const MainPage = () => {
	return (
		<main className={styles.pageWrapper}>
			<div className={styles.lines}>
				<div className={styles.verticalLine}></div>
				<div className={styles.horizontalLine}></div>
				<div className={styles.leftLimit}></div>
				<div className={styles.rightLimit}></div>
			</div>

			<Circle />
		</main>
	)
}

export default MainPage
