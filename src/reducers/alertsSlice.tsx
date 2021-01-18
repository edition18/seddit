import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
import { IAlertPayload } from "../typeDefinitions";

const initialState: IAlertPayload[] = [];

export default function (
  state = initialState,
  action: { type: string; payload: IAlertPayload }
): typeof state {
  // return type of state
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload.id);
    default:
      return state;
  }
}
