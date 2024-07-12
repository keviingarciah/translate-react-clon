import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ArrowIcon, ClipBoardIcon, SpeakerIcon } from "./components/Icons";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./constants";
import { useStore } from "./hooks/useStore";

import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";

import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translateText } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

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

  const debounceFromText = useDebounce(fromText, 500);

  useEffect(() => {
    if (debounceFromText === "") {
      return;
    }

    translateText({ fromLanguage, toLanguage, text: debounceFromText })
      .then((result) => {
        if (result == null) return;
        setResultText(result);
      })
      .catch(() => setResultText("Error translating text"));
  }, [debounceFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(resultText).catch((error) => {
      console.error("Error al copiar al portapapeles:", error);
    });
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(resultText);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

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
            <div style={{ position: "relative" }}>
              <TextArea
                type={SectionType.TO}
                value={resultText}
                onChange={setResultText}
                loading={loading}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <ClipBoardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
