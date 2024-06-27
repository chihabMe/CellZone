"use client";
import Checkbox from "@/components/ui/Checkbox";
import { IMemorySize } from "./LeftSideFilterSearch";
interface Props {
  memorySizes: IMemorySize[];

  handleSearch: (key: string, value: string) => void;
  queryKey: string;
}
const MemorySizes = ({ handleSearch, memorySizes, queryKey }: Props) => {
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Built-in memory </h1>
      <ul className="flex flex-col gap-2">
        {memorySizes.map((m) => (
          <li key={`memory_size_${m.memory}`} className="flex items-center space-x-4">
            <Checkbox
              onChange={(active) => {
                if (active) handleSearch(queryKey, m.memory.toString());
                else handleSearch(queryKey, "");
              }}
            />
            <span>{m.memory}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MemorySizes;
