import { FC } from "react";
import "./Button.scss";

/* eslint-disable react-refresh/only-export-components */
export enum BtnClasses {
  BUTTON_BIG = "button--big",
  BUTTON_SM = "button--sm"
}
export enum BtnTypes {
  SUBMIT = "submit",
}
type Props = {
  children: string | JSX.Element
  cls: BtnClasses.BUTTON_BIG | BtnClasses.BUTTON_SM,
  type: BtnTypes
}
const Button: FC<Props> = ({ children, cls, type }) => {
  return <button type={type} className={`button ${cls}`}>{children}</button>;
};

export default Button;
