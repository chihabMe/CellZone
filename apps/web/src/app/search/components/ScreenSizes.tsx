"use client";
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { IScreenSize } from "./LeftSideFilterSearch";

interface Props {
  screenSizes: IScreenSize[];
  handleSearch: (key: string, value: string[]) => void;
  queryKey: string;
  initialState: string[];
}

const ScreenSizes = ({
  handleSearch,
  queryKey,
  screenSizes,
  initialState,
}: Props) => {
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(initialState);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  React.useEffect(() => {
    handleSearch(queryKey, selectedValues);
  }, [selectedValues]);

  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium">Screen sizes</h1>
      <ul className="flex flex-col gap-2">
        {screenSizes.map((s) => (
          <li
            key={`screen_size_${s.screenSize}`}
            className="flex items-center space-x-4"
          >
            <Checkbox
            defaultChecked={initialState.includes(s.screenSize.toString())}
             onClick={() => toggleValue(s.screenSize.toString())} />
            <span>{s.screenSize}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScreenSizes;
