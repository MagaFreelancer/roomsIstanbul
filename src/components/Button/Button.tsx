import { FC } from "react";
import { IPropsButton } from "../../common/types/button";
import "./Button.scss";

const Button: FC<IPropsButton> = (props: IPropsButton): JSX.Element => {
  const { children, cls, type } = props
  return <button type={type} className={`button ${cls}`}>{children}</button>;
};

export default Button;
