using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.SubApp
{
    using System.Collections.Generic;

    public class SpeechLanguageModel
    {
        public Guid Id { get; set; }
        public string LanguageFrom { get; set; }
        public string LanguageFor { get; set; }
 
        public string Topic { get; set; } // El tema  como se clasifica la oracion si es saludo, pregunta etc
        public string CurrentLevel { get; set; } // el nivel que esta el usuario
        public List<LanguageSpeech> ListLanguageText { get; set; } // lenguaje español o inicial

      
    }

    public class LanguageSpeech
    {
        public Guid Id { get; set; }
        public string TypeOfSentence { get; set; } // Si es pregunta, afirmacion etxc
        public string LanguageModeFrom { get; set; }
        public string LanguageModeFor { get; set; }
        public string LanguageFrom { get; set; }
        public string LanguageFor { get; set; }

     
    }

}
