using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblSearchList : Info
    {
        //Se guarda solo si selecciona un tipo de producto
        public string SearchValue { get; set; }
       
        public static List<tblConcepValue> GetTypeProduct(string data)
        {
            try
            {
                var obj = JsonSerializer.Deserialize<List<tblConcepValue>>(data);
                return obj;
            }
            catch (Exception)
            {
                return new List<tblConcepValue>();
            }
        }


    }
}
