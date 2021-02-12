import React, { FunctionComponent, Fragment, useEffect } from "react";

import PostPreview from "./Post/PostPreview";

import { match } from "react-router";

import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../definitions";
import { retrievePostsByCommunity } from "../actions/posts";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "fontsource-roboto";
import useStyles from "../styles/customStyles";
import MasterSidebar from "./Sidebar/MasterSidebar";
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
  return (
    <Fragment>
      {console.log(postsState.posts)}
      <Typography variant="h2" className={classes.centerText}>
        Welcome to {match.params.community}
      </Typography>
      <Grid container>
        <Grid item xs={9}>
          {!postsState.loading ? (
            postsState.posts.map((post) => (
              <PostPreview
                key={uuidv4()}
                post={post}
                match={match}
              ></PostPreview>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={3}>
          <MasterSidebar match={match} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommunityLanding;
