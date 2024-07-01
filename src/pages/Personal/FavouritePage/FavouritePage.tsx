import { FC, useState } from 'react'
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material'
import { IPropsFavouritePage } from '../../../common/types/personal';
import FavouritedRoom from './FavouritedRoom/FavouritedRoome';
import { DataType } from '../../../common/types/rooms';
import './FavouritePage.scss'


const FavouritePage: FC<IPropsFavouritePage> = (props: IPropsFavouritePage): JSX.Element => {
    const { user, isLogged, items, dispatch } = props
    
    const [age, setAge] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const FavouriteRooms: DataType[] = [];
    items.forEach(item => {
        for (let i = 0; i < user.favourites?.length; i++) {
            if (item.id === user.favourites[i]) {
                FavouriteRooms.push(item)
            }
        }
    })
    return (
        <div className="favourite">
            <div className="favourite__head">
                <h5 className="favourite__title">
                    Избранное
                </h5>
                <div className="favourite__pagination">

                </div>
            </div>
            <div className="favourite__content">
                <div className="favourite__filter">
                    <div className="favourite__search">
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                    </div>
                    <div className="favourite__select">
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
                <ul className="favourite__list">
                    {FavouriteRooms.map((item, index) => <FavouritedRoom key={index} user={user} dispatch={dispatch} item={item} />)}
                </ul>
            </div>
        </div>
    )
}

export default FavouritePage