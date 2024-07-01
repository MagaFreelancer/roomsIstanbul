import { AppDispatch } from "../../../redux/store"
import { IRooms, IUserData } from "../auth"
import { DataType } from "../rooms"

export interface IPropsBreadCrumb {
    pathname: string
}
export interface IPropsProfilePage {
    user: IUserData
    isLogged: boolean
    dispatch: AppDispatch;
}
export interface IPropsPaymentPage {
    user: IUserData
    isLogged: boolean
    dispatch: AppDispatch;
}
export interface IPropsRentedPage {
    user: IUserData
    isLogged: boolean
    items: DataType[]
}
export interface IPropsFavouritePage {
    dispatch: AppDispatch;
    user: IUserData
    isLogged: boolean
    items: DataType[]
}
export interface IPropsFavouritedRoom {
    dispatch: AppDispatch;
    item: DataType
    user: IUserData
}
export type IRentedRooms = DataType & IRooms
