import React, { FC } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPropsPaymentPage } from '../../../common/types/personal';
import { IPayment, IUserData } from '../../../common/types/auth';
import { fetchPatchProfile } from '../../../redux/thunk/auth';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import './PaymentPage.scss'



const balanceCount = (array: IPayment[]): number => {
  const count = array.reduce((sum, item) => {
    if (item.type === 'increment') {
      return sum + item.sum;
    } else {
      return sum - item.sum;
    }
  }, 0); // начальное значение аккумулятора - 0
  return count
}
const numberFormat = (sum: number): string => {
  return new Intl.NumberFormat('tr-TR',
    { maximumSignificantDigits: 4 }).format(
      sum,
    )
}
function createData(
  time: string,
  amount?: number,
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}



const PaymentPage: FC<IPropsPaymentPage> = (props: IPropsPaymentPage): JSX.Element => {
  const { user, isLogged, dispatch } = props
  const [age, setAge] = React.useState('default');
  const [state, setState] = React.useState({});
  let story: IPayment[] = []
  const storyTypes: Record<string, string> = {
    increment: 'replenished',
    decrement: 'spent'
  }
  if (isLogged) {
    story = [...user.payments.replenished]
  }

  // const filteredStory = story.map(Boolean).filter(item => item.name)
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;

    setAge(selectedValue); // Обновляем состояние с выбранным значением
    sortedStory(selectedValue)
  };
  const sortedStory = (type: string) => {
    let sortedStory: IPayment[] = []
    if (type === 'date') {
      sortedStory = story.sort((a, b) => {
        const aDate = Number(new Date(a.date))
        const bDate = Number(new Date(b.date))

        return aDate - bDate
      })
    } else if (type === '-date') {
      sortedStory = story.sort((a, b) => {
        const aDate = Number(new Date(a.date))
        const bDate = Number(new Date(b.date))

        return bDate - aDate
      })
    } else {
      sortedStory = [...story]
    }
    return sortedStory
  }
  const daysOfWeekInRussian = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ];
  const monthsInRussian = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const data = story.map(item => createData(monthsInRussian[new Date(item.date).getMonth()], item.balance))
  console.log(data);

  // const paymentsSum = story.map(item => item.balance)
  const theme = useTheme();


  const paymentItems = sortedStory(age)
  const addBalance = () => {
    if (user.id === undefined) {
      console.error("User ID is undefined");
      return;
    }
    const lastId = story.length > 0 ? story[story.length - 1].id : 0;

    const payment: IPayment = {
      id: lastId + 1,
      sum: 3500,
      date: new Date(),
      type: "increment",
      balance: user.balance
    }

    fetchProfile(user.id, payment)
  }
  const fetchProfile = async (id: number, payment: IPayment) => {

    const changedData: IUserData = {
      ...user,
      balance: balanceCount([...story, payment]),
      payments: {
        replenished: [...story, payment]
      }
    }

    dispatch(fetchPatchProfile({ id, changedData }))
  }

  return (
    <div className='payment'>
      <div className="payment__balance">
        <div className="payment__balance-col payment__balance-col--dash">
          <div className="payment__dashboard" >
            <LineChart
              dataset={data}
              margin={{
                top: 16,
                right: 20,
                left: 70,
                bottom: 30,
              }}
              xAxis={[
                {
                  scaleType: 'point',
                  dataKey: 'time',
                  tickNumber: 2,
                  tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
                },
              ]}
              yAxis={[
                {
                  label: '',
                  labelStyle: {
                    ...(theme.typography.body1 as ChartsTextStyle),
                    fill: theme.palette.text.primary,
                  },
                  tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
                  max: 45000,
                  tickNumber: 3,
                },
              ]}
              series={[
                {
                  dataKey: 'amount',
                  showMark: false,
                  color: theme.palette.primary.light,
                },
              ]}
              sx={{
                [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                  transform: 'translateX(-25px)',
                },
              }}
            />
          </div>
        </div>
        <div className="payment__balance-col">
          <h5 className="payment__heading">
            Balance
          </h5>
          <div className="payment__sum">
            {numberFormat(user.balance)} ₺
          </div>
          <div className="payment__ops">
            <button className='button-blue payment__btn' onClick={addBalance}>Пополнить счет</button>
          </div>
        </div>

      </div>
      <div className="payment__story">
        <h4 className="payment__story-heading">
          Графика
        </h4>

        <div className="payment__nav">
          <h4 className="payment__nav-heading">
            All Customers
          </h4>

          <div className="payment__filter">
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="default">
                <em>Все</em>
              </MenuItem>
              <MenuItem value={'-date'}>От новому к старому</MenuItem>
              <MenuItem value={'date'}>От старого к новому</MenuItem>
            </Select>
          </div>
        </div>

        <div className="payment__table">
          <table>
            <thead className='payment__head'>
              <tr>
                <th >ID</th>
                <th >Sum</th>
                <th >Date</th>
                <th >Status</th>
              </tr>
            </thead>
            <tbody className='payment__body'>
              {paymentItems.map((item, index) => {
                const storyStatus = item.type === 'increment' ? true : false
                let day: string | number = new Date(item.date).getDate()
                let month: string | number = new Date(item.date).getMonth() + 1
                const year: string | number = new Date(item.date).getFullYear()

                if (day < 10) {
                  day = '0' + day
                } if (month < 10) {
                  month = '0' + month
                }
                return (
                  <tr key={index}>
                    <th>{index}</th>
                    <th className={`payment__table-sum ${storyStatus && "payment__table-sum--inc"}`}>
                      {storyStatus ? '+' : '-'}{numberFormat(item.sum)}₺
                    </th>
                    <th>{`${day}.${month}.${year}`}</th>
                    <th className={`payment__table-status ${storyStatus && "payment__table-status--inc"}`}><span>{storyTypes[item.type]}</span></th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage