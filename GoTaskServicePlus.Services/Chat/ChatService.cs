using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.IA.SearchProduct;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Utility.General;

namespace GoTaskServicePlus.Services.Chat
{
    public class ChatService : IChat
    {
        ISqlModelChat<tblChatBotMsg> _Chat;

        private IStorageTemp _CacheIA;


        public IPredictionProductName _Search;
        private readonly ISqlSearch<tblProduct> _search;
        public ChatService(ISqlModelChat<tblChatBotMsg> chat,  ISqlSearch<tblProduct> _search, IPredictionProductName search, IStorageTemp _CacheIA)
        {
            this._Chat = chat;
          
            this._search = _search;
            this._Search = search;
            this._CacheIA = _CacheIA;
        }

        public async Task<Response<List<tblChatBotMsg>>> GetFilterMsg(ConceptFilter config, string filter, DateTime dateStart, DateTime dateEnd, int page)
        {
            return await _Chat.GetFilterMsg(config, filter, dateStart, dateEnd, page);
        }

        public async Task<Response<List<tblChatBotMsg>>> GetChatByUser(ConceptFilter config, Guid id, DateTime dateStart, DateTime dateEnd, int page)
        {
            return await _Chat.GetChatByUser(config, id, dateStart, dateEnd, page);
        }

        public async Task<Response<tblChatBotMsg>> Save(tblChatBotMsg chat)
        {
           

            return await _Chat.Save(chat);
        }

        public async Task<Response<tblChatBotMsg>> Get(ConceptFilter config, Guid id)
        {

            return await _Chat.Get(config, id);
        }

        public async Task<Response<tblChatBotMsg>> Get(ConceptFilter config, string name)
        {

            return await _Chat.Get(config, name);
        }

        public async Task<Response<tblChatBotMsg>> Delete(ConceptFilter config, Guid id)
        {

            return await _Chat.Delete(config, id);
        }

        public async Task<Response<tblChatBotMsg>> Update(tblChatBotMsg chat)
        {
            return await _Chat.Update(chat);
        }

        public Task<Response<List<tblChatBotMsg>>> DisableChat(ConceptFilter config, bool enable, Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<List<tblChatBotMsg>>> GetAllChatIaConfigByType(ConceptFilter config)
        {           

            return await _Chat.GetAllChatIaConfigByType(config);

           
        }

        public async Task<Response<List<ChatBot>>> GetChatGoTask(ConceptFilter config)
        {
           

            return await _Chat.GetChatGotask(config);

        }

        public void ClearListBdTemp(string nameApi)
        {
            _CacheIA.ListPoductChatBotTemp = null;
     

        }

       
    }
}
