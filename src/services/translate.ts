import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types.d";

export async function translateText({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage; // Asumiendo que FromLanguage es un tipo o puedes cambiarlo por string si es necesario
  toLanguage: Language; // Igualmente para Language
  text: string;
}): Promise<string> {
  if (fromLanguage === toLanguage) return text;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLanguage}&tl=${toLanguage}&dt=t&q=${encodeURI(
    text
  )}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const resultText = json[0].map((item: any[]) => item[0]).join("");
    return resultText;
  } catch (error) {
    console.error(error);
    throw new Error("Error translating text"); // Esto permite que el .catch en el llamado maneje el error.
  }
}
