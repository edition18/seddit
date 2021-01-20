import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/types";
import { IAuthPayload, IAuthState } from "../definitions";

const initialState: IAuthState = {
  isAuthenticated: false,
  // false at first, but will change it to true if auth succcess
  email: "",
  uid: "",
  loading: true,
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
        loading: false,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
