import React from "react";

import * as DefaultCheckBox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@heroicons/react/24/solid";
interface Props {
  defaultChecked?: boolean;
}
const Checkbox = (props: Props) => {
  return (
    <DefaultCheckBox.Root
      defaultChecked={props.defaultChecked}
      className="  w-5  h-5 border-2    rounded-md    shadow-sm "
      id="c1"
    >
      <DefaultCheckBox.Indicator className="bg-gray-900 items-center flex justify-center rounded-md w-5 h-5 ">
        <CheckIcon className="w-4 h-4  text-white" />
      </DefaultCheckBox.Indicator>
    </DefaultCheckBox.Root>
  );
};

export default Checkbox;
