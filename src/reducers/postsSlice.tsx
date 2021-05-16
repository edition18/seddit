import {
  RETRIEVE_COMMUNITY_POSTS,
  SUBMIT_POST,
  DELETE_POST,
} from "../actions/types";
import { IPostsState, IPostsPayload } from "../definitions";

const initialState: IPostsState = {
  posts: [],
  loading: true,
};

export default function (
  state = initialState,
  action: { type: string; payload: IPostsPayload }
): typeof state {
  // return type of state
  switch (action.type) {
    case RETRIEVE_COMMUNITY_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: action.payload.loading,
      };
    case SUBMIT_POST: //no behavior given we delegate workload to RETRIEVE_COMMUNITY_POSTS reducer
    case DELETE_POST: //no behavior given we delegate workload to RETRIEVE_COMMUNITY_POSTS reducer
    default:
      return state;
  }
}
