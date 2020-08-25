import {FIND_MATCH, CANCEL_MATCH} from "../actions/types";

const initialState = {
  matchedUser:null,  
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FIND_MATCH:
      return {
        ...state,
        matchedUser: payload,
        loading: false,
      };
    case CANCEL_MATCH:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    default:
      return state;
  }
}
