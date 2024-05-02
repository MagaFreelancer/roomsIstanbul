import { FC } from 'react'
import tableSvg from '../../assets/help/table.svg'
import couchSvg from '../../assets/help/couch.svg'
import bg1 from '../../assets/help/bg-1.jpg'
import bg2 from '../../assets/help/bg-2.jpg'
import "./Help.scss"
const Help: FC = () => {
	return (
		<section className='help'>
			<div className='container'>
				<h2 className='help__title title'>We will help you to find
					Dream Home</h2>
				<p className='help__subtitle subtitle'>It is a long established fact that a reader will be distracted by the
					readable content of a page
					when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
					of letters</p>
				<div className='help__content'>
					<div className='help__col help__col--left'>
						<div className='help__card'>
							<div className='help__price'>$2000/month</div>
							<div className='help__name'>Apartment 2500 sqft</div>
							<ul className='help__list'>
								<li className='help__item'>
									<img src={tableSvg} alt='room' />
									<span>2</span>
								</li>
								<li className='help__item'>
									<img src={couchSvg} alt='кресло' />
									<span>2</span>
								</li>
							</ul>
							<address className='help__address'>
								1901 Thornridge Cir. Shiloh,
								Hawaii 81063
							</address>
						</div>
						<div className='help__bg'>
							<img src={bg1} alt='комната' />
						</div>
					</div>
					<div className='help__col help__col--right'>
						<div className='help__card'>
							<div className='help__price'>$2000/month</div>
							<div className='help__name'>Apartment 2500 sqft</div>
							<ul className='help__list'>
								<li className='help__item'>
									<img src={tableSvg} alt='стол' />
									<span>2</span>
								</li>
								<li className='help__item'>
									<img src={couchSvg} alt='кресло' />
									<span>2</span>
								</li>
							</ul>
							<address className='help__address'>
								1901 Thornridge Cir. Shiloh,
								Hawaii 81063
							</address>
						</div>
						<div className='help__bg'>
							<img src={bg2} alt='комната' />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Help