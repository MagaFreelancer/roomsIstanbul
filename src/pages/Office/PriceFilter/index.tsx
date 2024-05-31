import { FC } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Slider } from '@mui/material';
import { IPropsPrice } from '../../../common/types/filters';

const PriceFilter: FC<IPropsPrice> = (props: IPropsPrice): JSX.Element => {
  const { setMinmaxPrice, minmaxPrice } = props

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    // activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setMinmaxPrice(newValue)
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
      >
        <h3 className="office__heading">
          Цена
        </h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className="office__price">
          <div className="office__info">
            <span className='office__number'>{minmaxPrice[0]} ₺</span>
            <span className='office__number'>{minmaxPrice[1]} ₺</span>
          </div>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={minmaxPrice}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            disableSwap
            step={100}
            min={350}
            max={990}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default PriceFilter