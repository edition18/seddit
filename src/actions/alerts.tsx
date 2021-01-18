import { SET_ALERT, REMOVE_ALERT } from "./types";
import { IAlertPayload } from "../typeDefinitions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { v4 as uuidv4 } from "uuid";

export {};

export const alertError = (
  message: string,
  severity: "error" | "success" | "info" | "warning" | undefined,
  timeout = 5000
) => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, unknown, AnyAction>
): Promise<void> => {
  const id = uuidv4();
  const payload: IAlertPayload = {
    message: message,
    id: id,
    severity: severity,
  };

  dispatch({ type: SET_ALERT, payload: payload });
  setTimeout(
    () => dispatch({ type: REMOVE_ALERT, payload: { id: id } }),
    timeout
  );
};
