import Form from "react-bootstrap/Form";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { type FC, type ChangeEvent } from "react";
import { FromLanguage, Language, SectionType } from "../types.d";

type Props =
  | {
      type: SectionType.FROM;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.TO;
      value: Language;
      onChange: (language: Language) => void;
    };

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.FROM && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
