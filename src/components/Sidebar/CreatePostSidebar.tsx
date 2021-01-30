import React, { Fragment, FunctionComponent } from "react";

import "fontsource-roboto";

import { Typography } from "@material-ui/core";
import Advertisement from "./Advertisement";

const CreatePostSidebar: FunctionComponent = () => {
  return (
    <Fragment>
      <Typography>Sidebar</Typography>

      <Advertisement />
    </Fragment>
  );
};

export default CreatePostSidebar;
