import { FC } from "react";
import "./Button.scss";

/* eslint-disable react-refresh/only-export-components */
export enum BtnClasses {
  BUTTON_BIG = "button--big",
  BUTTON_SM = "button--sm"
}
type Props = {
  children: string | JSX.Element
  cls: BtnClasses.BUTTON_BIG | BtnClasses.BUTTON_SM,
}
const Button: FC<Props> = ({ children, cls }) => {
  return <button className={`button ${cls}`}>{children}</button>;
};

export default Button;
