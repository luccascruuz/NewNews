import { AppThunk } from "../Interfaces/Dispatchs";
import { NAVBAR_ACTIONS } from "./ActionTypes";

export const navBarOpened = (opened: boolean): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: NAVBAR_ACTIONS.OPENED,
      payload: opened,
    });
  };
};
