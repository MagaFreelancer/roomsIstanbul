import { DateRangeProps, RangeKeyDict, Range } from 'react-date-range';
import { DataStatus, DataType } from '../rooms';
import { IRentedRooms } from '../personal';
import { IUserData } from '../auth';
import { AppDispatch } from '../../../redux/store';
export interface ISingleState {
    singleRoom: DataType;
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

export interface IPropsRentedRoom {
    item: IRentedRooms
    diff: number
    prec: number
    user: IUserData
    dispatch: AppDispatch
}