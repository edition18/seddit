import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { match } from "react-router-dom";
import { retrievePostsByCommunity } from "../../actions/posts";
import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";

import { Fragment } from "react";
import MasterSidebar from "../Sidebar/MasterSidebar";
import useStyles from "../../styles/customStyles";
import { IconButton } from "@material-ui/core";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import PostEditMenu from "./PostEditMenu";

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

  const [editView, setEditView] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    nsfw: false,
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const specificPost = postsState.posts.find(
    (post) => post.docId === match.params.docId
  );

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
                          checked={specificPost?.nsfw}
                          name="nsfw"
                        />
                      }
                      label="nsfw"
                    />
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography variant="h2">{specificPost?.title}</Typography>
                  <Typography>{specificPost?.body}</Typography>

                  <FormControlLabel
                    control={
                      <Checkbox checked={specificPost?.nsfw} name="nsfw" />
                    }
                    label="nsfw"
                  />
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
