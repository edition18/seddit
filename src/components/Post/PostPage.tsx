import { FunctionComponent, useEffect, useState } from "react";
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
import { TextField } from "@material-ui/core";

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

  const [editView, setEditView] = useState(false);

  const toggleEditView = () => {
    editView === false ? setEditView(true) : setEditView(false);
  };

  const specificPost = postsState.posts.find(
    (post) => post.docId === match.params.docId
  );

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={9}>
          <Grid container className={classes.defaultPadding}>
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
              {editView ? (
                <Fragment>
                  <Grid container>
                    <Grid item xs={12} className={classes.defaultPadding}>
                      <TextField
                        name="title"
                        defaultValue={specificPost?.title}
                        className={classes.textFields}
                        id="title"
                        label="title"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.defaultPadding}>
                      <TextField
                        name="body"
                        defaultValue={specificPost?.body}
                        className={classes.textFields}
                        id="body"
                        label="body"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography variant="h2">{specificPost?.title}</Typography>
                  <Typography>{specificPost?.body}</Typography>
                </Fragment>
              )}

              {authState.uid === specificPost?.uid && (
                <PostEditMenu toggleEditView={toggleEditView} />
              )}
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
