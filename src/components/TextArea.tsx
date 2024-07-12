import Form from "react-bootstrap/Form";
import { type FC } from "react";
import { SectionType } from "../types.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = {
  height: "200px",
  border: 0,
  resize: "none",
};

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.FROM) return "Enter text to translate";
  if (loading === true) return "Translating...";
  return "Translation will appear here";
};

export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
  const styles =
    type === SectionType.FROM
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      autoFocus={type === SectionType.FROM}
      disabled={type === SectionType.TO || loading}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
