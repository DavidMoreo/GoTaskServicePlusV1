using CloudinaryDotNet;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Structure;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Product.CRUD.Product
{
    public class ProductUtil : IProductUtil
    {
        private INotification _INotification;
        public ProductUtil(INotification _INotification)
        {
            this._INotification = _INotification;
        }

        public static Task<Response<tblProduct>> ValidationSaveProduct(tblProduct product)
        {
            var response = new Response<tblProduct>();
            response.Status = true;
            DateTime date;

            if (product == null)
            {
                response.Status = false;
                response.ErrorPublic = $"Operación no válida él {nameof(product)} no debe ser nulo";

            }
            else
            {



                if (product.ConceptCompany == null)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.ConceptCompany)} no debe ser nulo";

                }

                if (product.ConceptProject == null)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.ConceptProject)} no debe ser nulo";

                }

                if (product.IdTypeOfProduct == null)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.IdTypeOfProduct)} no debe ser nulo";

                }

                if (product.Name == string.Empty)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.Name)} no debe ser nulo";

                }


                if (product.ActualPrice <= 0)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.ActualPrice)} debe ser mayor a 0";


                }

                if (product.ImgList == null || product.ImgList.Count <= 0)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.ImgList)} debe ser mayor a 0";

                }

                //if (product.TypeOfProduct == null || product.TypeOfProduct.Count > 0)
                //{
                //    response.Status = false;
                //    response.ErrorPublic = $" Operación no válida él {nameof(product.TypeOfProduct)} no debe ser null";

                //}

            

                if (product.DeliveryMode == null)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(product.DeliveryMode)} no debe ser null";

                }


                //if (product.TypeCurrency == null)
                //{

                //    product.TypeCurrency = new GoTaskServiceplus.Client.Model.Comon.tblConcepValue()
                //    {
                        
                //    }
                //    response.Status = false;
                //    response.ErrorPublic = $" Operación no válida él {nameof(product.TypeCurrency)} no debe ser null";

                //}


                if (product.Id == Guid.Empty)
                {
                    product.Id = Guid.NewGuid();
                }

                if (product.ReferNumber == null || product.ReferNumber == string.Empty)
                {
                    product.ReferNumber = product.Name;
                }

                if (product.CreationDate != string.Empty)
                {
                    product.CreationDate = ConfigData.DateConfig.GetDateString();
                }

                if (!DateTime.TryParse(product.CreationDate, out date))
                {
                    product.CreationDate = ConfigData.DateConfig.GetDateString();
                }

                if (product.EditDate != string.Empty)
                {
                    product.EditDate = ConfigData.DateConfig.GetDateString();
                }

                if (!DateTime.TryParse(product.EditDate, out date))
                {
                    product.EditDate = ConfigData.DateConfig.GetDateString();
                }

                if (product.Code == string.Empty)
                {
                    product.Code = product.Name;
                }


            }

            response.Data = product;

            return Task.FromResult(response);
        }

        public static async Task<bool> MoveFiles(string names, string baseAdress)
        {
            bool status = false;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseAdress);
            var contenido = new StringContent(JsonConvert.SerializeObject(names), System.Text.Encoding.Default, "application/json");
            var result = await client.PostAsJsonAsync("/MovedFile", names.Split(","));
            var data = await result.Content.ReadAsStringAsync();
            return data == "ok";
        }

        public async Task SendNotificationBuyCancel(string text)
        {

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = "🚀 BUSQUEDA REALIZADA";
            notify.Aditional.Add(aditional);
            notify.Msg = $"{text}";
            notify.PhoneNumber = Config.WhatsAppGoTaskService;
            await _INotification.SaveNotification(notify);

        }

        public async Task ProductCreate(string text)
        {

            var notify = new NotificationModel();
            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = $"🚀 Producto Creado pendiente de validación  por empresa : {text}";
            notify.Aditional.Add(aditional);
           
            notify.PhoneNumber = Config.WhatsAppGoTaskService;
            await _INotification.SaveNotification(notify);

        }

        public Task<List<tblProduct>> OrderProduct(List<tblProduct> products)
        {
            var productsTemp = (from p in products where p.IdTypeOfProduct != null select p).ToList();

            var productOrder = new List<tblProduct>();

            foreach (var item in productsTemp.GroupBy(g => g.IdTypeOfProduct))
            {
                var orderList = productsTemp.Where(g => g.IdTypeOfProduct == item.Key).OrderBy(s=>s.ActualPrice).ToList();
                if(orderList != null)
                {
                    productOrder.AddRange(orderList);
                }

            };

            return Task.FromResult(productOrder);

        }
    }
}
