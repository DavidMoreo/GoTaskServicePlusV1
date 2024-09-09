using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.IA.Bots.Concept
{
    public class StopWordsIA
    {
       public static string[] FilterStopWords(string[] tokens)
        {
            var stopwords = new HashSet<string>(new[]
            {
            "el", "la", "los", "las", "de", "en", "y", "a", "que", "es", "con", "por", "como", "para", "un", "una", "al", "se",
            "él", "ella", "ellos", "ellas", "del", "á", "é", "í", "ó", "ú", "áéíóú", "cómo", "cuándo", "dónde", "qué", "qué"
            // Añade más palabras comunes acentuadas si es necesario
        });

            return tokens.Where(token => !stopwords.Contains(token.ToLower())).ToArray();
        }

    }
}
