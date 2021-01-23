import firebase from "../config";
import { RETRIEVE_COMMUNITY_POSTS } from "./types";
import { IPost, IPostWithDocId, AppThunk } from "../definitions";

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

  dispatch({
    type: RETRIEVE_COMMUNITY_POSTS,
    payload: { posts: retrievedPosts, loading: false },
  });
};
