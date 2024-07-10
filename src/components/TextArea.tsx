import Form from "react-bootstrap/Form";
import { type FC } from "react";
import { SectionType } from "../types.d";

interface Props {
  placeholder: string;
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = {
  height: "200px",
  border: 0,
};

export const TextArea: FC<Props> = ({
  placeholder,
  type,
  loading,
  value,
  onChange,
}) => {
  const styles =
    type === SectionType.FROM
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  return (
    <Form.Control
      as="textarea"
      autoFocus={type === SectionType.FROM}
      placeholder={placeholder}
      style={styles}
    />
  );
};
