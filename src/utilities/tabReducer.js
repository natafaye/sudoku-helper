import { v4 as uuid } from 'uuid';

export const CREATE_TAB = "CREATE_TAB";
export const DELETE_TAB = "DELETE_TAB";
export const SET_CURRENT_TAB = "SET_CURENT_TAB";
export const SET_CURRENT_TAB_DATA = "SET_CURRENT_TAB_DATA";

export const initialTabState = (getInitialTabData) => ({
    current: "0",
    getInitialTabData,
    tabs: [ { id: "0", data: getInitialTabData() } ]
})

export const tabReducer = (state, action) => {
    switch(action.type) {
        case CREATE_TAB:
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
        case DELETE_TAB:
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
