import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { pointsList } from '../../../../shared/api/points'
import styles from './Slider.module.scss'

const Slider = ({ currentPoint }: { currentPoint: number }) => {
	const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(
		null
	)
	const [isBeg, setIsBeg] = React.useState<boolean>(true)
	const [isEnd, setIsEnd] = React.useState<boolean>(false)

	const achievements = pointsList.find(
		point => point.number === currentPoint
	)?.achievements

	const animateSlideChange = (direction: 'next' | 'prev') => {
		if (!swiperInstance) return

		const slides = swiperInstance.slides
		const slideElements = Array.from(slides) as HTMLElement[]

		if (direction === 'next') {
			gsap.to(slideElements, {
				x: '-100%',
				duration: 0.5,
				ease: 'power2.out',
			})
		} else {
			gsap.to(slideElements, {
				x: '100%',
				duration: 0.5,
				ease: 'power2.out',
			})
		}

		swiperInstance[direction === 'next' ? 'slideNext' : 'slidePrev']()
		gsap.to(slideElements, {
			x: '0%',
			duration: 0.5,
			ease: 'power2.out',
		})
	}

	return (
		<div className={styles.info}>
			{!isBeg && (
				<div
					className={`${styles.btn} ${styles.prev}`}
					onClick={() => animateSlideChange('prev')}
				>
					<ChevronLeft />
				</div>
			)}

			<Swiper
				modules={[Navigation, Pagination, A11y]}
				slidesPerView={3}
				spaceBetween={40}
				navigation
				onSlideChange={(swiper: SwiperType) => {
					setIsBeg(swiper.isBeginning)
					setIsEnd(swiper.isEnd)
				}}
				onSwiper={(swiper: SwiperType) => {
					setSwiperInstance(swiper)
					setIsBeg(swiper.isBeginning)
					setIsEnd(swiper.isEnd)
				}}
				className={styles.slider}
				style={{
					marginLeft: !isBeg ? 0 : '80px',
					marginRight: !isEnd ? 0 : '80px',
				}}
			>
				{achievements?.map((achievement, index) => (
					<SwiperSlide key={index}>
						<div className={styles.wrapper}>
							<div className={styles.year}>{achievement.year}</div>
							<div className={styles.text}>{achievement.text}</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{!isEnd && (
				<div
					className={`${styles.btn} ${styles.next}`}
					onClick={() => animateSlideChange('next')}
				>
					<ChevronRight />
				</div>
			)}
		</div>
	)
}

export default Slider
