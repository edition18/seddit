export {};

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
} from "../actions/types";
import { IKeyUserInformation } from "../typeDefinitions";
const initialState = {
  isAuthenticated: false,
  // false at first, but will change it to true if auth succcess
  keyUserInformation: {} as IKeyUserInformation | undefined,
};

export default function (
  state = initialState,
  action: { type: string; payload?: IKeyUserInformation }
): typeof state {
  // return type of state
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        keyUserInformation: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
