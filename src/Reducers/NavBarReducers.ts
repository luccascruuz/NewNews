import { NAVBAR_ACTIONS } from "../Actions/ActionTypes";
import { NavbarState } from "../Interfaces/DataTypes";
import { NavBarDispatch } from "../Interfaces/Dispatchs";

const INITIAL_STATE: NavbarState = {
  openedNavBar: false,
};

export default function (state = INITIAL_STATE, action: NavBarDispatch) {
  switch (action.type) {
    case NAVBAR_ACTIONS.OPENED:
      return {
        ...state,
        openedNavBar: action.payload,
      };

    default:
      return state;
  }
}
