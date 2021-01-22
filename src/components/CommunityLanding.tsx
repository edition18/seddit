import React, { FunctionComponent, Fragment } from "react";
import { IUserPosts } from "../definitions";
import Post from "./Post";
// import { useParams } from "react-router-dom";
import { match } from "react-router";

interface CommunityLandingProps extends IUserPosts {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const CommunityLanding: FunctionComponent<CommunityLandingProps> = ({
  posts,
  match,
}) => {
  return (
    <Fragment>
      {console.log(match.params.community)}
      {posts ? posts.map((post) => <Post post={post}></Post>) : ""}
    </Fragment>
  );
};

export default CommunityLanding;
