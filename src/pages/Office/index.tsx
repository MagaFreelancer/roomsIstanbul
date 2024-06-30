import { useEffect } from 'react'
import RoomCard from '../../components/RoomCard/RoomCard';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { fetchRooms } from '../../redux/thunk/rooms';
import { selectRooms } from '../../redux/slices/roomsSlice'
import Button from '../../components/Button/Button';
import { BtnTypes } from '../../common/types/button';
import CloseIcon from '@mui/icons-material/Close';
import PriceFilter from './PriceFilter';
import SquareFilter from './SquareFilter';
import CapacityFilter from './СapacityFilter';
import { setSearchValue, setMinmaxPrice, setSquare, setCapacity } from '../../redux/slices/roomsSlice'
import { IFilters } from '../../common/types/filters';
import './Office.scss'


const Office = () => {
    const { items, searchValue, minmaxPrice, square, capacity } = useAppSelector(selectRooms)
    const dispatch = useAppDispatch()

    const handleChange = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        dispatch(setSearchValue(searchValue))
    }
    const getCards = async (params: IFilters) => {
        dispatch(fetchRooms(params))
    }
    useEffect(() => {
        getCards({
            searchValue,
            minmaxPrice,
            square,
            capacity
        })
    }, [searchValue, minmaxPrice, square, capacity])


    return (
        <section className='office'>

            <div className="container office__container">
                <h1>
                    Офисы
                </h1>
                <div className="office__content">
                    <aside className='office__sidebar'>
                        <PriceFilter minmaxPrice={minmaxPrice} setMinmaxPrice={e => dispatch(setMinmaxPrice(e))} />
                        <SquareFilter square={square} setSquare={e => dispatch(setSquare(e))} />
                        <CapacityFilter capacity={capacity} setCapacity={e => dispatch(setCapacity(e))} />
                    </aside>
                    <div className="office__right">
                        <form onSubmit={handleChange} className='office__search'>
                            <div className="office__field">
                                <input value={searchValue} onChange={(e) => dispatch(setSearchValue(e.target.value))} type="text" />
                                {searchValue && <CloseIcon onClick={() => dispatch(setSearchValue(''))} className='office__close' />}
                            </div>
                            <button className='button-blue office__button'>Искать</button>
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