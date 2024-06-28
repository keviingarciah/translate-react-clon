import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from "./constants";

export type Languages = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Languages | AutoLanguage;

export interface State {
  fromLanguage: string;
  toLanguage: string;
  fromText: string;
  resultText: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: string }
  | { type: "SET_TO_LANGUAGE"; payload: string }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT_TEXT"; payload: string };
