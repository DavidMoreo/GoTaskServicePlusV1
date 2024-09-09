import { extend } from "leaflet";
import { Concept } from "../Structure/tblProduct";

export class conceptChat extends Concept {
  question: string = "";
  answer: string = "";
  confirm: boolean = false;
}

export class IntentChat extends conceptChat {
  intent: string = "";
}

export class IAByNameProduct extends conceptChat {
 
}

export class IAAssistant extends conceptChat {
  questionB: string = "";  
}

export class tblChatBotMsg extends Concept {
  destinationId: string = "00000000-0000-0000-0000-000000000000";
  idProduct: string = "00000000-0000-0000-0000-000000000000";
  question: string = "";
  response: string = "";
  isBot: boolean = false;
  isConcept: boolean = false;
  typeQuestion: string = "";
}


export class TypeIntent {
  static intentionOfTheQquestion(): string { return "IntentionOfTheQquestion"; };
  static aIAssistant(): string { return "AiAssistant"; };
  static searchProductsByName(): string { return "SearchProductsByName"; };


}
