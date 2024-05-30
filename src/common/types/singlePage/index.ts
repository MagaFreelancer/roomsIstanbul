import { DateRangeProps, RangeKeyDict, Range } from 'react-date-range';
import { DataStatus } from '../rooms';
export interface ISingleState {
    singleRoom: ISingleItem;
    status: DataStatus.SUCCESS | DataStatus.FAILED | DataStatus.LOADING
}
export type IPropsCalendar = {
    editableDateInputs?: boolean;
    locale?: Locale;
    onChange?: ((rangesByKey: RangeKeyDict) => void) | undefined;
    ranges?: Range[] | undefined
    scroll?: boolean;
    showDateDisplay?: boolean;
    showMonthAndYearPickers?: boolean
    showPreview?: boolean
} & DateRangeProps
export type ISingleItem = {
    id: number
    name: string
    price: number
    capacity: number
    square: string
    address: string
    imageUrl: string
    info: string[]
    imgs: string[]
}