import { FC } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { IPropsStoryPage } from '../../../common/types/personal';
import "./StoryPage.scss";
import { Link } from 'react-router-dom';


const valueFormatter = (value: number | null) => `${value} Действий`;

const dateFormat = (date: Date): string => {
    let day: string | number = new Date(date).getDate()
    let month: string | number = new Date(date).getMonth() + 1
    const year: string | number = new Date(date).getFullYear()

    if (day < 10) {
        day = '0' + day
    } if (month < 10) {
        month = '0' + month
    }
    return `${day}.${month}.${year}`
}
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
]
const StoryPage: FC<IPropsStoryPage> = (props: IPropsStoryPage): JSX.Element => {
    const { user, isLogged, items, dispatch } = props

    const rentObj: any = {
        activate: "Арендовал офис",
        disable: "Отменил аренду",
        extend: "Продлил аренду"
    }
    const ratingObj: any = {
        activate: "Добавил рейтинг",
        changed: "Изменил рейтинг"
    }
    const commentObj: any = {
        activate: "Добавил комментарии",
        disable: "Удалил комментарии",
        changed: "Изменил комментарии"
    }
    const favouriteObj: any = {
        activate: "Добавил в избранное ",
        disable: "Удалил из избранное",
    }
    const profileObj: any = {
        signed: "Авторизовался",
        logout: "Вышел из аккаунта",
        registered: "Зарегистрировался",
        changed: "Изменил данные"
    }
    const paymentObj: any = {
        increment: "Вы пополнили счет",
    }
    if (!isLogged) {
        return <>загрузка</>
    }
    const searchName = (arr: any[], id: number) => {
        return arr.find(item => item.id === id);
    };

    const rentedStory = user.story.rentedStory.map(item => {
        const itemObj = searchName(items, item.rentedRoomsId);
        
        return {
            name: `${rentObj[item.status]} ${itemObj?.name}`,
            date: dateFormat(item.date),
            link: item.rentedRoomsId
        };
    });
    const ratingStory = user.story.ratingStory.map(item => {
        const itemObj = searchName(items, item.id);
        return {
            name: `${ratingObj[item.status]} ${itemObj?.name}`,

            date: dateFormat(item.date),
            link: item.ratingRoomsId
        }
    })
    const commentsStory = user.story.commentsStory.map(item => {
        const itemObj = searchName(items, item.id);
        return {
            name: `${commentObj[item.status]} ${itemObj?.name}`,

            date: dateFormat(item.date),
            link: item.commentedRoomsId
        }
    })
    const favouritesStory = user.story.favouritesStory.map(item => {
        const itemObj = searchName(items, item.id);
        return {
            name: `${favouriteObj[item.status]} ${itemObj?.name}`,

            date: dateFormat(item.date),
            link: item.favouritedRoomsId
        }
    })
    const profileStory = user.story.profileStory.map(item => {
        return {
            name: profileObj[item.status],
            date: dateFormat(item.date),
            link: null
        }
    })
    const paymentStory = user.story.paymentStory.map(item => {
        return {
            name: paymentObj[item.status],
            date: dateFormat(item.date),
            link: null
        }
    })
    const filteredStory = [
        ...rentedStory,
        ...ratingStory,
        ...commentsStory,
        ...favouritesStory,
        ...profileStory,
        ...paymentStory

    ]
    const story = [
        ...user.story.rentedStory,
        ...user.story.ratingStory,
        ...user.story.commentsStory,
        ...user.story.favouritesStory,
        ...user.story.profileStory,
        ...user.story.paymentStory
    ]
    const ops: any = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0
    }
    for (let k of story) {
        const monthDate = new Date(k.date).getMonth()
        for (let l in ops) {
            const numberIndex = Number(l)
            if (numberIndex === monthDate) {
                ops[numberIndex] += 1
            }
        }
    }
    const dataset = months.map((item, index) => {
        return {

            seoul: ops[index],
            month: item,
        }
    })

    // const tickPlacement = 'middle'
    // const tickLabelPlacement = 'middle'
    const chartSetting = {
        yAxis: [
            {
                label: '',
            },
        ],
        series: [{ dataKey: 'seoul', label: 'Ваша активность', valueFormatter }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-15px)',
            },

        },
    };


    return (
        <div className="story">
            <h2 className="story__title">
                История
            </h2>
            <div style={{ width: '100%' }}>

                <BarChart
                    dataset={dataset}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'month' }
                    ]}
                    {...chartSetting}
                />
                <div className="payment__table">
                    <table>
                        <thead className='payment__head'>
                            <tr>
                                <th >ID</th>
                                <th >Name</th>
                                <th >Date</th>
                            </tr>
                        </thead>
                        <tbody className='payment__body'>
                            {filteredStory.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <th>{index}</th>
                                        {item.link !== null ? (<th ><Link to={`/offices/${item.link}`}>{item.name}</Link></th>) : <th >{item.name}</th>}
                                        <th >{item.date}</th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );


};
export default StoryPage