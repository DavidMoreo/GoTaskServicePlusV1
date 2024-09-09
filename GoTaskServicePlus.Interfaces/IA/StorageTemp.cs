using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.IA
{
   public interface IStorageTemp
    {
        public List<tblProduct> ListPoductAllTemp { get; set; }
        public List<ChatBot> ListPoductChatBotTemp { get; set; }
        public List<ChatBot> ListMsgChatBotTemp { get; set; }
        public  Task LoadCacheProductAsync();
    }
}
