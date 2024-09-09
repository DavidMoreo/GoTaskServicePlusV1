


using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;

namespace GoTaskServicePlus.Interfaces.IA
{
    public interface IChatMsgBotIA
    {
        public Task<Response<List<ChatBot>>> BotQuestion(CancellationToken cancel, ChatBotContext chat);
    }
}
