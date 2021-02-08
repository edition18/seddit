import React, { Fragment, FunctionComponent } from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";
import useStyles from "../../styles/customStyles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { RootState, useThunkDispatch } from "../../definitions";
import { match } from "react-router";

import { subscribe, unsubscribe } from "../../actions/auth";
interface MasterSidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const MasterSidebar: FunctionComponent<MasterSidebarProps> = ({ match }) => {
  const thunkDispatch = useThunkDispatch();
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  // authState.subscribed?.filter((community) => community === )
  return (
    <Fragment>
      <Typography>MASTER TEST</Typography>

      {authState.isAuthenticated && !authState.subscribed?.includes("memes") ? (
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.centerChildElements}
            onClick={() =>
              thunkDispatch(subscribe(match.params.community, authState.uid))
            }
          >
            <Button fullWidth>Subcribe</Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          fullWidth
          onClick={() =>
            thunkDispatch(unsubscribe(match.params.community, authState.uid))
          }
        >
          <strong>unsubcribe</strong>
        </Button>
      )}

      {authState.isAuthenticated ? (
        <Grid container>
          <Grid item xs={12} className={classes.centerChildElements}>
            <Button fullWidth component={Link} to={"./"}>
              Create a Post
            </Button>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default MasterSidebar;
