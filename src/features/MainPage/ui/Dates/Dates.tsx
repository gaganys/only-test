import { pointsList } from '../../../../shared/api/points'
import styles from './Dates.module.scss'

const Dates = ({ currentPoint }: { currentPoint: number }) => {
	const currentPointData = pointsList.find(
		point => point.number === currentPoint
	)

	if (!currentPointData) return null

	return (
		<div className={styles.dates}>
			<div className={`${styles.leftSide} startDate`}>
				{currentPointData.startDate}
			</div>
			<div className={`${styles.rightSide} endDate`}>
				{currentPointData.endDate}
			</div>
		</div>
	)
}

export default Dates
