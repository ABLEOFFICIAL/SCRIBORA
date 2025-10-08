"use client";
import { Store } from "@/store/Store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}
