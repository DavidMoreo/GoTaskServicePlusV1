using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Notification
{
    public interface INotification
    {
       List<NotificationModel> ListTempNotification { get; set; }

        public Task<Response<bool>> SaveNotification(NotificationModel msg);
        public Task<Response<bool>> SaveNotification(List<NotificationModel> msgs);
        public Task<Response<List<NotificationModel>>> GetNotification();
        public Task<Response<bool>> StatusNotification(List<NotificationModel> listMsg); // Para notificar que fueron enviadas al cliente y cambiar estado true

    }
}
