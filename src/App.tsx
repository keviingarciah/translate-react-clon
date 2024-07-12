import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ArrowIcon } from "./components/Icons";
import { AUTO_LANGUAGE } from "./constants";
import { useStore } from "./hooks/useStore";

import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";

import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translateText } from "./services/translate";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    resultText,
    loading,
    setFromLanguage,
    setToLanguage,
    interChangeLanguages,
    setFromText,
    setResultText,
  } = useStore();

  useEffect(() => {
    if (fromText === "") {
      return;
    }

    translateText({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) {
          return;
        }
        setResultText(result);
      })
      .catch(() => setResultText("Error translating text"));
  }, []);

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.FROM}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.FROM}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col>
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => {
              interChangeLanguages();
            }}
          >
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.TO}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.TO}
              value={resultText}
              onChange={setResultText}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
