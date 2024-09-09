using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblCartAndFavoriteProduct :Info
    {
        public string TypeItemValue { get; set; }
        public Guid IdProduct { get; set; }
        public Guid IdCustomer { get; set; }
        public int Quantity { get; set; }
    }


    public class TypeItem
    {
        public string CartProduct { get { return "CartProduct"; } }
        public string Favorite { get { return "Favorite"; } }
    }

}
