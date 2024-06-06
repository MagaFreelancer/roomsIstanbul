import { FC } from 'react'
import './Explanation.scss'
type ColsType = { text: string; clsName: string; title: string }
const cols: ColsType[] = [
    {
        clsName: "explanation__item--search",
        title: "Search Apartment",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
    },
    {
        clsName: "explanation__item--select",
        title: "Select Apartment",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
    },
    {
        clsName: "explanation__item--apartment",
        title: "Confirm Apartment",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
    }
]

const Explanation: FC = () => {
    return (
        <section className='explanation'>
            <div className="container">
                <h2 className="explanation__title title">How it Works</h2>
                <p className="explanation__subtitle subtitle">
                    Using it can make you sound like you have been studying english
                    for a long time. Here’s the challenge
                </p>
                <ul className="explanation__cols">
                    {cols.map((item, index) => (
                        <li key={index} className={`explanation__item ${item.clsName}`} >
                            <h5 className="explanation__heading">
                                {item.title}
                            </h5>
                            <p className="explanation__text">
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Explanation