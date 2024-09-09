using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.General
{
    public class ClonJson<T>
    {
      
        public static T Clon(T obj) {
            try
            {
                var data = Json<T>.Serizer(obj);
                return  Json<T>.DSerizer(data);
            }
            catch (Exception)
            {
                return default(T);
                throw;
            }
        
        }

    }


    class Json<T>
    {
        public static string Serizer(T data )
        {
            try
            {
                var json = JsonConvert.SerializeObject(data);
                return json;

            }
            catch (Exception)
            {
                return  JsonConvert.SerializeObject(default(T));
                throw;
            }
          
        }

        public static T DSerizer(string data)
        {
            try
            {
                return  JsonConvert.DeserializeObject<T>(data);
                

            }
            catch (Exception)
            {
                return default(T);
                throw;
            }

        }

    }

}
