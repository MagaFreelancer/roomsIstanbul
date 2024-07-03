import { FC } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { IPropsStoryPage } from '../../../common/types/personal';
import "./StoryPage.scss";


const valueFormatter = (value: number | null) => `${value}mm`;



const StoryPage: FC<IPropsStoryPage> = (props: IPropsStoryPage): JSX.Element => {
    const { user, isLogged, items, dispatch } = props
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
    const dataset = [
        {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: 'Jan',
        },
        {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: 'Feb',
        },
        {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: 'Mar',
        },
        {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: 'Apr',
        },
        {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: 'May',
        },
        {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: 'June',
        },
        {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: 'July',
        },
        {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: 'Aug',
        },
        {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: 'Sept',
        },
        {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: 'Oct',
        },
        {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: 'Nov',
        },
        {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: 'Dec',
        },
    ];
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
            </div>
        </div>
    );


};
export default StoryPage