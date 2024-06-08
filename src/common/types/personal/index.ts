import { IUserData } from "../auth"

export interface IPropsBreadCrumb {
    pathname: string
}
export interface IPropsProfilePage {
    user: IUserData
    isLogged: boolean
}