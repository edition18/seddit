import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { match } from "react-router-dom";
import { retrievePostsByCommunity } from "../../actions/posts";
import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Fragment } from "react";
import MasterSidebar from "../Sidebar/MasterSidebar";
import useStyles from "../../styles/customStyles";
import { IconButton } from "@material-ui/core";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import PostEditMenu from "./PostEditMenu";

interface PostPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const PostPage: FunctionComponent<PostPageProps> = ({ match }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const postsState = useSelector((state: RootState) => state.posts);
  const thunkDispatch = useThunkDispatch();
  useEffect(() => {
    postsState.posts.length === 0
      ? thunkDispatch(retrievePostsByCommunity(match.params.community))
      : "";
  }, [postsState.posts]);

  const specificPost = postsState.posts.find(
    (post) => post.docId === match.params.docId
  );

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={9}>
          <Grid container className={classes.container}>
            <Grid item xs={1} className={classes.centerChildElementsVertically}>
              <IconButton color="inherit">
                <ArrowUpward />
              </IconButton>
              <Typography variant="h4">
                {specificPost?.upvotes === undefined ||
                specificPost?.downvotes === undefined
                  ? undefined
                  : specificPost?.upvotes - specificPost?.downvotes}
              </Typography>
              <IconButton color="inherit">
                <ArrowDownward />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h2">{specificPost?.title}</Typography>
              <Typography>{specificPost?.body}</Typography>
              {authState.uid === specificPost?.uid && <PostEditMenu />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <MasterSidebar match={match} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PostPage;
