import firebase from "../config";
import { RETRIEVE_COMMUNITY_POSTS, SUBMIT_POST } from "./types";
import { IPost, IPostWithDocId, AppThunk, IComment } from "../definitions";
import { alertSuccess } from "./alerts";
import { v4 as uuidv4 } from "uuid";

export const retrievePostsByCommunity = (community: string): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  const retrievedPosts: IPostWithDocId[] = [];
  await firebase
    .firestore()
    .collection(community)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const postObject: IPost = doc.data() as IPost; // TYPE ASSERTION!
        const postObjectWithDocId: IPostWithDocId = {
          ...postObject,
          docId: doc.id,
        };

        retrievedPosts.push(postObjectWithDocId);
      });
    });
  dispatch({
    type: RETRIEVE_COMMUNITY_POSTS,
    payload: { posts: retrievedPosts, loading: false },
  });
};

export const submitPost = (
  postData: IPost,
  community: string,
  uid: string | undefined | null
): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  firebase.firestore().collection(community).add({
    thumbnail: postData.thumbnail, //image or video
    title: postData.title,
    body: postData.body,
    nsfw: postData.nsfw,
    datetime: Date.now(),
    uid: uid,
    upvotes: postData.upvotes,
    downvotes: postData.downvotes,
  });
  dispatch({ type: SUBMIT_POST });
  dispatch(alertSuccess("post created", "success"));
  dispatch(retrievePostsByCommunity(community));
};

export const updatePost = (
  postData: IPost,
  docId: string,
  community: string
): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  firebase.firestore().collection(community).doc(docId).update({
    title: postData.title,
    body: postData.body,
    nsfw: postData.nsfw,
    thumbnail: postData.thumbnail,
  });

  dispatch({ type: SUBMIT_POST });
  dispatch(alertSuccess("post updated", "success"));
  dispatch(retrievePostsByCommunity(community));
};

export const submitPostComment = (
  comment: string,
  community: string,
  docId: string
): AppThunk => async (
  dispatch
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<void> => {
  const comment: IComment = {
    cid: uuidv4(),
    comment: comment,
  };
};
