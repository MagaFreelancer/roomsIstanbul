import {
    FC, useState
} from 'react';
import searchSvg from '../../assets/points/search.svg'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IPropsHero, PointsType } from '../../common/types/rooms';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import './Hero.scss'

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

const Hero: FC<IPropsHero> = (props: IPropsHero): JSX.Element => {
    const { items, status } = props
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);
    const onClickSendIcon = () => {
        if (searchValue.trim()) {
            onChangeSearch(searchValue)
        } else {
            setOpen(false)
        }
    }
    const onChangeSearch = (value: string) => {
        const itemOption = items.find(item => {
            if (item.name.toLocaleLowerCase() === value.toLocaleLowerCase()) {

                return item
            }
        })

        if (itemOption != null) {
            navigate(`offices/${itemOption.id}`)
        }
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
                        <div className={`hero__points-col ${open === false && 'hero__points-col--active'}`}>
                            <ul className="hero__points-list">
                                {points.map((item, index) => (
                                    <li key={index} className={`hero__points-item ${item.class}`}>
                                        <p className="hero__points-heading">{item.heading}</p>
                                        <span className="hero__points-descr">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`hero__points-col ${open && 'hero__points-col--active'}`}>
                            <form onSubmit={() => onChangeSearch(searchValue)} >
                                <Stack className='hero__points-field'>
                                    <Autocomplete
                                        freeSolo
                                        id="free-solo-2-demo"
                                        disableClearable
                                        options={items.map((option) => option.name)}
                                        onChange={(_, value) => {
                                            onChangeSearch(value)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Search input"
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                }}
                                            />
                                        )}
                                    />
                                </Stack>
                            </form>
                        </div>
                    </div>
                    <button onClick={() => setOpen(!open)} className='hero__points-search button-blue button-blue--sm'>
                        {open ? <SendIcon onClick={() => onClickSendIcon()} /> : <SearchIcon />}
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