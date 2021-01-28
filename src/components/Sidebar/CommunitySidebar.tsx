import React, { Fragment, FunctionComponent } from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";
import useStyles from "../../styles/customStyles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { RootState } from "../../definitions";
interface CommunitySidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPostLink: string;
}

const CommunitySidebar: FunctionComponent<CommunitySidebarProps> = ({
  createPostLink,
}) => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <Fragment>
      <Typography>Sidebar</Typography>

      {authState.isAuthenticated ? (
        <Grid container>
          <div>test</div>
          <Grid item xs={12} className={classes.centerChildElements}>
            <Button fullWidth component={Link} to={createPostLink}>
              <strong>Create a Post</strong>
            </Button>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default CommunitySidebar;
