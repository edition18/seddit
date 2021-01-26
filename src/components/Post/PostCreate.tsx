import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../definitions";

const PostCreate: FunctionComponent = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Grid>
      {authState.isAuthenticated ? (
        <Typography variant="h3" align="center">
          You are authenticated!
        </Typography>
      ) : (
        <Typography variant="h3" align="center">
          You are not authenticated!
        </Typography>
      )}
    </Grid>
  );
};

export default PostCreate;
