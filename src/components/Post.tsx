import React, { FunctionComponent, Fragment } from "react";
import { IPost } from "../definitions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// uid for test account: 53yPOQMea5Sb3L1Nj2NzBNMTdJ53

type PostProps = {
  post: IPost;
};

const Post: FunctionComponent<PostProps> = ({
  post: { timeCreated, thumbnail, header, body },
}) => {
  // store posts by collections of communities

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <Typography>{timeCreated}</Typography>
        <Typography>{thumbnail && thumbnail}</Typography>
        <Typography>{header}</Typography>
        <Typography>{body}</Typography>
      </Grid>
    </Fragment>
  );
};

export default Post;

// store posts by collections of communities
//   const db = firebase.firestore();

//   const post1: IPost = {
//     timeCreated: Date.now(),
//     uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//     community: "memes",
//     header: "check out this dank meme",
//     body: "see title",
//   };
//   const post2: IPost = {
//     timeCreated: Date.now(),
//     uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//     community: "memes",
//     header: "check out this dank meme, better than the previous!",
//     body: "see title please",
//   };
//   const post3: IPost = {
//     timeCreated: Date.now(),
//     uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//     community: "memes",
//     header: "seriously, its bad",
//     body: "see title please",
//   };

//   const postArray: IPost[] = [post1, post2, post3];

// {postArray.forEach((post: IPost) => {
//   db.collection(post.community).add({
//     timeCreated: post.timeCreated,
//     uid: post.uid,
//     community: post.community,
//     header: post.header,
//     body: post.body,
//     thumbnail: post.thumbnail ? post.thumbnail : "",
//   });
// })}
