import { Button, Grid, Typography } from "@material-ui/core";
import React, { Fragment, FunctionComponent, useState } from "react";
import useStyles from "../../styles/customStyles";
import DeletePostPopup from "./DeletePostPopup";
import { match } from "react-router";

interface PostEditMenuProps {
  toggleEditView: () => void;
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}
const PostEditMenu: FunctionComponent<PostEditMenuProps> = ({
  toggleEditView,
  match,
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
        <DeletePostPopup
          match={match}
          toggleDeletePostPopup={toggleDeletePostPopup}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PostEditMenu;
