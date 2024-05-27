import { FC } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox } from '@mui/material';
import { IPropsCapacity } from '../../../common/types/filters';

const CapacityFilter: FC<IPropsCapacity> = (props: IPropsCapacity): JSX.Element => {
  const { capacity, setCapacity } = props

  const onChangeCheckbox = (id: number) => {
    setCapacity(capacity.map(item => {
      if (item.id === id) {
        return {
          ...item, checked: !item.checked
        }
      } else {
        return item
      }
    }))
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
      >
        <h3 className="office__heading">
          Вместимость
        </h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className="office__checks">
          {capacity.map((item, index) => (
            <label key={index}>
              <Checkbox
                onChange={() => onChangeCheckbox(item.id)}
                checked={item.checked}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <span>{item.value} Человек</span>
            </label>))}

        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default CapacityFilter