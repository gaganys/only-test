import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Info.module.scss'

const Info = () => {
	return (
		<div className={styles.info}>
			<Swiper
				spaceBetween={80}
				slidesPerView={3}
				onSlideChange={() => console.log('slide change')}
			>
				<SwiperSlide>2015</SwiperSlide>
				<SwiperSlide>2016</SwiperSlide>
				<SwiperSlide>2017</SwiperSlide>
				<SwiperSlide>2018</SwiperSlide>
				<SwiperSlide>2019</SwiperSlide>
				<SwiperSlide>2020</SwiperSlide>
			</Swiper>
		</div>
	)
}

export default Info
