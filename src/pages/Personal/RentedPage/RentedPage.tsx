import { FC, useState } from 'react'
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material'
import { IPropsRentedPage, IRentedRooms } from '../../../common/types/personal';
import { differenceInDays } from 'date-fns';
import RentedRoom from './RentedRoom/RentedRoom';
import './RentedPage.scss'



const RentedPage: FC<IPropsRentedPage> = (props): JSX.Element => {
    const { user, isLogged, items } = props
    const [age, setAge] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    
    const rentedRooms: IRentedRooms[] = [];
    items.forEach(item => {
        for (let i = 0; i < user.rentedRooms?.length; i++) {
            if (item.id === user.rentedRooms[i].id) {
                const userObj = user.rentedRooms[i]

                rentedRooms.push({
                    ...item,
                    salePrice: userObj.salePrice,
                    rentedDate: userObj.rentedDate,
                    daysCount: userObj.daysCount
                })
            }
        }
    })

    return (
        <div className="rented">
            <div className="rented__head">
                <h5 className="rented__title">
                    Арендованные офисы
                </h5>
                <div className="rented__pagination">

                </div>
            </div>
            <div className="rented__content">
                <div className="rented__filter">
                    <div className="rented__search">
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                    </div>
                    <div className="rented__select">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <ul className="rented__list">
                    {rentedRooms.map((item, index) => {
                        const nowDate = new Date()
                        const diff = differenceInDays(nowDate, item.rentedDate) + 1
                        const prec = diff / item.daysCount * 100
                        return (
                            <RentedRoom
                                key={index}
                                item={item}
                                prec={prec}
                                diff={diff}
                            />
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}

export default RentedPage