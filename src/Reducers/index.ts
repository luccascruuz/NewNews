import { combineReducers } from "redux";

import NavBarReducers from "./NavBarReducers";

export const rootReducer = combineReducers({
    navBar: NavBarReducers
})

export type RootState = ReturnType<typeof rootReducer>; 
