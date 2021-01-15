export {};

import { REGISTER_SUCCESS } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  // false at first, but will change it to true if auth succcess
};

export default function (
  state = initialState,
  action: { type: string; payload: boolean }
): typeof state {
  // return type of state
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: payload,
      };
    default:
      return state;
  }
}
