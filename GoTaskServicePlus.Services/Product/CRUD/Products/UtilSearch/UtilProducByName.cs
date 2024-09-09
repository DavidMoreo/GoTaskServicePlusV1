using CloudinaryDotNet;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Product.CRUD.Products.UtilSearch
{
    public class UtilProducByName
    {

        public static List<tblProduct>  FilterProductIsPublic(List<tblProduct> produt, bool isPublic)
        {
            var result = (from f in produt
                          where f.IsPublic == true select
                         f).ToList();

            return result;
        }

        public static List<ImgItem> FilterImgEmpy(List<ImgItem> produt)
        {
            var result = (from f in produt
                          where f.url!="" 
                          select
                         f).ToList();

            return result;
        }


        public static List<tblProduct> FilterProducSearch(List<ChatBot> produt, string filter)
        {
            //var result = (from f in produt
            //              where f.Name != null && f.Name.ToLower().Contains(filter.ToLower())
            //              select new tblProduct
            //              {
            //                  Id = f.Id,
            //                  Name = f.Name   ,
            //                  Adress =  f.City 
                              

            //              }).ToList();

            //foreach (var item in result)
            //{
            //    if (item.Adress == null)
            //    {

            //    }

            //}


            return null;
        }

        public static List<tblProduct> FilterProducByCity(List<ChatBot> produt, List<string> filter)
        {
            //var result = (from f in filter 
            //             from p in produt where p.City !=null && p.City.Concept !=null &&  p.City.Concept.Id.ToString() == f
            //              select new tblProduct
            //              {
            //                  Id = p.Id,
            //                  Name = p.Name,
            //                  Adress =  p.City 

            //              }).ToList();

            return null;
        }

        public static List<tblProduct> FilterProducByCity(List<tblProduct> produt, List<string> filter)
        {
            var result = (from f in filter
                          from p in produt.OrderBy(s => s.ActualPrice)
                          where (p.Adress) !=null ? p.Adress.Concept.Id == Guid.Parse(f):false
                          select new tblProduct
                          {
                              Id = p.Id,
                              Name = p.Name

                          }).ToList();

            return result;
        }

        public static List<ChatBot> ConverProducByChactBotConcept(List<tblProduct> produt)
        {
            //var data = (from i in produt                      
            //            select new ChatBot
            //            {
            //                Id = i.Id,
            //                Name = i.Name
            //            }).ToList();



            return null;
        }


        public static List<Guid> FilterPages(List<Guid> produt,int range,int page )
        {
           
            var result = new List<Guid>();
            int index =0, count =0, productCount = produt.Count;

            if(produt==null || produt.Count()<=0) return result;    

            int pages = GetPages(produt, range);

            if (page > pages) page = 1;

            if (page > 0)
            {
                index = (page * range);
            }
            count = range;          
              
            if(index >= productCount) { index = (productCount - range); }

            if (index < 0) index = 0;

            if ((index +count) >= productCount) { count = (productCount - index); }

            if(count > productCount) { count = (productCount - index); }

           
                result = (from f in produt 
                          select
                         f).ToList().GetRange(index, count);

          
            return result;
        }

        public static int GetPages(List<Guid> produt, int range)
        {
            int result = (produt.ToList().Count()/range);

            return result;
        }
    }
}
