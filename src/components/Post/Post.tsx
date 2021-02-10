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
import { Link } from "react-router-dom";
import { match } from "react-router";

type PostProps = {
  post: IPostWithDocId;
  match: matchOverwrite;
};

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const Post: FunctionComponent<PostProps> = ({
  post: { datetime, thumbnail, title, body, docId },
  match,
  // you dont need to destructure stuff you dont need
}) => {
  // store posts by collections of communities
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {console.log(match)}
      <Grid item xs={1} className={classes.centerChildElementsVertically}>
        {/* arrows container */}
        <IconButton color="inherit">
          <ArrowUpward />
        </IconButton>
        <IconButton color="inherit">
          <ArrowDownward />
        </IconButton>
      </Grid>
      <Grid item xs={2} className={classes.postPreviewSize}>
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
      <Grid item xs={9} className={classes.relative}>
        {/* actual content container */}

        <Typography
          className={`${classes.hyperlinkFormat} ${classes.textFields}`}
          variant="h3"
          component={Link}
          to={match.url + "/" + docId}
        >
          {title}
        </Typography>
        <Typography>{body.substr(0, 50) + "...."}</Typography>
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
