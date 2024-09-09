using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static System.Net.WebRequestMethods;

namespace GoTaskServicePlus.Services.BuyCustomer.Util
{
    public class UtilNotificationRegister : IUtilNotificationRegister
    {
        private INotification _INotification;
        private readonly IProject _Project;
        private readonly IProducSearch _Search;
        private IBuyCustomer _BuyCustomer;
        public UtilNotificationRegister(INotification _INotification, IProject _Project, IProducSearch _search, IBuyCustomer _BuyCustomer)
        {
            this._INotification = _INotification;
            this._Project = _Project;
            this._Search = _search;
            this._BuyCustomer = _BuyCustomer;
        }

    
        public async Task SendNotificationRegister(string number)
        {
           
            var notify = new NotificationModel();
            notify.PhoneNumber = number;

            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = "Somos Go Task Service : https://gotaskservice.com/";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "msg";
            aditional.Value = "Muchas gracias por Registrarte en GotaskService.com";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "code";
            aditional.Value = "Ahora puedes guardar historial de favoritos y compras";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "code";
            aditional.Value = "Te notificaremos si alguno de tus favoritos baja de precio o tiene alguna promoción y mucho más.";
            notify.Aditional.Add(aditional);

            if (notify.Link == null) notify.Link = new List<string>();

            await _INotification.SaveNotification(notify);

        
        }

        public async Task<string> SendNotificationCodeVerificatione(string number)
        {
            var code = Config.NewGuid.ToString().Split("-")[1];

         
            var notify = new NotificationModel();
            notify.PhoneNumber = number;

            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = "Somos Go Task Service : https://gotaskservice.com/";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "msg";
            aditional.Value = "Tu código de verificación";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "code";
            aditional.Value = code.ToUpper();
            notify.Aditional.Add(aditional);

            notify.Msg = $"";

            if (notify.Link == null) notify.Link = new List<string>();

            await _INotification.SaveNotification(notify);
            _=SendNotificationRegisterAdmin();
            return code;
           
        }




        private async Task SendNotificationRegisterAdmin()
        {

            var notify = new NotificationModel();
            notify.PhoneNumber = "3192024524";

            var aditional = new AditionalText();
          

            aditional = new AditionalText();
            aditional.Name = "code";
            aditional.Value = "Nuevo registro";
            notify.Aditional.Add(aditional);

           

            if (notify.Link == null) notify.Link = new List<string>();

            await _INotification.SaveNotification(notify);


        }



    }
}
