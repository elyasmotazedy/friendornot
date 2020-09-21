import {
  FIND_MATCH,
  CANCEL_MATCH,
  PARTNER_FINDED,
  PARTNER_DISCONNECTED,
  AVAILABLE_CHAT,
  TIMES_UP
} from "../actions/types";


const initialState = {
  matchedUser: null,
  loading: true,
  error: {},
  partnerFinded: false,
  partner: null,
  availableChat: null,
  canceled: false,
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
        matchedUser: null
      };
    case TIMES_UP:
      return {
        ...state,
        // profiles: payload,
        loading: false,
        canceled: false,
        matchedUser: null,
        partnerFinded:false,
        partner:null
      };
    case PARTNER_FINDED:
      return {
        ...state,
        partnerFinded: payload.hasPartner,
        partner: payload.partner
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
