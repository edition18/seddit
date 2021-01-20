import { IAppState, IAppPayload } from "../definitions";

const initialState: IAppState = {
  loading: true,
};

export default function (
  state = initialState,
  action: { type: string; payload: IAppPayload }
): typeof state {
  // return type of state
  switch (action.type) {
    default:
      return state;
  }
}
