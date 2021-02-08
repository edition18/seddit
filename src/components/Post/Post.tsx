import React, { FunctionComponent } from "react";
import { IPostWithDocId } from "../../definitions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DateTime } from "luxon";
import useStyles from "../../styles/customStyles";
import noimageavailable from "../../assets/noimageavailable.png";
import imgnotfound from "../../assets/imgnotfound.jpg";
import { IconButton } from "@material-ui/core";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

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
    <Grid container className={classes.container}>
      <Grid item xs={1} className={classes.centerChildElementsVertically}>
        {/* arrows container */}
        <IconButton color="inherit">
          <ArrowUpward />
        </IconButton>
        <IconButton color="inherit">
          <ArrowDownward />
        </IconButton>
      </Grid>
      <Grid item xs={3} className={classes.postPreviewSize}>
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
      <Grid item xs={8} className={classes.relative}>
        {/* actual content container */}

        <Typography>{title}</Typography>
        <Typography>{body}</Typography>
        <Typography className={classes.bottomRight}>
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
