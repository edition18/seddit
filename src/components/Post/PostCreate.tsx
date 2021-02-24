import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { match } from "react-router-dom";
import { submitPost } from "../../actions/posts";
import { IPost, RootState, useThunkDispatch } from "../../definitions";
import useStyles from "../../styles/customStyles";
import CreatePostSidebar from "../Sidebar/CreatePostSidebar";

import { useHistory } from "react-router-dom";

interface PostCreateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const PostCreate: FunctionComponent<PostCreateProps> = ({ match }) => {
  const history = useHistory(); // for redirects
  const thunkDispatch = useThunkDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const [postData, setPostData] = useState<IPost>({
    title: "",
    thumbnail: "",
    body: "",
    nsfw: false,
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  const onSubmit = () => {
    thunkDispatch(submitPost(postData, match.params.community, authState.uid));
    history.push("/community/" + match.params.community);
  };

  return (
    <Grid container>
      <Grid item xs={9}>
        {authState.isAuthenticated ? (
          <Grid container className={classes.defaultPadding}>
            <Grid item xs={12} className={classes.displayBlock}>
              <Typography variant="h5">Title of post</Typography>
              <TextField
                fullWidth
                name="title"
                onChange={onChange}
                className={classes.textFields}
                id="title"
                label="Title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} className={classes.displayBlock}>
              <Typography variant="h5">Thumbnail (image link)</Typography>
              <TextField
                fullWidth
                name="thumbnail"
                onChange={onChange}
                className={classes.textFields}
                id="thumbnail"
                label="thumbnail"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} className={classes.displayBlock}>
              <Typography variant="h5">Body</Typography>
              <TextField
                fullWidth
                name="body"
                onChange={onChange}
                className={classes.textFields}
                id="body"
                label="body"
                variant="outlined"
              />
            </Grid>
            <FormControlLabel
              control={<Checkbox onChange={onToggle} id="nsfw" name="nsfw" />}
              label="nsfw"
            />
            <Button fullWidth onClick={onSubmit}>
              Create Post
            </Button>
          </Grid>
        ) : (
          <Typography variant="h3" align="center">
            You are not authenticated!
          </Typography>
        )}
      </Grid>
      <Grid item xs={3}>
        <CreatePostSidebar />
      </Grid>
    </Grid>
  );
};

export default PostCreate;
