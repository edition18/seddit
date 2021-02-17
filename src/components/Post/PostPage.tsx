import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { match } from "react-router-dom";
import { retrievePostsByCommunity, updatePost } from "../../actions/posts";
import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";

import { Fragment } from "react";
import MasterSidebar from "../Sidebar/MasterSidebar";
import useStyles from "../../styles/customStyles";
import { IconButton } from "@material-ui/core";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import PostEditMenu from "./PostEditMenu";
import CommentBox from "./CommentBox";
import Comments from "./Comments";

import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";

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
  const [editView, setEditView] = useState(false);
  const [formData, setFormData] = useState({
    title: specificPost ? specificPost.title : "",
    body: specificPost ? specificPost.body : "",
    nsfw: specificPost ? specificPost.nsfw : false,
    thumbnail: specificPost ? specificPost.thumbnail : "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  const toggleEditView = () => {
    if (editView === false) {
      setEditView(true);
    } else {
      // changes made, dispatch changes
      thunkDispatch(
        updatePost(formData, match.params.docId, match.params.community)
      );
      setEditView(false);
    }
  };

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
                // edit mode
                <Fragment>
                  <Grid container>
                    <Grid item xs={12} className={classes.defaultPadding}>
                      <TextField
                        fullWidth={true}
                        name="title"
                        defaultValue={specificPost?.title}
                        className={classes.textFields}
                        id="title"
                        label="title"
                        variant="outlined"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.defaultPadding}>
                      <br /> {/* line break */}
                      <TextField
                        fullWidth={true}
                        name="thumbnail"
                        defaultValue={specificPost?.thumbnail}
                        className={classes.textFields}
                        id="thumbnail"
                        label="thumbnail"
                        variant="outlined"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.defaultPadding}>
                      <br /> {/* line break */}
                      <TextField
                        fullWidth={true}
                        name="body"
                        defaultValue={specificPost?.body}
                        className={classes.textFields}
                        id="body"
                        label="body"
                        variant="outlined"
                        onChange={onChange}
                      />
                    </Grid>

                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={onToggle}
                          checked={formData.nsfw}
                          name="nsfw"
                        />
                      }
                      label="nsfw"
                    />
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography variant="h2">{formData?.title}</Typography>
                  <Typography>{formData?.thumbnail}</Typography>
                  <Typography>{formData?.body}</Typography>

                  <FormControlLabel
                    control={<Checkbox checked={formData?.nsfw} name="nsfw" />}
                    label="nsfw"
                  />
                </Fragment>
              )}

              {authState.uid === specificPost?.uid && (
                <PostEditMenu toggleEditView={toggleEditView} />
              )}
              {authState.isAuthenticated && <CommentBox />}
              <Comments comments={specificPost?.comments} />
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
