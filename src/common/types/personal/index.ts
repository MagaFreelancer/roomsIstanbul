import { AppDispatch } from "../../../redux/store"
import { IUserData } from "../auth"

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
