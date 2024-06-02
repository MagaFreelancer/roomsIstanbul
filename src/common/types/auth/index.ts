import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
export interface IPropsLogin<
    TFieldValues extends FieldValues = FieldValues,
> {
    navigate: (to: string) => void
    register: UseFormRegister<IloginData>
    errors: FieldErrors<TFieldValues>
    loading: boolean
}
export interface IPropsRegister<
    TFieldValues extends FieldValues = FieldValues,
> {
    navigate: (to: string) => void
    register: UseFormRegister<IRegisterData>
    errors: FieldErrors<TFieldValues>
    loading: boolean
}
export interface IloginData {
    email: string
    password: string
}
export interface IStateType {
    user: {
        data: IUserData
        token: string
    }
    isloading: boolean
    isLogged: boolean
}
export interface IUserData {
    username: string
    firstName: string
    email: string
    imageUrl: string
    favorite: string[]
}
export interface IRegisterData {
    username: string
    firstName: string
    email: string
    password: string
    confirmPassword: string
}
export interface IPropsProfile {
    data: IUserData
}