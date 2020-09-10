import {
  FIND_MATCH,
  CANCEL_MATCH,
  PARTNER_FINDED,
  PARTNER_DISCONNECTED,
  AVAILABLE_CHAT,
} from "../actions/types";

const initialState = {
  matchedUser: null,
  loading: true,
  error: {},
  partnerFinded: false,
  availableChat: null,
  canceled: null,
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
        // profiles: payload,
        loading: false,
        canceled: payload,
      };
    case PARTNER_FINDED:
      return {
        ...state,
        partnerFinded: payload,
      };
    case PARTNER_DISCONNECTED:
      return {
        ...state,
        matchedUser: null,
        loading: true,
        error: {},
        partnerFinded: false,
      };
    case AVAILABLE_CHAT:
      return {
        ...state,
        availableChat: payload,
      };

    default:
      return state;
  }
}
