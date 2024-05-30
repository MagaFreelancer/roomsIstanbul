import { FC, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from './Calendar/Calendar';
import { addDays, format, subDays, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const SinglePage: FC = (): JSX.Element => {
    const { id } = useParams()
    const [value, setValue] = useState<number | null>(3.5);

    const [valueDateRangePicker, setValueDateRangePicker] = useState<Range[] | undefined>([
        {
            startDate: subDays(new Date(), 0),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const formattedValueDateRangePickerStartDate = valueDateRangePicker?.[0].startDate
        ? format(valueDateRangePicker[0].startDate, "dd.MM.yyyy", { locale: enUS })
        : "";
    const formattedValueDateRangePickerEndDate = valueDateRangePicker?.[0].endDate
        ? format(valueDateRangePicker[0].endDate, "dd.MM.yyyy", { locale: enUS })
        : "";


    const handleChangeValueDateRangePicker = useCallback((ranges: RangeKeyDict) => {
        const { selection } = ranges;
        setValueDateRangePicker([selection]);
    }, []);


    if (valueDateRangePicker?.[0].startDate && valueDateRangePicker?.[0].endDate) {
        const daysCount = differenceInDays(valueDateRangePicker[0].endDate, valueDateRangePicker[0].startDate) + 1; // +1 to include both start and end dates
        console.log(daysCount);
    }


    return (
        <section className='singlepage'>
            <div className="container singlepage__container">
                <div className="singlepage__col">
                    <img src="https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg" alt="" />
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
                        <Calendar
                            editableDateInputs={true}
                            locale={enUS}
                            minDate={addDays(new Date(), 0)}
                            onChange={handleChangeValueDateRangePicker}
                            ranges={valueDateRangePicker}
                            showDateDisplay={true}
                            showPreview={true}
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SinglePage