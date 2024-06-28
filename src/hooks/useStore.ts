import { useReducer } from "react";
import { type Action, type State } from "../types";

const initialState = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  resultText: "",
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return { ...state, fromLanguage: action.payload };
  }

  if (type === "SET_TO_LANGUAGE") {
    return { ...state, toLanguage: action.payload };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      resultText: "",
    };
  }

  if (type === "SET_RESULT_TEXT") {
    return { ...state, loading: true, resultText: action.payload };
  }

  return state;
}

export function useStore() {
  const [
    { toLanguage, fromLanguage, fromText, resultText, loading },
    dispatch,
  ] = useReducer(reducer, initialState);

  const interChangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: string) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: string) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResultText = (payload: string) => {
    dispatch({ type: "SET_RESULT_TEXT", payload });
  };

  return {
    toLanguage,
    fromLanguage,
    fromText,
    resultText,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResultText,
  };
}
