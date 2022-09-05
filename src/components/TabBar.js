import React from 'react'
import { CREATE_TAB, DELETE_TAB, SET_CURRENT_TAB } from '../utilities/tabReducer'

export default function TabBar({ state, dispatch, makeTitle, onTabSelect }) {
    
    const setCurrent = (tab) => {
        dispatch({ type: SET_CURRENT_TAB, payload: tab.id})
        onTabSelect(tab)
    }

    const newTab = () => {
        dispatch({ type: CREATE_TAB })
        onTabSelect(state.tabs.find(t => t.id === state.current))
    }
    
    const deleteTab = (id) => {
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
                                onClick={() => deleteTab(tab.id)}>
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