import { FC ,useState} from 'react';
import searchSvg from '../../assets/points/search.svg'
import './Hero.scss'
type PointsType = { text: string; heading: string; class: string }
const points: PointsType[] = [
    {
        heading: 'Location',
        text: 'Ahmedabad, India',
        class: 'hero__points-item--location',
    }, {
        heading: 'Price',
        text: '$1000 - $10,000',
        class: 'hero__points-item--price',
    }, {
        heading: 'Type of Property',
        text: 'Apartment',
        class: 'hero__points-item--type',
    },
]

const Hero: FC = () => {
    const [activeCol, setActiveCol] = useState<number>(0)
    // const [searchValue, setSearchValue] = useState<string>('')


    const onClickSearch = () => {
        setActiveCol(1)
    }
    return (
        <section className='hero'>
            <div className="container hero__container">
                <h1 className="hero__title">
                    Discover a place <br />
                    you will love to live
                </h1>
                <p className="hero__subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Imperdiet tempus felis vitae sit est quisque.
                </p>
                <div className="hero__points">
                    <div className="hero__points-left">
                        <div className={`hero__points-col ${activeCol === 0 && 'hero__points-col--active'}`}>
                            <ul className="hero__points-list">
                                {points.map((item, index) => (
                                    <li key={index} className={`hero__points-item ${item.class}`}>
                                        <p className="hero__points-heading">{item.heading}</p>
                                        <span className="hero__points-descr">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`hero__points-col ${activeCol === 1 && 'hero__points-col--active'}`}>
                            <input type="text" />
                        </div>
                    </div>
                    <button onClick={onClickSearch} className='hero__points-search button-blue button-blue--sm'>
                        <img src={searchSvg} alt="search" />
                    </button>
                </div>
                <div className="hero__static">
                    <div className="hero__static-col">
                        <div className="hero__static-num">2000+
                        </div>
                        <span className="hero__static-descr">Property Ready</span>
                    </div>
                    <div className="hero__static-col">
                        <div className="hero__static-num">500+
                        </div>
                        <span className="hero__static-descr">Happy Customer</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero