using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.IA;
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
    public class BuyCustomerUtil : IBuyCustomerUtil
    {
        private INotification _INotification;
        private readonly IProject _Project;
        private readonly IProducSearch _Search;
        private IBuyCustomer _BuyCustomer;
        private IStorageTemp _CacheTemp;
        private IProject _IProject;
        private IUser _User;
        public BuyCustomerUtil(INotification _INotification, IProject _Project, IProducSearch _search, IBuyCustomer _BuyCustomer, IStorageTemp _CacheTemp, IProject _IProject, IUser _User)
        {
            this._INotification = _INotification;
            this._Project = _Project;
            this._Search = _search;
            this._BuyCustomer = _BuyCustomer;
            this._CacheTemp = _CacheTemp;
            this._IProject = _IProject;
            this._User = _User;
        }

        public async Task SendNotificationInfoPurchase(ConceptFilter concept, tblBuyerCustomer buyList)
        {

            var buyerTemp = buyList;           

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            notify.PhoneNumber = concept.MobilNumber;
            aditional.Name = "Asunto";
            aditional.Value = "🥳 Uno de tus productos tiene un cambio";
            notify.Aditional.Add(aditional);
            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = "Somos Go Task Service";

            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = $"Puedes ver el estado de tu compra aqui: 😁";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = $" {Config.Host}/product-buy 😁";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "facebook";
            aditional.Value = $"Puedes seguirnos en facebook:  😁";
            notify.Aditional.Add(aditional);

            notify.Aditional.Add(aditional);
            aditional = new AditionalText();
            aditional.Name = "facebook";
            aditional.Value = $"https://www.facebook.com/share/QxfUetw7X7iaayQF/?mibextid=qi2Omg";
            notify.Aditional.Add(aditional);

            notify.Msg = $"Gracias por confiar en Go task Service,  {concept.MobilNumber}.";

            await _INotification.SaveNotification(notify);
          

        }

        public async Task SendNotificationCustomerPurchaseAsync(ConceptFilter concept, List<tblBuyerCustomer> buyList)
        {
            var buyerTemp = buyList.FirstOrDefault();
         

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            notify.PhoneNumber = concept.MobilNumber;
            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = "Somos Go Task Service";
            notify.Aditional.Add(aditional);
            aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = "🥳 Sabemos que te interesan algunos productos y nosotros te ayudaremos a encontrarlos.";
            notify.Aditional.Add(aditional);
            
            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = " ✓︎ Te compartimos la ubicación para que puedas pagar y completar tu compra.";
            notify.Aditional.Add(aditional);

            aditional.Name = "De";

           
            foreach (var item in buyList.GroupBy(s=>s.IdProject))
            {                
              var address = await  _IProject.GetAddressProject(item.Key);
                if (address.Data != null && address.Data.Value !="" &&  address.Data.Value.Contains(","))
                {
                    var listCoordinates = address.Data.Value.Split(",");
                    string Lat = listCoordinates[0].Replace("lat:", "").Trim();
                    string lng = listCoordinates[1].Replace("lng:","").Trim();

                    aditional = new AditionalText();
                    aditional.Value = "Productos:";
                    notify.Aditional.Add(aditional);

                    foreach (var product in item)
                    {
                        aditional = new AditionalText();
                        aditional.Value = product.Name;
                        notify.Aditional.Add(aditional);
                    }

                    aditional = new AditionalText();
                    aditional.Value = "Esta es la ubicación en Google Maps de la tienda:";
                    notify.Aditional.Add(aditional);

                    aditional = new AditionalText();
                    aditional.Value = $"https://www.google.com/maps/search/{Lat},{lng}?sa=X&ved=1t:242&ictx=111";                   
                    notify.Aditional.Add(aditional);

                }
            }


            //aditional.Value = "https://www.google.com/maps/search/4.715658,+-74.223547?sa=X&ved=1t:242&ictx=111";

            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = $"También puedes ver el estado de tu compra y ubicación de recogida aquí:  😁";
            notify.Aditional.Add(aditional);
            
            aditional = new AditionalText();
            aditional.Name = "De";
            aditional.Value = $"{Config.Host}/product-buy";
            notify.Aditional.Add(aditional);

            notify.Msg = $"Hola {concept}, muchas gracias por su compra.";


            //if (notify.Link == null) notify.Link = new List<string>();
            //foreach (var item in buyList)
            //{
            //    notify.Link.Add(item.IdBuy.ToString());
            //}


            await _INotification.SaveNotification(notify);
            await NotificacionPurchareAdmin(buyList);
        }

        private async Task NotificacionPurchareAdmin(tblBuyerCustomer purChaseList)
        {

            var buyerTemp = purChaseList;
           

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            notify.PhoneNumber = Config.WhatsAppGoTaskService;
            aditional.Name = "Asunto";
            aditional.Value = "MOVIMIENTO EN COMPRA";
            notify.Aditional.Add(aditional);
            notify.Msg = $"CAMBIO DE ESTADO DE COMPRA  REALIZADO";

            if (notify.Link == null) notify.Link = new List<string>();

            await _INotification.SaveNotification(notify);
           

        }

        private async Task NotificacionPurchareAdmin(List<tblBuyerCustomer> purChaseList)
        {
            var concept = new ConceptFilter();
            var user = purChaseList.FirstOrDefault(); 
            var userId = user !=null ? user.UserId: Config.GuidEmpty; 
            var userTemp = await GetUserAsync(userId);

            if (userId != Config.GuidEmpty)
            {
                var buyerTemp = purChaseList.FirstOrDefault();

                var notify = new NotificationModel();
                var aditional = new AditionalText();
                notify.PhoneNumber = Config.WhatsAppGoTaskService;
                aditional.Name = "Asunto";
                aditional.Value = "NUEVA COMPRA";
                notify.Aditional.Add(aditional);
                notify.Msg = $"Nueva compra realizada por {userTemp.Name} celular : {userTemp.MobileNumber} ";

                if (notify.Link == null) notify.Link = new List<string>();

                await _INotification.SaveNotification(notify);
                await NotificacionPurchareVendor(purChaseList);
            }

        }
        private async Task NotificacionPurchareVendor(List<tblBuyerCustomer> purChaseList)
        {
            var idProyect = Config.GuidEmpty;
            var buyerTemp = purChaseList.FirstOrDefault();
          

            var notify = new NotificationModel();
            var aditional = new AditionalText();

            aditional.Name = "Asunto";
            aditional.Value = "Notificación automática de GoTaskService.com";
            notify.Aditional.Add(aditional);

  



            var list = (from d in purChaseList select d.IdProject).ToList();
            var listNumber = await GetProjectNumber(list);

            var productPurchares = (from d in purChaseList select d.PurchareId).ToList();


            var products = new Response<List<tblProduct>>();

            //if(_CacheTemp.ListMsgChatBotTemp!=null)
            //{
            //    foreach (var item in productPurchares)
            //    {
            //    products.Data.Add()

            //    }
            //}
            products = await _Search.GetListProductById(productPurchares, 0);
            notify.Msg = $"Un cliente interesado en Go Task Service";


            foreach (var number in listNumber.GroupBy(s=>s.number))
            {
                notify.Link = new List<string>();
                notify.PhoneNumber = number.Key;
                //if (_CacheTemp.ListMsgChatBotTemp == null) await _CacheTemp.LoadCacheProductAsync();
                    var product = (from d in products.Data where d.IdProject == number.FirstOrDefault().idProject select d.Name).ToList();

                    if (product != null)
                    {
                        foreach (var item in product)
                        {
                            aditional = new AditionalText();
                            aditional.Name = $"Product";
                            aditional.Value = $"{item}";
                            notify.Aditional.Add(aditional);

                        }
                    }
                }


                _INotification.SaveNotification(notify);
            


        }





        public async Task SendNotificationBuyCancel(string text)
        {

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = " ¡COMPRA CANCELADA!";
            notify.Aditional.Add(aditional);

            notify.Msg = $"{text}";
            notify.PhoneNumber = "3192024524";
            await _INotification.SaveNotification(notify);
            //await NotificacionPurchareCancelAdmin(text);

        }

        private async Task NotificacionPurchareCancelAdmin(string text)
        {
            var notify = new NotificationModel();
            var aditional = new AditionalText();
            notify.PhoneNumber = Config.WhatsAppGoTaskService;
            aditional.Name = "Asunto";
            aditional.Value = "¡COMPRA CANCELADA!";
            notify.Aditional.Add(aditional);
            notify.Msg = $"{text}";
            await _INotification.SaveNotification(notify);

        }



        private async Task<List<(string number, Guid idProject)>> GetProjectNumber(List<Guid> buyList)
        {
            var number = new List<(string number, Guid idProject)>();
            var cofig = new ConceptFilter();
            foreach (var item in buyList)
            {

                var result = await _Project.Get(cofig, item);
                if (result.Data != null)
                {
                    var project = result.Data;
                    if (project.MobileNumber != null && project.MobileNumber != "")
                        number.Add((project.MobileNumber, project.Id));
                }

            }

            return number;
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

            return code;           
        }


        private async Task<tblUser> GetUserAsync(Guid id)
        {
            var concept = new ConceptFilter();
            var userTemp = await _User.Get(concept, id);
            return userTemp.Data;    
        }



    }
}
