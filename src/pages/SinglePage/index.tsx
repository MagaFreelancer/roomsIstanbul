import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const SinglePage: FC = (): JSX.Element => {
    const { id } = useParams()
    const [value, setValue] = useState<number | null>(2.5);
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    )
    const handleSelect = (ranges: any) => {
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    return (
        <section className='singlepage'>
            <div className="container singlepage__container">
                <div className="singlepage__col">
                    <img src="https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg" alt="" srcset="" />
                </div>
                <div className="singlepage__col">
                    <h2 className="singlepage__title">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                    </h2>
                    <div className="singlepage__rating">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <ul className="singlepage__info">
                        <li className='singlepage__item'>Lorem ipsum dolor sit  Possimus alias esse  itaque, quibusdam, et suscipit rerum ipsam voluptate. Ipsa expedita cum corrupti laboriosam.8</li>
                        <li className='singlepage__item'>Lorem ipsum dolor sit  Possimus alias esse  itaque, quibusdam, et suscipit rerum ipsam voluptate. Ipsa expedita cum corrupti laboriosam.8</li>
                        <li className='singlepage__item'>Lorem ipsum dolor sit  Possimus alias esse  itaque, quibusdam, et suscipit rerum ipsam voluptate. Ipsa expedita cum corrupti laboriosam.8</li>
                        <li className='singlepage__item'>Lorem ipsum dolor sit  Possimus alias esse  itaque, quibusdam, et suscipit rerum ipsam voluptate. Ipsa expedita cum corrupti laboriosam.8</li>
                    </ul>
                    <div className="singlepage__date">
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SinglePage