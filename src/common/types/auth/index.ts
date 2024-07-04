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
    id?: number,
    username: string
    firstName: string
    email: string
    imageUrl: string
    favourites: number[]
    password?: string
    imgsId: number
    payments: IPayments
    balance: number,
    rentedRooms: IRooms[]
    createId: number,
    story: {
        favouritesStory: IFavouritedStory[]
        rentedStory: IRentedStory[]
        profileStory: IProfileStory[]
        commentsStory: ICommentsStory[]
        ratingStory: IRatingStory[]
    }
}
export type IRatingStory = {
    id: number,
    date: Date,
    ratingRoomsId: number
    status: 'activate' | "disable" | "changed"
}
export type ICommentsStory = {
    id: number,
    date: Date,
    commentedRoomsId: number
    status: 'activate' | "disable" | "changed"
}
export type IProfileStory = {
    id: number,
    date: Date,
    status: "signed" | "logout" | "registered" | "changed"
}
export type IRentedStory = {
    id: number,
    date: Date,
    rentedRoomsId: number,
    status: "activate" | "disable" | "extend"
}
export type IFavouritedStory = {
    id: number,
    favouritedRoomsId: number,
    date: Date,
    status: "activate" | "disable"
}
export type IRooms = {
    daysCount: number,
    id: number,
    salePrice: number,
    rentedDate: Date
}
export type IPayment = {
    id: number;
    sum: number;
    date: Date;
    type: 'increment' | 'decrement'
    balance: number
}
export interface IPayments {
    replenished: IPayment[];
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
