
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;


namespace GoTaskServicePlus.Entities.Company
{
    public class UtilNotification : NotificationModel
    {
        public NotificationModel Notification { get; set; }


        public UtilNotification()
        {
            Notification = new NotificationModel();
        }


        public UtilNotification(NotificationModel notification)
        {
            Notification = notification;
            Notification.Id = IdIsEpmty(notification.Id);            
            Notification.Status = true;              
        }



        internal Guid GetId(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid GetId(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid IdIsEpmty(Guid _id)
        {
            if (_id == Config.GuidEmpty)
            {
                this.Id = Config.NewGuid;
            }
            else
            {
                this.Id = _id;
            }
            return this.Id;
        }

        internal Guid IdIsEpmty(Guid? _id)
        {
            if (_id == Config.GuidEmpty || _id == null)
            {
                this.Id = Config.NewGuid;
            }
            else
            {
                this.Id = _id.Value;
            }
            return this.Id;
        }



    }
}
