import React, { Fragment, FunctionComponent } from "react";

import { useSelector } from "react-redux";

import "fontsource-roboto";

import { RootState } from "../../definitions";
import { match } from "react-router";

import CommunitySidebar from "./CommunitySidebar";

import Advertisement from "./Advertisement";
interface MasterSidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: matchOverwrite;
}

interface matchOverwrite extends match {
  params: { [key: string]: string };
  // i need to tell typescript that params will
  //indeed be of property (type strings) of strings
}

const MasterSidebar: FunctionComponent<MasterSidebarProps> = ({ match }) => {
  const authState = useSelector((state: RootState) => state.auth);
  // authState.subscribed?.filter((community) => community === )
  return (
    <Fragment>
      {authState.isAuthenticated && match.path === "/community/:community" ? (
        <CommunitySidebar
          createPostLink={
            "/community/" + match.params.community + "/createpost"
          }
          match={match}
        />
      ) : (
        ""
      )}
      <Advertisement />
    </Fragment>
  );
};

export default MasterSidebar;
