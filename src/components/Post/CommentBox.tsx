import { FunctionComponent, useState } from "react";

// import { match } from "react-router-dom";
// import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";

import { Fragment } from "react";

import useStyles from "../../styles/customStyles";

import { TextField, Typography, Button } from "@material-ui/core";
import { RootState, useThunkDispatch } from "../../definitions";
import { submitPostComment } from "../../actions/posts";
import { useSelector } from "react-redux";

interface CommentBoxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  community: string;
  docId: string;
}

const CommentBox: FunctionComponent<CommentBoxProps> = ({
  community,
  docId,
}) => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    comment: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  //   const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormData({
  //       ...formData,
  //       [e.currentTarget.name]: e.currentTarget.checked,
  //     });
  //   };

  //   const toggleEditView = () => {
  //     if (editView === false) {
  //       setEditView(true);
  //     } else {
  //       // changes made, dispatch changes
  //       thunkDispatch(
  //         updatePost(formData, match.params.docId, match.params.community)
  //       );
  //       setEditView(false);
  //     }
  //   };
  const thunkDispatch = useThunkDispatch();
  const postComment = async () => {
    thunkDispatch(
      submitPostComment(formData.comment, community, docId, authState.uid)
    );
  };

  return (
    <Fragment>
      <Grid container>
        <Grid container className={classes.defaultPadding}>
          <Typography>Comment here</Typography>
          <TextField
            fullWidth
            onChange={onChange}
            variant="outlined"
            multiline={true} //allows for "height" of textfield
            rows={3}
          ></TextField>
          <Grid
            item
            xs={12}
            className={`${classes.defaultPadding} ${classes.childPositionRight} `}
          >
            <Button onClick={postComment}>Comment</Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommentBox;
