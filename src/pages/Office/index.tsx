import React, { useEffect } from 'react'
import Slider from '@mui/material/Slider';
import RoomCard from '../../components/RoomCard/RoomCard';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { DataStatus } from '../../common/types/rooms';
import { fetchRooms } from '../../redux/thunk/rooms';
import { selectRooms } from '../../redux/slices/roomsSlice'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Button from '../../components/Button/Button';
import './Office.scss'
import { BtnTypes } from '../../common/types/button';
import CloseIcon from '@mui/icons-material/Close';
function valuetext(value: number) {
    return `${value}°C`;
}
const minDistance = 10;

const Office = () => {
    const [value1, setValue1] = React.useState<number[]>([20, 37]);
    const [value, setValue] = React.useState<string>('')
    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };
    const { items, status } = useAppSelector(selectRooms)
    const dispatch = useAppDispatch()

    const getCards = async () => {
        dispatch(fetchRooms())
    }
    useEffect(() => {
        getCards()
    }, [])

    if (status !== DataStatus.SUCCESS) {
        return 'загрузка'
    }
    return (
        <section className='office'>

            <div className="container office__container">
                <h1>
                    Офисы
                </h1>
                <div className="office__content">
                    <aside className='office__sidebar'>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                            >
                                <h3 className="office__heading">
                                    Цена
                                </h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="office__price">
                                    <div className="office__info">
                                        <span className='office__number'>{value1[0]}</span>
                                        <span className='office__number'>{value1[1]}</span>
                                    </div>
                                    <Slider
                                        getAriaLabel={() => 'Minimum distance'}
                                        value={value1}
                                        onChange={handleChange1}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        disableSwap
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                            >
                                <h3 className="office__heading">
                                    Площад
                                </h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="office__checks">
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>10.6 м²</span>
                                    </label>
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>10.7 м²</span>
                                    </label>
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>11.9 м²</span>
                                    </label>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                            >
                                <h3 className="office__heading">
                                    Вместимость
                                </h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="office__checks">
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>4 Человек</span>
                                    </label>
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>5 Человек</span>
                                    </label>
                                    <label>
                                        <Checkbox
                                            defaultChecked
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                        <span>10 Человек</span>
                                    </label>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                    </aside>
                    <div className="office__right">
                        <form className='office__search'>
                            <div className="office__field">
                                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
                                {value && <CloseIcon onClick={() => setValue('')} className='office__close' />}
                            </div>
                            <Button type={BtnTypes.SUBMIT}>Искать</Button>
                        </form>
                        <ul className='office__cards'>
                            {items.map((item, index) => (
                                <RoomCard key={index} {...item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Office