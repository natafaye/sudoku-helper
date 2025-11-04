export type Tab<T> = {
    id: string
    data: T
}

export type TabState<T> = {
    current: string,
    getInitialTabData: () => T
    tabs: Tab<T>[]
}

export const CREATE_TAB = "CREATE_TAB" as const;
export const DELETE_TAB = "DELETE_TAB" as const;
export const SET_CURRENT_TAB = "SET_CURRENT_TAB" as const;
export const SET_CURRENT_TAB_DATA = "SET_CURRENT_TAB_DATA" as const;

export type TabAction<T> = CreateAction<T> | DeleteAction | SetAction | SetDataAction<T>
type CreateAction<T> = { type: typeof CREATE_TAB, payload?: T }
type DeleteAction = { type: typeof DELETE_TAB, payload: string }
type SetAction = { type: typeof SET_CURRENT_TAB, payload: string }
type SetDataAction<T> = { type: typeof SET_CURRENT_TAB_DATA, payload: T }