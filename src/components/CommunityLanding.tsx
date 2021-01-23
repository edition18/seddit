import React, { FunctionComponent, Fragment, useEffect } from "react";

import Post from "./Post";
// import { useParams } from "react-router-dom";
import { match } from "react-router";

import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../definitions";
import { retrievePostsByCommunity } from "../actions/posts";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";

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
      <Typography variant="h2">Welcome to {match.params.community}</Typography>
      {!postsState.loading ? (
        postsState.posts.map((post) => <Post key={uuidv4()} post={post}></Post>)
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default CommunityLanding;
