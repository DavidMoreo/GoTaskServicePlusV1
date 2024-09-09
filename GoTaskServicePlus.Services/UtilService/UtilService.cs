using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Drawing;

using System.Threading.Tasks;
using GoTaskServicePlus.Services.UtilService;
using GoTaskServicePlus.Model.Comon;

namespace GoTaskServicePlus.Services.UtilService
{
    public class UtilService<T> 
    {
        public  static  Task<(Response<T> response, T data)> JsonValidatingDeserialize(string json)
        {
			var obj = new Response<T>();
			try
			{
				var item = System.Text.Json.JsonSerializer.Deserialize<T>(json);               

                obj.Status = true;
                return Task.FromResult((obj, item));
            }
			catch (Exception ex)
			{
				obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                obj.Status = false;
               
                return Task.FromResult((obj, default(T)));

            }
        }


    }

    public class UtilService
    {

     
    }

}
