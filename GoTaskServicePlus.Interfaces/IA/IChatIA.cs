using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.IA
{
    public interface IChatIA
    {


        public Task<Response<List<ChatBot>>> GetChatProdct(string question );

        public Task<Response<List<ChatBot>>> BotQuestion(string questionCustomer, ChatBotContext responses);
    }
}
