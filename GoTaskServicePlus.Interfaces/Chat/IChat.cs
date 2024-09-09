using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Product
{
    public interface IChat : ISqlModel<tblChatBotMsg>
    {

      
        public Task<Response<List<tblChatBotMsg>>> GetAllChatIaConfigByType(ConceptFilter config);
        public Task<Response<List<ChatBot>>> GetChatGoTask(ConceptFilter config);
       
        public Task<Response<List<tblChatBotMsg>>> GetChatByUser(ConceptFilter config, Guid id, DateTime dateStart, DateTime dateEnd, int page);
        public Task<Response<List<tblChatBotMsg>>> GetFilterMsg(ConceptFilter config, string filter, DateTime dateStart, DateTime dateEnd, int page);
        public Task<Response<List<tblChatBotMsg>>> DisableChat(ConceptFilter config,bool enable,Guid id);
        public void ClearListBdTemp(string name);
    

    }
}
