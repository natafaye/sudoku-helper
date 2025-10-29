import { v4 as uuid } from 'uuid';
import type { TabData } from '../types';

export const CREATE_TAB = "CREATE_TAB" as const;
export const DELETE_TAB = "DELETE_TAB" as const;
export const SET_CURRENT_TAB = "SET_CURRENT_TAB" as const;
export const SET_CURRENT_TAB_DATA = "SET_CURRENT_TAB_DATA" as const;

export const initialTabState = (getInitialTabData: () => TabData) => ({
    current: "0",
    getInitialTabData,
    tabs: [ { id: "0", data: getInitialTabData() } ]
})

export type Tab = {
    id: string
    data: TabData
}

export type TabState = {
    current: string,
    getInitialTabData: () => TabData
    tabs: Tab[]
}

export type TabAction = CreateAction | DeleteAction | SetAction | SetDataAction
type CreateAction = { type: typeof CREATE_TAB, payload?: TabData }
type DeleteAction = { type: typeof DELETE_TAB, payload: string }
type SetAction = { type: typeof SET_CURRENT_TAB, payload: string }
type SetDataAction = { type: typeof SET_CURRENT_TAB_DATA, payload: TabData }

export const tabReducer = (state: TabState, action: TabAction) => {
    switch(action.type) {
        case CREATE_TAB: {
            const newTabId = uuid()
            return { 
                ...state,
                current: newTabId, 
                tabs: [
                    ...state.tabs, 
                    { 
                        id: newTabId, 
                        data: action.payload || state.getInitialTabData()
                    }
                ] 
            }
        }
        case DELETE_TAB: {
            const newTabs = state.tabs.filter(t => t.id !== action.payload)
            let newCurrent = state.current;
            if(newTabs.length === 0) {
                newCurrent = uuid();
                newTabs.push({ id: newCurrent, data: state.getInitialTabData() })
            }
            else if(state.current === action.payload) {
                let newCurrentIndex = state.tabs.findIndex(t => t.id === action.payload) - 1
                if(newCurrentIndex < 0) newCurrentIndex = 1
                newCurrent = state.tabs[newCurrentIndex].id
            }
            return { 
                ...state, 
                current: newCurrent,
                tabs: newTabs,
            }
        }
        case SET_CURRENT_TAB:
            return { 
                ...state, 
                current: action.payload 
            }
        case SET_CURRENT_TAB_DATA:
            return { 
                ...state, 
                tabs: state.tabs.map(t => 
                    (t.id === state.current) ? { ...t, data: action.payload } : t
                )
            }
        default:
            return state;
    }
}
