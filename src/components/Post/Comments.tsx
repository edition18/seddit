import { FunctionComponent } from "react";

// import { match } from "react-router-dom";
// import { RootState, useThunkDispatch } from "../../definitions";
import Grid from "@material-ui/core/Grid";

import { Fragment } from "react";

import useStyles from "../../styles/customStyles";

import { Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../../definitions";

interface CommentsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: IComment[] | undefined;
}

const Comments: FunctionComponent<CommentsProps> = ({ comments }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container>
        {comments &&
          comments.map((comment) => {
            <Typography key={uuidv4()} className={classes.test}>
              {comment.body}
            </Typography>;
          })}
      </Grid>
    </Fragment>
  );
};

export default Comments;
