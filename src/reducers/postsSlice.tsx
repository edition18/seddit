import { RETRIEVE_COMMUNITY_POSTS } from "../actions/types";
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
    default:
      return state;
  }
}
