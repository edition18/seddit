export {};

import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

import combinedReducers from "./reducers/index";

export type RootState = ReturnType<typeof combinedReducers>;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export interface IAlertPayload {
  message?: string;
  id?: string;
  severity?: "error" | "success" | "info" | "warning" | undefined; // this is material ui Alert type
}

export interface IActionCreator extends AnyAction {
  // a Action that has a type and can also accomodate a payload
  type: string;
  payload?: IAlertPayload | IAuthPayload;
}

export interface IAuthState extends IAuthPayload {
  isAuthenticated: boolean;
}

export interface IAuthPayload {
  email: string | undefined | null;
  uid: string | undefined | null;
  username: string | undefined | null;
  loading: boolean | undefined;
}

// each doc in the collection will be named by UID
// with username
// profilePicture
// email

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThunkDispatch = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

//useDispatch is a function that returns another function that asks for an argument for Dispatch
// so inorder to supply the argument to the returned function we need to do useDispatch()(arg)
// which is how we utilize the hook

export interface IPostsState {
  posts: IPostWithDocId[];
  loading: boolean;
}
export interface IPostsPayload {
  posts: IPostWithDocId[];
  loading: boolean;
}

export interface IPost {
  // general information
  datetime?: number;
  lastEditDateTime?: number;
  uid?: string; //unique user id per auth()
  //post specific
  pid?: string; //postid
  community?: string; //subreddit eqv
  thumbnail?: string; //image or video
  title: string;
  body: string;
  comments?: IPost[];
  nsfw: boolean;
  upvotes?: number;
  downvotes?: number;
}

export interface IPostWithDocId extends IPost {
  docId: string;
}
