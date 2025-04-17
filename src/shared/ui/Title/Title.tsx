import styles from './Title.module.scss'

const Title = () => {
	return (
		<>
			<div className={styles.gradientLine}></div>
			<div className={styles.title}>
				Исторические <br /> даты
			</div>
		</>
	)
}

export default Title
