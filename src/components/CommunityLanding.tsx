import React, { FunctionComponent, Fragment, useEffect } from "react";

import Post from "./Post/Post";

import { match } from "react-router";

import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../definitions";
import { retrievePostsByCommunity } from "../actions/posts";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";
import useStyles from "../styles/customStyles";

import { Link } from "react-router-dom";
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
  const classes = useStyles();
  const postsState = useSelector((state: RootState) => state.posts);
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <Fragment>
      <Typography variant="h2" align="center">
        Welcome to {match.params.community}
      </Typography>
      <Grid container>
        <Grid item xs={9}>
          {!postsState.loading ? (
            postsState.posts.map((post) => (
              <Post key={uuidv4()} post={post}></Post>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={3}>
          Sidebar
          {authState.isAuthenticated ? (
            <Grid container>
              <div>test</div>
              <Grid item xs={12} className={classes.centerGridItem}>
                <Button
                  fullWidth
                  component={Link}
                  to={"/community/" + match.params.community + "/createpost"}
                >
                  <strong>Create a Post</strong>
                </Button>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommunityLanding;
