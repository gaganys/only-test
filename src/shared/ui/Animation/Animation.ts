import gsap from 'gsap'

export const onPointClickAnimation = (
	wrapper: HTMLDivElement,
	allPoints: HTMLElement[],
	targetPoint: HTMLElement,
	newRotation: number,
	onComplete: () => void
) => {
	const others = allPoints.filter(el => el !== targetPoint)

	const tl = gsap.timeline({
		defaults: { duration: 0.5, ease: 'power2.out' },
		onComplete,
	})

	tl.to(
		others,
		{
			width: 6,
			height: 6,
			padding: 0,
			backgroundColor: '#42567a',
			border: 'none',
		},
		0
	)
		.to(
			wrapper,
			{
				rotation: newRotation,
				transformOrigin: '50% 50%',
			},
			0
		)
		.to(
			targetPoint,
			{
				width: 56,
				height: 56,
				backgroundColor: '#f4f5f9',
				border: '1px solid rgba(48, 62, 88, 0.5)',
				padding: '13px 23px',
			},
			0
		)
}
