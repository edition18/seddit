import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { FunctionComponent } from "react";

interface DeletePostPopupProps {
  toggleDeletePostPopup: () => void;
}

const DeletePostPopup: FunctionComponent<DeletePostPopupProps> = ({
  toggleDeletePostPopup,
}) => {
  const handleClose = () => {
    toggleDeletePostPopup();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Signup"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostPopup;
