using GoTaskServicePlus.Interfaces.Chat;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Model.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Chat.Util
{
    public class ChatUtil : IChatUtil
    {

        private INotification _INotification;
        public ChatUtil(INotification _INotification)
        {
            this._INotification = _INotification;
        }

        public async Task SendNotification(string text)
        {
            var notify = new NotificationModel();
            var aditional = new AditionalText();
            notify.PhoneNumber = Config.WhatsAppGoTaskService;
            aditional.Name = "Asunto";
            aditional.Value = "BUSQUEDA POR IA ";
            notify.Aditional.Add(aditional);
            notify.Msg = $"{text}";
            await _INotification.SaveNotification(notify);
            
        }
    }
}
