import axios from "axios";
import { FIND_MATCH, CANCEL_MATCH ,MATCH_ERROR } from "./types";

// Find perfect match

export const findPerfectMatch = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/match", formData, config);

    dispatch({
      type: FIND_MATCH,
      payload: res.data,
    });
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



// Cancel request to chat

export const cancelMatch = (userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete("/api/match", userId, config);

    dispatch({
      type: CANCEL_MATCH,
      payload: res.data,
    });
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
