export enum DataStatus {
	LOADING = "loading",
	SUCCESS = "success",
	FAILED = "failed"
}
export interface DataType {
	id: number,
	name: string,
	price: number,
	couch: number,
	table: number,
	address: string,
	imageUrl: string
}
export interface StateType {
	items: DataType[],
	// status: string,
	status: DataStatus.LOADING | DataStatus.SUCCESS | DataStatus.FAILED
}