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
  parentcid?: string;
}

const Comments: FunctionComponent<CommentsProps> = ({
  comments,
  parentcid,
}) => {
  const classes = useStyles();
  const [parentcid, setParentcid] = useState();

  const getParentCid = () => {};

  return (
    <Fragment>
      <Grid container>
        {comments && comments.length !== 0
          ? comments.map((comment: IComment) => (
              // for each comment in comments
              // I want to "save" the parentcid
              <Fragment key={uuidv4()}>
                <Typography className={classes.test}>{comment.body}</Typography>
                <Comments comments={comment.comments} parentcid={comment.cid} />
              </Fragment>
            ))
          : ""}
      </Grid>
    </Fragment>
  );
};

export default Comments;
