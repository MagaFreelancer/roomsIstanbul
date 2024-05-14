import { FC } from "react";
import "./Button.scss";
import { IPropsButton } from "../../common/types/button";

const Button: FC<IPropsButton> = (props: IPropsButton): JSX.Element => {
  const { children, cls, type } = props
  return <button type={type} className={`button ${cls}`}>{children}</button>;
};

export default Button;
