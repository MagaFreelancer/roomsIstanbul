import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
export interface IPropsLogin<
    TFieldValues extends FieldValues = FieldValues,
> {
    navigate: (to: string) => void
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
    loading: boolean
}
export interface IPropsRegister<
    TFieldValues extends FieldValues = FieldValues,
> {
    navigate: (to: string) => void
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
    loading: boolean
}
export interface IloginData {
    email: string
    password: string
}
export interface IStateType {
    user: {
        user: IUserData
        token: string
    }
    isloading: boolean
    isLogged: boolean
}
export interface IUserData {
    username: string
    fistName: string
    email: string
    imageUrl: string
}
export interface IPropsProfile {
    data: IUserData
}