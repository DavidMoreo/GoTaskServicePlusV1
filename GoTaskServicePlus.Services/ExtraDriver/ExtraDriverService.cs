using GoTaskServicePlus.Interfaces.ExtraDriver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.ExtraDriver
{
    public class ExtraDriverService : IExtraDriverInterface
    {
       
        public string ClanText(string read)
        {
            string text = string.Empty;

            text = read.Replace("  ", "");

            return GetUnicode (text);    
        }

        public string GetUnicode(string texto)
        {
            // Utiliza Regex.Unescape para convertir las secuencias de escape en caracteres reales
            string textoDesescapado = Regex.Unescape(texto);

            // Encuentra y reemplaza cualquier carácter Unicode restante en el texto
            textoDesescapado = Regex.Replace(textoDesescapado, @"([0-9A-Fa-f]{4})", match =>
            {
                // Convierte el código Unicode hexadecimal en un carácter y devuelve el reemplazo
                return ((char)int.Parse(match.Groups[1].Value, System.Globalization.NumberStyles.HexNumber)).ToString();
            });

            return textoDesescapado;
        }


        public string ConvertirABase64(string texto)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(texto);
            return Convert.ToBase64String(bytes);
        }

    }
}
