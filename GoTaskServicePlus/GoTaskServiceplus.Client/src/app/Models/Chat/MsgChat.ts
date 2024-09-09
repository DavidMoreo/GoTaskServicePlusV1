import { Concept, NameConcept } from "../Structure/tblProduct";
import { conceptChat } from "./ChatModel";


export class MsgChat extends Concept {
  destinationId: string = "00000000-0000-0000-0000-000000000000";
  OriginId: string = "00000000-0000-0000-0000-000000000000";
  idMsgRefer: string = "00000000-0000-0000-0000-000000000000";
  idChat: string = "00000000-0000-0000-0000-000000000000";
  referenceMsg: conceptChat = new conceptChat();
  Link: Array<string> = new Array<string>;
  firsImg: string;
  msg: string = "";
  value: string = "";
  isBot: boolean = false;
  isProduct: boolean = false;
  ico: string = "";
  price: string | null = "";
}

export class ChatBot extends Concept {
  isProduct: boolean;
  url: string | null;
  status: boolean;
  concept: string | null;
  value: any;
  type: string | null;
  price: Number | null;
  priceString: string | null;
}


export class ChatBotContext {
  question: string;
  intent: string;
  intentScore: number;
}
