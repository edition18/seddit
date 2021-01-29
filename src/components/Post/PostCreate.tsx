import { TextField, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { IPost, RootState } from "../../definitions";
import useStyles from "../../styles/customStyles";

const PostCreate: FunctionComponent = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const [postData, setPostData] = useState<IPost>({
    title: "",
    body: "",
    nsfw: false,
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <Grid container>
      <Grid item xs={9}>
        {authState.isAuthenticated ? (
          <Grid container className={classes.container}>
            <Grid
              item
              xs={12}
              className={classes.alignLeftChildElementsAsBlock}
            >
              <Typography variant="h5">Title of post</Typography>
              <TextField
                fullWidth
                name="Title"
                onChange={onChange}
                className={classes.textFields}
                id="title"
                label="Title"
                variant="outlined"
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h3" align="center">
            You are not authenticated!
          </Typography>
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default PostCreate;
