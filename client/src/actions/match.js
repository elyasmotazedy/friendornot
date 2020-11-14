import axios from "axios";
import {
  FIND_MATCH,
  CANCEL_MATCH,
  MATCH_ERROR,
  PARTNER_FINDED,
  PARTNER_DISCONNECTED,
  AVAILABLE_CHAT,
  TIMES_UP
} from "./types";
import { setAlert } from "./alert";
// Find perfect match

export const findPerfectMatch = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log('formData',formData)
    const res = await axios.post("/api/match", formData, config);
    dispatch({
      type: FIND_MATCH,
      payload: res.data,
    });
  } catch (err) {
    console.log("err", err);
    const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    // }
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get avalable chat

export const getAvailableChat = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/match/getAvailableChat", config);
    dispatch({
      type: AVAILABLE_CHAT,
      payload: res.data,
    });
  } catch (err) {
    console.log("err", err);
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    // }
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const partnerFinder = (hasPartner,partner) => (dispatch) => {
  dispatch({
    type: PARTNER_FINDED,
    payload: {hasPartner,partner},
  });
};
export const partnerDisconnected = () => (dispatch) => {
  dispatch({
    type: PARTNER_DISCONNECTED
  });
};
export const timesUp = () => (dispatch) => {
  dispatch({
    type: TIMES_UP
  });
  dispatch(setAlert('your times up', "error"))
};

// Cancel request to chat

export const cancelMatch = (userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/match/cancel", userId, config);
    dispatch({
      type: CANCEL_MATCH,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "error"))
  } catch (err) {
    const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    // }
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
