import { FC } from 'react'
type Cols = { text: string; clsName: string; title: string }
const Explanation: FC = () => {
    const cols: Cols[] = [
        {
            clsName: "",
            title: "Search Apartment",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
        },
        {
            clsName: "",
            title: "Select Apartment",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
        },
        {
            clsName: "",
            title: "Confirm Apartment",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet tempus felis vitae."
        }
    ]
    return (
        <section className='explanation'>
            <div className="container">
                <h2 className="title">How it Works</h2>
                <p className="subtitle">
                    Using it can make you sound like you have been studying english
                    for a long time. Here’s the challenge
                </p>
                <ul className="explanation__cols">
                    {cols.map((item, index) => (
                        <li className={item.clsName} key={index}>
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