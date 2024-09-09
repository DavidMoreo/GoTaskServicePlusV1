using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Chats
{
    public class tblChatBotMsg : Info
    {

        public string QuestionA { get; set; }
        public string QuestionB { get; set; }
        public string? Answer { get; set; }
        public string? Intent { get; set; }
        public string? TypeModelIa { get; set; }
        public bool? ConfirmData { get; set; }

    }





    public class ConceptChat : Info
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public bool Confirm { get; set; }
    }

    public class IntentChat : ConceptChat
    {
        public string Intent { get; set; }

    }

    public class IAByNameProduct : ConceptChat
    {       

    }

    public class IAAssistant : ConceptChat
    {
        public string QuestionB { get; set; }

    }

    public class tblChatTypeModelIa
    {
        public static string Intent { get{ return "IntentionOfTheQquestion"; } }
        public static string AIAssistant { get{ return "AiAssistant"; } }
        public static string SearchProductsByName { get{ return "SearchProductsByName"; } }
    }


}
