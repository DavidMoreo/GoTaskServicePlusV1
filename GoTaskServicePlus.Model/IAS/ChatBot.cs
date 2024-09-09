using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.IA
{
    public class ChatBot
    {
        public Guid id { get; set; }
        public DateTime DateGenerate { get; set; }
        public string Response { get; set; }
        public string Question { get; set; }
        public string Cache { get; set; }
        public float PredictionWeight { get; set; }
    }

    public class ChatBotContext
    {
        public string question { get; set; }
        public string? intent { get; set; }
        public float? intentScore { get; set; }

    }


    public class IntentName
    {
        public static string Product { get { return "Producto"; } }
        public static string Comment { get { return "Comentario"; } }
    }


}
