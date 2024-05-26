import { SquareItem, CapacityItem } from "../rooms"

export interface IPropsPrice {
    setMinmaxPrice: (value: number[]) => void
    minmaxPrice: number[]
}
export interface IPropsSquare {
    setSquare: (value: SquareItem[]) => void
    square: SquareItem[]
}
export interface IPropsCapacity {
    setCapacity: (value: CapacityItem[]) => void
    capacity: CapacityItem[]
}
export interface IFilters {
    searchValue: string
    minmaxPrice: number[]
    square: SquareItem[]
    capacity: CapacityItem[]
}