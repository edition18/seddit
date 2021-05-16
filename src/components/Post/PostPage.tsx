import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import { match } from "react-router";

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
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    nsfw: false,
    thumbnail: "",
  });
  useEffect(() => {
    if (postsState.posts.length === 0) {
      thunkDispatch(retrievePostsByCommunity(match.params.community));
    }
  }, [postsState.posts.length]);

  const specificPost = postsState.posts.find(
    (post) => post.docId === match.params.docId
  );
  useEffect(() => {
    setFormData({
      title: specificPost?.title || "",
      body: specificPost?.body || "",
      nsfw: specificPost?.nsfw || false,
      thumbnail: specificPost?.thumbnail || "",
    });
  }, [postsState.posts.length]);
  const [editView, setEditView] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    console.log(formData);
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
      {specificPost ? (
        <Grid container>
          <Grid item xs={9}>
            <Grid container className={classes.defaultPadding}>
              <Grid
                item
                xs={1}
                className={classes.centerChildElementsVertically}
              >
                <IconButton color="inherit">
                  <ArrowUpward />
                </IconButton>
                <Typography variant="h4">
                  {specificPost.upvotes === undefined ||
                  specificPost.downvotes === undefined
                    ? undefined
                    : specificPost.upvotes - specificPost.downvotes}
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
                          defaultValue={specificPost.title}
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
                          defaultValue={specificPost.thumbnail}
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
                          defaultValue={specificPost.body}
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
                    <Typography variant="h2">{specificPost.title}</Typography>
                    <Typography>{specificPost.thumbnail}</Typography>
                    <Typography>{specificPost.body}</Typography>

                    <FormControlLabel
                      control={
                        <Checkbox checked={specificPost.nsfw} name="nsfw" />
                      }
                      label="nsfw"
                    />
                  </Fragment>
                )}

                {authState.uid === specificPost.uid && (
                  <PostEditMenu match={match} toggleEditView={toggleEditView} />
                )}
              </Grid>
              {/* formatting of comments below the main post */}
              {authState.isAuthenticated && (
                <CommentBox
                  community={match.params.community}
                  docId={match.params.docId}
                />
              )}
              <Comments comments={specificPost.comments} />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <MasterSidebar match={match} />
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default PostPage;
