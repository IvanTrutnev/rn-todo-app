import { CHANGE_SCREEN } from "../types";

const handlers = {
  [CHANGE_SCREEN]: (state, payload) => payload,
  DEFAULT: state => stare
};
export const screenReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
