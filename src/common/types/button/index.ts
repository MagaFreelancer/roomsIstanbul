export enum BtnClasses {
    BUTTON_BIG = "button--big",
    BUTTON_SM = "button--sm"
}
export enum BtnTypes {
    SUBMIT = "submit",
    BUTTON = 'button'
}
export type IPropsButton = {
    children: string | JSX.Element
    cls?: BtnClasses.BUTTON_BIG | BtnClasses.BUTTON_SM,
    type: BtnTypes
    loading?: boolean
}