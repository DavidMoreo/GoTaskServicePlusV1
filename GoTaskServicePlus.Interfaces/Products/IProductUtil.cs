using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Products
{
    public interface IProductUtil
    {
        public Task SendNotificationBuyCancel(string notifer);
        public  Task ProductCreate(string text);
        public Task<List<tblProduct>> OrderProduct(List<tblProduct> products);
    }
}
