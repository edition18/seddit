import { Button, Grid, Typography } from "@material-ui/core";
import React, { Fragment, FunctionComponent, useState } from "react";
import useStyles from "../../styles/customStyles";
import DeletePostPopup from "./DeletePostPopup";

interface PostEditMenuProps {
  toggleEditView: () => void;
}

const PostEditMenu: FunctionComponent<PostEditMenuProps> = ({
  toggleEditView,
}) => {
  const [deletePopup, showDeletePopup] = useState(false);
  const classes = useStyles();
  const toggleDeletePostPopup = () => {
    deletePopup ? showDeletePopup(false) : showDeletePopup(true);
  };
  return (
    <Fragment>
      <Grid
        item
        xs={12}
        className={`${classes.defaultPadding} ${classes.childPositionRight} `}
      >
        <Button onClick={toggleEditView}>Edit</Button>
        <Button
          onClick={() => showDeletePopup(true)}
          className={`${classes.warningButton}`}
        >
          Delete
        </Button>

        <Typography></Typography>
      </Grid>
      {deletePopup ? (
        <DeletePostPopup toggleDeletePostPopup={toggleDeletePostPopup} />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PostEditMenu;
