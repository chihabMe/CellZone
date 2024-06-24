import React, { HTMLProps } from "react";
interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
}
const FormController = (props: Props) => {
  return (
    <div className="w-full space-y-2 font-medium">
      {props.label && <label  className="capitalize" htmlFor="">{props.label}</label>}
      <input className="w-full bg-gray-100 px-4 rounded-md h-10 " {...props} />
    </div>
  );
};

export default FormController;
