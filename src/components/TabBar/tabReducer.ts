import { v4 as uuid } from 'uuid';
import { CREATE_TAB, DELETE_TAB, SET_CURRENT_TAB, SET_CURRENT_TAB_DATA, type TabAction, type TabState } from './types';

export const tabReducer = <T>(state: TabState<T>, action: TabAction<T>) => {
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
                if(newCurrentIndex < 0) newCurrentIndex = 0
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
