export class SpeechLanguageModel {

  Id: string;
  LangaugeFrom: string;
  LangaugeFor: string;

  Topic: string; //El tema  como se clasifica la oracion si es saludo, pregunta etc
  Currentlevel: string; // el nivel que esta el usuario
  ListLanguageText: Array<LanguageSpeech>; // lenguaje español o inicial

 
}


export class LanguageSpeech {

  id: string;
  typeOfSentence: string; // Si es pregunta, afirmacion etxc
  languageModeFrom: string;
  languageModeFor: string;
  languageFrom:string;
  languageFor: string;

 

}
