import firebase from "../config";
import { RETRIEVE_COMMUNITY_POSTS, SUBMIT_POST } from "./types";
import { IPost, IPostWithDocId, AppThunk } from "../definitions";
import { alertSuccess } from "./alerts";

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
        const postObject: IPost = doc.data() as IPost;
        const postObjectWithDocId: IPostWithDocId = {
          ...postObject,
          docId: doc.id,
        };

        retrievedPosts.push(postObjectWithDocId); // TYPE ASSERTION!
      });
    });
  console.log(retrievedPosts);
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
  });
  dispatch({ type: SUBMIT_POST });
  dispatch(alertSuccess("post created", "success"));
  dispatch(retrievePostsByCommunity(community));
};
