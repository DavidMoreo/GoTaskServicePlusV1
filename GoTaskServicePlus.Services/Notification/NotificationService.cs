using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Notification
{
    public class NotificationService : INotification
    {
        public NotificationService()
        {
            InitialLoad();
        }

        public List<NotificationModel> ListTempNotification { get; set; }

        public Task<Response<List<NotificationModel>>> GetNotification()
        {
            var response = new Response<List<NotificationModel>>();   
            if(ListTempNotification!=null) response.Data =  ListTempNotification;

            return  Task.FromResult(response);
        }

        public Task<Response<bool>> SaveNotification(NotificationModel msg)
        {
            var response = new Response<bool>();
            var util = new UtilNotification(msg);
            msg.Count = (ListTempNotification.Count() + 1);
            msg.Status = false;
            if (ListTempNotification.FirstOrDefault(s=>s.Id == msg.Id)==null)
                ListTempNotification.Add(util.Notification);

            return Task.FromResult(response);
        }

        public Task<Response<bool>> SaveNotification(List<NotificationModel> listMsg)
        {
            var response = new Response<bool>();
            foreach (var msg in listMsg)
            {
                var util = new UtilNotification();

                if (msg.Id == Config.GuidEmpty)
                    ListTempNotification.Add(util.Notification);
            }

            return Task.FromResult(response);
        }

        public Task<Response<bool>> StatusNotification(List<NotificationModel> listMsg)
        {
            var response = new Response<bool>();
            foreach (var msg in ListTempNotification)
            {
                try
                {
                    if (listMsg.FirstOrDefault(s => s.Id == msg.Id) != null)
                    {
                        msg.Status = true;
                    }
                }
                catch (Exception ex)
                {                    
                    response.Log.Msg += $"{msg.Id} no pudo ser desactivada, Erro: {ex.Message}  ";
                    response.Msg.Add(new MsgResponse() {Msg ="Algunas notificaciones no fueron enviadas." });
                    throw;
                }
            }

            return Task.FromResult(response);
        }


        private void InitialLoad()
        {
            if (ListTempNotification == null)
                ListTempNotification = new List<NotificationModel>();
        }
    }
}
