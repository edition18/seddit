import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { FunctionComponent } from "react";
import useStyles from "../../styles/customStyles";

import { match } from "react-router";
import { useThunkDispatch } from "../../definitions";
import { deletePost } from "../../actions/posts";

interface DeletePostPopupProps {
  toggleDeletePostPopup: () => void;
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const DeletePostPopup: FunctionComponent<DeletePostPopupProps> = ({
  toggleDeletePostPopup,
  match,
}) => {
  const thunkDispatch = useThunkDispatch();
  const handleClose = () => {
    toggleDeletePostPopup();
  };

  const handleDelete = () => {
    thunkDispatch(deletePost(match.params.community, match.params.docId));
  };
  const classes = useStyles();
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} className={`${classes.warningButton}`}>
          Delete
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostPopup;
