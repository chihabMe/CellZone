import { uiContext } from "@/context/uiContext";
import { useContext } from "react";

export const useUi = () => useContext(uiContext);
