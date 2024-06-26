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
	reviews: DataReviews[]
	rating: number,
	comments: IComment[]
}
export type DataReviews = {
	createId: number,
	userReviews: number | null
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
export type IComment = {
	createId: number,
	addedDate: Date,
	username: string,
	rating: number | null,
	comment: string,
	imageUrl: string
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