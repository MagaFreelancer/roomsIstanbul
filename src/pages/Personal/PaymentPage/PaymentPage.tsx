import React, { FC } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPropsPaymentPage } from '../../../common/types/personal';
import { IPayment } from '../../../common/types/auth';
import './PaymentPage.scss'

const numberFormat = (sum: number): string => {
  return new Intl.NumberFormat('tr-TR',
    { maximumSignificantDigits: 4 }).format(
      sum,
    )
}
const PaymentPage: FC<IPropsPaymentPage> = (props: IPropsPaymentPage): JSX.Element => {
  const { user, isLogged } = props
  const [age, setAge] = React.useState('');
  let story: IPayment[] = []
  const storyTypes = {
    increment: 'replenished',
    decrement: 'spent'
  }
  if (isLogged) {
    story = [...user.payments.replenished, ...user.payments.spend]
  }

  // const filteredStory = story.map(Boolean).filter(item => item.name)
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
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
          <button className='button payment__btn'>Пополнить счет</button>
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
              <MenuItem value="">
                <em>Все</em>
              </MenuItem>
              <MenuItem value={'-date'}>От новому к старому</MenuItem>
              <MenuItem value={'date'}>От старого к новому</MenuItem>
              <MenuItem value={'-status'}>Потрачено</MenuItem>
              <MenuItem value={'status'}>Пополнено</MenuItem>
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
              {story.map((item, index) => {
                const storyStatus = item.type === 'increment' ? true : false

                return (
                  <tr key={index}>
                    <th>{index}</th>
                    <th className={`payment__table-sum ${storyStatus && "payment__table-sum--inc"}`}>
                      {storyStatus ? '+' : '-'}{numberFormat(item.sum)}₺
                    </th>
                    <th>{item.date}</th>
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