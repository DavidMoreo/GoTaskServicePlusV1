using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Chat
{
    public class StorageTemp : IStorageTemp
    {


        private readonly ISqlSearch<tblProduct> _search;
        private IDataAnalysisService _Analysis;
        public List<ChatBot> ListPoductChatBotTemp { get; set; }
        public List<ChatBot> ListMsgChatBotTemp { get; set; }
        public List<tblProduct> ListPoductAllTemp { get; set; }
        private bool inUse = false;
       

        public StorageTemp(ISqlSearch<tblProduct> _search, IDataAnalysisService _Analysis)
        {


            this._search = _search;
            this._Analysis = _Analysis;
        }


        public async Task LoadCacheProductAsync()
        {
            if (!inUse)
            {
                inUse = true;
           

            if (ListPoductChatBotTemp == null || ListPoductChatBotTemp.Count <= 0)
            {
                var listProduct = await this._search.GetListIAData();
                if (listProduct != null && listProduct.Data != null)
                {

                    ListPoductChatBotTemp = new List<ChatBot>();

                    foreach (var i in listProduct.Data)
                    {

                        try
                        {


                        //if (i.FilterISearch == null || i.FilterISearch.Count <= 0)
                        //{
                        //    i.FilterISearch = new List<string> { i.Name };
                        //}


                        if (i.FilterISearch != null)
                        {

                                    //var data = (from p in i.FilterISearch
                                    //            where p !=null
                                    //            select new ChatBot
                                    //            {
                                    //                Id = i.Id,
                                    //                IdProject = i.IdProject,    
                                    //                Name = p.ToLower(),
                                    //                Code = i.Name,
                                    //                Value = i.IdTypeOfProduct != null && i.IdTypeOfProduct.Value != null ? i.IdTypeOfProduct.Value.ToString().Replace(" ", "-").Replace(" ", "") + "/" + i.Name.Replace(" ", "-").Replace(" ", "") + "/" + i.Id : "",
                                    //                IsProduct = true,
                                    //                TypeProduct = i.IdTypeOfProduct != null && i.IdTypeOfProduct.Value != null? i.IdTypeOfProduct.Value:"",
                                    //                TypeProductId = i.IdTypeOfProduct != null && i.IdTypeOfProduct.Id != null ? i.IdTypeOfProduct.Id.Value : Config.GuidEmpty,
                                    //                Url = i.FirsImg != null ? $"{i.IdCompany.ToString().Replace("-", "")}/{i.FirsImg.url}" : "https://gotaskservice.com//Img/public_1.png",
                                    //                Price = i.ActualPrice != null ? i.ActualPrice.Value : 0,
                                    //                PriceString = i.PriceString != null ? i.PriceString : "",
                                    //                isPublic = i.IsPublic != null ? i.IsPublic.Value : false,
                                    //                Type = "product",
                                    //                Disable = i.Disable

                                    //            }).ToList();


                                    //var data =  new ChatBot
                                    //            {
                                    //                Id = i.Id,
                                    //                IdProject = i.IdProject,
                                    //                Name = i.Name.ToLower(),
                                    //                Code = i.Name,
                                    //                Value = i.IdTypeOfProduct != null ? i.IdTypeOfProduct.ToString().Replace(" ", "-").Replace(" ", "") + "/" + i.Name.Replace(" ", "-").Replace(" ", "") + "/" + i.Id : "",
                                    //                IsProduct = true,
                                    //                TypeProduct = i.IdTypeOfProduct.ToString(),
                                    //                TypeProductId =  i.IdTypeOfProduct ,
                                    //                Url = i.FirsImg != null ? $"{i.IdCompany.ToString().Replace("-", "")}/{i.FirsImg.url}" : "https://gotaskservice.com//Img/public_1.png",
                                    //                Price = i.ActualPrice != null ? i.ActualPrice.Value : 0,
                                    //                PriceString = i.PriceString != null ? i.PriceString : "",
                                    //                isPublic = i.IsPublic != null ? i.IsPublic.Value : false,
                                    //                Type = "product",
                                    //                Disable = i.Disable

                                    //            };


                                    //ListPoductChatBotTemp.Add(data);

                            }


                        }
                        catch (Exception ex)
                        {
                            _Analysis.Save($"Error al cargar cache :{i.Name},{i.Id}{ex.Message} ","");
                            throw;
                        }

                    }

                        ListPoductChatBotTemp = await OrderProduct(ListPoductChatBotTemp);


                }

            }


                inUse = false;

            }
        }




        private Task<List<ChatBot>> OrderProduct(List<ChatBot> products)
        {
            //var productsTemp = (from p in products where p.TypeProduct != null select p).ToList();

            //var productOrder = new List<ChatBot>();

            //foreach (var item in productsTemp.GroupBy(g => g.TypeProduct))
            //{
            //    var orderList = productsTemp.Where(g => g.TypeProduct == item.Key).ToList();
            //    if (orderList != null)
            //    {
            //        productOrder.AddRange(orderList);
            //    }

            //};

            return Task.FromResult(products);

        }

    }
}
