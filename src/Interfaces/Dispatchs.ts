import { Action } from "redux";
import { RootState } from "../Reducers";
import { ThunkAction } from 'redux-thunk';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

interface INavBarOpened {
  type: string;
  payload: boolean;
}

export type NavBarDispatch = INavBarOpened;
