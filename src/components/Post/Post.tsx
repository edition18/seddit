import React, { FunctionComponent } from "react";
import { IPostWithDocId } from "../../definitions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DateTime } from "luxon";
import useStyles from "../../styles/customStyles";
import noimageavailable from "../../assets/noimageavailable.png";
import imgnotfound from "../../assets/imgnotfound.jpg";

type PostProps = {
  post: IPostWithDocId;
};

const Post: FunctionComponent<PostProps> = ({
  post: { datetime, thumbnail, title, body, docId },
  // you dont need to destructure stuff you dont need
}) => {
  // store posts by collections of communities
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        {/* image container */}
        {thumbnail ? (
          <img
            id={"img" + docId}
            className={classes.autofitImage}
            src={thumbnail}
            onError={() => {
              const imageContainer = document.getElementById(
                "img" + docId
              ) as HTMLImageElement;

              imageContainer.src = imgnotfound;
            }}
          ></img>
        ) : (
          <img className={classes.autofitImage} src={noimageavailable}></img>
        )}
      </Grid>
      <Grid item xs={9}>
        {/* actual content container */}

        <Typography>{title}</Typography>
        <Typography>{body}</Typography>
        <Typography>
          {datetime !== undefined
            ? DateTime.fromMillis(datetime).toLocaleString(
                DateTime.DATETIME_FULL
              )
            : "DATE_ERROR"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Post;

// <Fragment>
// <Grid
//   container
//   direction="column"
//   justify="space-evenly"
//   alignItems="stretch"
// >
//   <Typography>{datetime}</Typography>
//   <Typography>{thumbnail && thumbnail}</Typography>
//   <Typography>{title}</Typography>
//   <Typography>{body}</Typography>
// </Grid>
// </Fragment>
