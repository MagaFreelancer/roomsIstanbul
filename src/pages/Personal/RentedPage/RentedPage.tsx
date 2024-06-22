import React, { FC } from 'react'
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Rating,
} from '@mui/material'
import { Link } from 'react-router-dom';
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Flex, Progress } from 'antd';
import './RentedPage.scss'


const RentedPage: FC = (): JSX.Element => {
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


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
                    <li className="rented__item">
                        <Link to="/" className='rented__link'>
                            <div className="rented__image">
                                <img src="https://media.istockphoto.com/id/1460755337/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9-%D1%86%D0%B2%D0%B5%D1%82-%D1%82%D0%B5%D0%BC%D0%B0-%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%81%D1%82%D0%B8%D0%BB%D1%8F-%D0%BE%D1%84%D0%B8%D1%81-%D1%81-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D1%8B%D0%BC-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BF%D0%BE%D0%BB%D0%BE%D0%BC-%D0%B8-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%BC-%D0%BA%D0%BE%D0%BB%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=6menE2KqfuDLd1jWnsL0FPWPTUT9ZHtnTZZ49s5Hbik=" alt="" />
                            </div>
                            <div className="rented__info">
                                <div className="rented__descr">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                                <h6 className="rented__heading">Lorem ipsum dolor sit.</h6>
                                <div className="rented__rating">
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                    <div className="rented__rating-text">4.5</div>
                                    <div className="rented__rating-reviews">
                                        12 reviews
                                    </div>
                                </div>
                                <div className="rented__more">
                                    <div className="rented__more-left">
                                        <ul className="rented__conditions">
                                            <li className="rented__conditions-item">

                                                <ChairIcon />
                                                <span> 4</span>

                                            </li>
                                            <li className="rented__conditions-item">
                                                <SquareFootIcon />
                                                <span>12.2</span>
                                            </li>
                                        </ul>
                                        <div className="rented__address">
                                            <FmdGoodIcon /> <span>1901 Thornridge Cir. Shiloh, Hawaii 81063</span>
                                        </div>
                                    </div>
                                    <div className="rented__progress">
                                        <Flex gap="small" wrap>
                                            {/* <Progress type="circle" percent={75} format={(percent) => `${percent} Days`} /> */}
                                            <Progress size="small" type="circle" percent={100} format={() => 'Done'} />
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="rented__item">
                        <Link to="/" className='rented__link'>
                            <div className="rented__image">
                                <img src="https://media.istockphoto.com/id/1460755337/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9-%D1%86%D0%B2%D0%B5%D1%82-%D1%82%D0%B5%D0%BC%D0%B0-%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%81%D1%82%D0%B8%D0%BB%D1%8F-%D0%BE%D1%84%D0%B8%D1%81-%D1%81-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D1%8B%D0%BC-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BF%D0%BE%D0%BB%D0%BE%D0%BC-%D0%B8-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%BC-%D0%BA%D0%BE%D0%BB%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=6menE2KqfuDLd1jWnsL0FPWPTUT9ZHtnTZZ49s5Hbik=" alt="" />
                            </div>
                            <div className="rented__info">
                                <div className="rented__descr">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                                <h6 className="rented__heading">Lorem ipsum dolor sit.</h6>
                                <div className="rented__rating">
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                    <div className="rented__rating-text">4.5</div>
                                    <div className="rented__rating-reviews">
                                        12 reviews
                                    </div>
                                </div>
                                <div className="rented__more">
                                    <div className="rented__more-left">
                                        <ul className="rented__conditions">
                                            <li className="rented__conditions-item">

                                                <ChairIcon />
                                                <span> 4</span>

                                            </li>
                                            <li className="rented__conditions-item">
                                                <SquareFootIcon />
                                                <span>12.2</span>
                                            </li>
                                        </ul>
                                        <div className="rented__address">
                                            <FmdGoodIcon /> <span>1901 Thornridge Cir. Shiloh, Hawaii 81063</span>
                                        </div>
                                    </div>
                                    <div className="rented__progress">
                                        <Flex gap="small" wrap>
                                            {/* <Progress type="circle" percent={75} format={(percent) => `${percent} Days`} /> */}
                                            <Progress size="small" type="circle" percent={100} format={() => 'Done'} />
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="rented__item">
                        <Link to="/" className='rented__link'>
                            <div className="rented__image">
                                <img src="https://media.istockphoto.com/id/1460755337/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9-%D1%86%D0%B2%D0%B5%D1%82-%D1%82%D0%B5%D0%BC%D0%B0-%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%81%D1%82%D0%B8%D0%BB%D1%8F-%D0%BE%D1%84%D0%B8%D1%81-%D1%81-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D1%8B%D0%BC-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BF%D0%BE%D0%BB%D0%BE%D0%BC-%D0%B8-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%BC-%D0%BA%D0%BE%D0%BB%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=6menE2KqfuDLd1jWnsL0FPWPTUT9ZHtnTZZ49s5Hbik=" alt="" />
                            </div>
                            <div className="rented__info">
                                <div className="rented__descr">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                                <h6 className="rented__heading">Lorem ipsum dolor sit.</h6>
                                <div className="rented__rating">
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                    <div className="rented__rating-text">4.5</div>
                                    <div className="rented__rating-reviews">
                                        12 reviews
                                    </div>
                                </div>
                                <div className="rented__more">
                                    <div className="rented__more-left">
                                        <ul className="rented__conditions">
                                            <li className="rented__conditions-item">

                                                <ChairIcon />
                                                <span> 4</span>

                                            </li>
                                            <li className="rented__conditions-item">
                                                <SquareFootIcon />
                                                <span>12.2</span>
                                            </li>
                                        </ul>
                                        <div className="rented__address">
                                            <FmdGoodIcon /> <span>1901 Thornridge Cir. Shiloh, Hawaii 81063</span>
                                        </div>
                                    </div>
                                    <div className="rented__progress">
                                        <Flex gap="small" wrap>
                                            {/* <Progress type="circle" percent={75} format={(percent) => `${percent} Days`} /> */}
                                            <Progress size="small" type="circle" percent={100} format={() => 'Done'} />
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RentedPage