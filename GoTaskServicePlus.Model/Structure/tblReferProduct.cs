using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblReferProduct : Info
    {       
        public string Refer { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<Prices> Prices { get; set; } = new List<Prices>();
    }

    public class TypePrice
    {       
        public const string IsQuantity = "IsQuantity";
        public const string IsACost = "IsACostInMoney";
        public const string IsACostInPorcentage = "IsACostInPorcentage";
        public const string IsADiscount = "isADiscounInMoney";
        public const string IsADiscountInPorcentage = "isADiscountInPorcentage";
        public const string IsProfitInMoney = "IsProfitInMoney";
        public const string IsProfitInPorcentage = "IsProfitInPorcentage";
    }

}
