import { useReducer } from "react";
import { FromLanguage, Language, type Action, type State } from "../types";
import { AUTO_LANGUAGE } from "../constants";

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
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    const loading = state.fromText !== "";

    return {
      ...state,
      result: "",
      loading,
      fromText: state.resultText,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== "";

    return { ...state, resultText: "", loading, fromLanguage: action.payload };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== "";

    return { ...state, resultText: "", loading, toLanguage: action.payload };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      resultText: "",
      loading,
      fromText: action.payload,
    };
  }

  if (type === "SET_RESULT_TEXT") {
    return { ...state, loading: false, resultText: action.payload };
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

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
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
