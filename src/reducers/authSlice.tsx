import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SUBSCRIBE_UPDATE,
} from "../actions/types";

import { IAuthPayload, IAuthState } from "../definitions";

const initialState: IAuthState = {
  isAuthenticated: false,
  // false at first, but will change it to true if auth succcess
  email: undefined,
  uid: undefined,
  loading: true,
  username: undefined,
  subscribed: [] as string[],
};

export default function (
  state = initialState,
  action: { type: string; payload?: IAuthPayload }
): typeof state {
  // return type of state
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload?.email,
        uid: action.payload?.uid,
        loading: action.payload?.loading,
        username: action.payload?.username,
        subscribed: action.payload?.subscribed,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: action.payload?.loading,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: action.payload?.loading,
        email: undefined,
        uid: undefined,
        username: undefined,
        subscribed: [],
      };
    case SUBSCRIBE_UPDATE:
      return {
        ...state,
        subscribed: action.payload?.subscribed,
      };
    default:
      return state;
  }
}
