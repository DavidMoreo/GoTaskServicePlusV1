using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblChat : Info
    {
        public int IdChatPosition { get; set; }    
        public string Msg { get; set; } 
        public tblUser UserTransmitter { get; set; } 
        public tblUser UserReceiver { get; set; }

        public tblUser GetListPermission(string value)
        {
            try
            {
                return JsonSerializer.Deserialize<tblUser>(value);

            }
            catch (Exception)
            {
                return new tblUser();
                throw;
            }
        }

    

    }
}
