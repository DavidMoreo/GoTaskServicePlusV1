using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblProduct : Info
    {
        public Guid IdTypeOfProduct { get; set; }
        public Guid AdressId { get; set; }
        public string? ReferNumber { get; set; }
        public NameConcept DeliveryMode { get; set; }
        public NameConcept AvailableDay { get; set; }
        public NameConcept Status { get; set; }
        public int? Quantity { get; set; }
        public int? InterestedBuyers { get; set; } //Compradores interesados 
        public int? NegativeRating { get; set; }
        public int? PositiveRating { get; set; }
        public int? CountRating { get; set; }
        public decimal? ActualPrice { get; set; }
        public string? PriceString { get; set; }
        public string? UrlReferProduct { get; set; }
        public bool? IsPublic { get; set; } // Determina si esta publicado o no 
        public bool? IsProduct { get; set; } // O servicio
        public List<ImgItem>? ImgList { get; set; }
        public ImgItem FirsImg { get; set; }
        public tblConcepValue? TypeCurrency { get; set; }
        public List<Prices> Prices { get; set; }
        public decimal PricesInternal { get; set; }
        public List<Prices>? historyOfPrice { get; set; }
        public List<tblCharacteristics>? Characteristics { get; set; }
        public List<string>? FilterISearch { get; set; } = new List<string>();
        public virtual  tblConcepValue? Adress { get; set; }
        public virtual  string? TypeProductName { get; set; }
    }

    public class tblKardexProduct
    {

    }


    public class Prices : Info
    {        
        public decimal Price { get; set; }
        public string TypeAction { get; set; }
        public bool IsPublic { get; set; }       


    }



    public class tblCharacteristics : Info
    {
        public string? Description { get; set; }
     

    }


    public class ProductFunction
    {
        public static List<ImgItem> GetImgList(string json)
        {

            try
            {
                var item = JsonSerializer.Deserialize<List<ImgItem>>(json);
                return item;
            }
            catch (Exception)
            {
                return new List<ImgItem>();
                throw;
            }

        }
        //public static List<tblTypeContext> GetTypeProduct(string data)
        //{
        //    try
        //    {
        //        var obj = JsonSerializer.Deserialize<List<tblTypeContext>>(data);
        //        return obj;
        //    }
        //    catch (Exception)
        //    {
        //        return new List<tblTypeContext>();
        //    }
        //}
        public static List<string> GetIdTypeOfProduct(string value)
        {
            var listObj = new List<string>();
            try
            {
                var list = value.Split(',');
                Parallel.ForEach(list, x =>
                {
                    listObj.Add(x);
                });
                return listObj;

            }
            catch (Exception)
            {
                return new List<string>();
                throw;
            }
        }


    }

    public class tblPurchaseTracking : Info
    {
        public MovementTypeItem TypeTraking { get; set; }
        public Guid IdUser { get; set; }

        public enum MovementTypeItem
        {
            Venta,
            Compra,
            Vencimiento,
            CarritoDeCompras
        }

        public static MovementTypeItem GetTypeTraking(string item)
        {

            var convert = new MovementTypeItem();

            if (item == MovementTypeItem.Compra.ToString()) convert = MovementTypeItem.Compra;
            if (item == MovementTypeItem.Venta.ToString()) convert = MovementTypeItem.Venta;
            if (item == MovementTypeItem.Vencimiento.ToString()) convert = MovementTypeItem.Vencimiento;
            if (item == MovementTypeItem.CarritoDeCompras.ToString()) convert = MovementTypeItem.CarritoDeCompras;

            return convert;
        }

    }

    public class tblAddressData
    {
        public TypeModeAdress ModeAdress { get; set; }
        public Guid Id { get; set; }
        public Guid IdOwner { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string AddressItem { get; set; }

        public enum TypeModeAdress
        {
            Customer,
            Company,
        }

    }


}
