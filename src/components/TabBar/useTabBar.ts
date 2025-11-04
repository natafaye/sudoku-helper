import { useReducer } from "react";
import { SET_CURRENT_TAB_DATA } from "./types";
import { tabReducer } from "./tabReducer";

export const useTabBar = <T>(getInitialTabData: () => T) => {
  const [state, dispatch] = useReducer(tabReducer, {
    current: "0",
    getInitialTabData,
    tabs: [{ id: "0", data: getInitialTabData() }],
  });

  const setCurrentData = (newData: T) => {
    dispatch({ type: SET_CURRENT_TAB_DATA, payload: newData });
  };

  const currentTab = state.tabs.find((t) => t.id === state.current)!

  return {
    currentData: currentTab.data,
    setCurrentData,
    tabBarProps: {
      state,
      dispatch,
    },
  };
};
