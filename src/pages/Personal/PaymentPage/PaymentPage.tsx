import React, { FC } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPropsPaymentPage } from '../../../common/types/personal';
import { IPayment, IUserData } from '../../../common/types/auth';
import { fetchPatchProfile } from '../../../redux/thunk/auth';
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
const PaymentPage: FC<IPropsPaymentPage> = (props: IPropsPaymentPage): JSX.Element => {
  const { user, isLogged, dispatch } = props
  const [age, setAge] = React.useState('default');
  let story: IPayment[] = []
  const storyTypes = {
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
    let sortedStory: any[] = []
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
  const lol = sortedStory(age)
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
      type: "increment"
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
        <h5 className="payment__heading">
          Balance
        </h5>
        <div className="payment__sum">
          {numberFormat(user.balance)} ₺
        </div>
        <div className="payment__ops">
          <button className='button payment__btn' onClick={addBalance}>Пополнить счет</button>
        </div>
      </div>
      <div className="payment__story">
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
              {lol.map((item, index) => {
                const storyStatus = item.type === 'increment' ? true : false
                let day: string | number = new Date(item.date).getDate()
                let month: string | number = new Date(item.date).getMonth()
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