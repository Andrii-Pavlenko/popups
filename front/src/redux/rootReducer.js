import { TEXT_ACTIONS } from "./actions";

const initialState = {
  list: [],
  loadingError: false,
  loading: false,

  unautorized: false,

  saving: false,
  savingError: false,

  isOpenPopup: false,
  isOpenInput: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TEXT_ACTIONS.POPULATE:
      return {
        ...state,
        list: action.payload.map((item) => item.text),
      };

    case TEXT_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload,
      };

    case TEXT_ACTIONS.UNAUTORIZED:
      return {
        ...state,
        unautorized: action.payload,
      };

    case TEXT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case TEXT_ACTIONS.SET_SAVING:
      return {
        ...state,
        saving: action.payload,
      };

    case TEXT_ACTIONS.SET_SAVING_ERROR:
      return {
        ...state,
        savingError: action.payload,
      };

    case TEXT_ACTIONS.ADD:
      return {
        ...state,
        list: action.payload ? [...state.list, action.payload] : state.list,
      };

    case TEXT_ACTIONS.SAVE:
      return {
        ...state,
        list: state.list.map((text) =>
          text.id === state.editedId ? action.payload : text
        ),
      };

    case TEXT_ACTIONS.IS_OPEN_POPUP:
      return {
        ...state,
        isOpenPopup: !state.isOpenPopup,
      };

    case TEXT_ACTIONS.IS_OPEN_INPUT:
      return {
        ...state,
        isOpenInput: !state.isOpenInput,
      };

    default:
      return state;
  }
}
