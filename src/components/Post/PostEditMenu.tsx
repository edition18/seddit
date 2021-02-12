import { Button, Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import useStyles from "../../styles/customStyles";

const PostEditMenu: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      className={`${classes.container} ${classes.floatRight} `}
    >
      <Button>Edit</Button>
      <Button>Delete</Button>

      <Typography></Typography>
    </Grid>
  );
};

export default PostEditMenu;
