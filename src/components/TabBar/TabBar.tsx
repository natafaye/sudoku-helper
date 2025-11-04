import type { Dispatch } from 'react'
import { CREATE_TAB, DELETE_TAB, SET_CURRENT_TAB, type Tab, type TabAction, type TabState } from './types'

type Props<T> = {
    state: TabState<T>
    dispatch: Dispatch<TabAction<T>>
    makeTitle: (tab: Tab<T>) => string
}

export default function TabBar<T>({ state, dispatch, makeTitle}: Props<T>) {
    
    const setCurrent = (tab: Tab<T>) => {
        dispatch({ type: SET_CURRENT_TAB, payload: tab.id})
    }

    const newTab = () => {
        dispatch({ type: CREATE_TAB })
    }
    
    const deleteTab = (id: string) => {
        dispatch({ type: DELETE_TAB, payload: id })
    }

    return (
        <ul className="nav nav-tabs">
            {state.tabs.map(tab => 
                <li className="nav-item" key={tab.id}>
                    <div role="button"
                        className={"nav-link link-success pe-2 " + (state.current === tab.id ? "active" : "")} 
                        aria-current={ state.current === tab.id ? "true" : "false" } 
                        onClick={() => setCurrent(tab)}>
                            { makeTitle(tab) }
                            <button 
                                className="btn btn-sm btn-close ms-4 me-1" 
                                style={{ fontSize: "0.6rem" }}
                                onClick={(event) => (event.stopPropagation(), deleteTab(tab.id))}>
                            </button>
                    </div>
                </li>
            )}
            <li className="nav-item">
                <button className="nav-link fw-bold" onClick={newTab}>+</button>
            </li>
        </ul>
    )
}