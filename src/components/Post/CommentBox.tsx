import { FunctionComponent, useState } from "react";

// import { match } from "react-router-dom";
// import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";

import { Fragment } from "react";

import useStyles from "../../styles/customStyles";

import { TextField, Typography, Button } from "@material-ui/core";

// interface CommentBoxProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   match: matchOverwrite;
// }

// interface matchOverwrite extends match {
//   params: { [key: string]: string };
//   // i need to tell typescript that params will
//   //indeed be of property (type strings) of strings
// }

const CommentBox: FunctionComponent = () => {
  const classes = useStyles();

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
            <Button>Comment</Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommentBox;
