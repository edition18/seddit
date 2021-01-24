import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../definitions";

const PostCreate: FunctionComponent = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {authState.isAuthenticated ? (
        <div>You are authenticated!</div>
      ) : (
        <div>You are not authenticated!</div>
      )}
    </div>
  );
};

export default PostCreate;
