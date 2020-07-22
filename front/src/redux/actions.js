import { ENDPOINTS } from "../consts";

export const TEXT_ACTIONS = {
  POPULATE: "POPULATE",
  SET_LOADING_ERROR: "SET_LOADING_ERROR",
  SET_LOADING: "SET_LOADING",

  UNAUTORIZED: "UNAUTORIZED",

  SET_SAVING: "SET_SAVING",
  SET_SAVING_ERROR: "SET_SAVING_ERROR",

  ADD: "ADD",
  SAVE: "SAVE",

  IS_OPEN_POPUP: "IS_OPEN_POPUP",
  IS_OPEN_INPUT: "IS_OPEN_INPUT",
};

export function populate(texts) {
  return {
    type: TEXT_ACTIONS.POPULATE,
    payload: texts,
  };
}

function setLoadingError(error) {
  return {
    type: TEXT_ACTIONS.SET_LOADING_ERROR,
    payload: error,
  };
}

function setUnautorized(bool) {
  return {
    type: TEXT_ACTIONS.UNAUTORIZED,
    payload: bool,
  };
}

function setLoading(loading) {
  return {
    type: TEXT_ACTIONS.SET_LOADING,
    payload: loading,
  };
}

function setSaving(saving) {
  return {
    type: TEXT_ACTIONS.SET_SAVING,
    payload: saving,
  };
}

function setSavingError(savingError) {
  return {
    type: TEXT_ACTIONS.SET_SAVING_ERROR,
    payload: savingError,
  };
}

function save(text) {
  return {
    type: TEXT_ACTIONS.ADD,
    payload: text.text,
  };
}

export function loadTexts(params) {
  return async (dispatch) => {
    dispatch(setLoadingError(false));
    dispatch(setLoading(true));
    dispatch(setUnautorized(false));
    let success = false;

    try {
      const response = await fetch(ENDPOINTS.TEXTS);
      if (response.status === 200) {
        const texts = await response.json();
        dispatch(populate(texts));
        success = true;
      } else if (response.status === 403) {
        dispatch(setUnautorized(true));
        success = true;
      }
    } finally {
      dispatch(setLoading(false));
      if (!success) {
        dispatch(setLoadingError(true));
      }
    }
  };
}

export function saveText(inputValue) {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));
    dispatch(setSavingError(false));
    dispatch(setUnautorized(false));
    let success = false;

    if (!inputValue) {
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.TEXTS, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ inputValue }),
      });
      if (response.status === 200) {
        const recipes = await response.json();
        dispatch(save(recipes));
        success = true;
      } else if (response.status === 403) {
        dispatch(setUnautorized(true));
        success = true;
      }
    } finally {
      dispatch(setSaving(false));
      if (!success) {
        dispatch(setSavingError(true));
      }
    }
  };
}

export function isOpenPopup() {
  return {
    type: TEXT_ACTIONS.IS_OPEN_POPUP,
  };
}

export function isOpenInput() {
  return {
    type: TEXT_ACTIONS.IS_OPEN_INPUT,
  };
}
