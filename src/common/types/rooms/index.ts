export enum DataStatus {
	LOADING = "loading",
	SUCCESS = "success",
	FAILED = "failed"
}
export interface DataType {
	id: number
	name: string
	price: number
	address: string
	imageUrl: string
	square: string
	capacity: number
	info: string[]
	imgs: string[]
}
export interface StateType {
	items: DataType[]
	searchValue: string
	minmaxPrice: number[]
	square: SquareItem[]
	capacity: CapacityItem[]
	// status: string,
	status: DataStatus.LOADING | DataStatus.SUCCESS | DataStatus.FAILED
}
export type SquareItem = {
	value: string
	checked: boolean
	id: number
}
export type CapacityItem = {
	value: number
	checked: boolean
	id: number
}

export type PointsType = { text: string; heading: string; class: string }
export interface IPropsHero {
	items: DataType[]
	status: DataStatus.LOADING | DataStatus.SUCCESS | DataStatus.FAILED
}