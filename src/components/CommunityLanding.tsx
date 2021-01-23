import React, { FunctionComponent, Fragment, useEffect } from "react";

import Post from "./Post";
// import { useParams } from "react-router-dom";
import { match } from "react-router";

import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../definitions";
import { retrievePostsByCommunity } from "../actions/posts";

interface CommunityLandingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const CommunityLanding: FunctionComponent<CommunityLandingProps> = ({
  match,
}) => {
  const thunkDispatch = useThunkDispatch();
  useEffect(() => {
    thunkDispatch(retrievePostsByCommunity(match.params.community));
  }, []);

  const postsState = useSelector((state: RootState) => state.posts);

  return (
    <Fragment>
      {console.log(postsState)}
      {postsState.posts.length ? (
        postsState.posts.map((post) => <Post post={post}></Post>)
      ) : (
        <div>Looking pretty dead here</div>
      )}
    </Fragment>
  );
};

export default CommunityLanding;
