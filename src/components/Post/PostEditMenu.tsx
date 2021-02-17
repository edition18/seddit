import { Button, Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import useStyles from "../../styles/customStyles";

interface PostEditMenuProps {
  toggleEditView: () => void;
}

const PostEditMenu: FunctionComponent<PostEditMenuProps> = ({
  toggleEditView,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      className={`${classes.defaultPadding} ${classes.childPositionRight} `}
    >
      <Button onClick={toggleEditView}>Edit</Button>

      <Button className={`${classes.warningButton}`}>Delete</Button>

      <Typography></Typography>
    </Grid>
  );
};

export default PostEditMenu;
