using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.ExtraDriver
{
    public interface IExtraDriverInterface
    {
        string ClanText(string read);
        string GetUnicode(string texto);
        string ConvertirABase64(string texto);


    }
}
