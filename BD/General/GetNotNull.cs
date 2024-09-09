using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace Utility.General
{
    public class NotNull
    {
        public static (string error, bool status, Guid guid) GetNoNull(Object idGuid)
        {
            Guid guid = Guid.Empty;
            if (idGuid != null)
            {
                if (Guid.TryParse(idGuid.ToString(), out guid))
                {
                    return ("", true, guid);
                }
            }

            return ("Error", false, guid);
        }

    
        public static (string error, bool status, string value) GetConceptProduct(List<ConceptProduct> data)
        {

            try
            {
                return ("", true, JsonConvert.SerializeObject(data));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(new List<ConceptProduct>()));

            }
        }

       
        public static (string error, bool status, int value) GetNoNullByInt(Object valueString)
        {
            int value = 0;
            if (valueString != null)
            {
                value = (int)valueString;
                return ("", true, value);

            }

            return ("Error", false, value);
        }

        public static (string error, bool status, decimal valueString) GetNoNullByDecimal(Object valueString)
        {
            decimal value = 0;
            if (valueString != null)
            {

                return ("", true, Convert.ToDecimal(valueString.ToString()));

            }

            return ("Error", false, value);
        }


        public static (string error, bool status, bool value) GetIntToBool(Object valueString)
        {
            bool value = false;
            try
            {

                if (valueString != null)
                {
                    if (valueString == "0") return ("", true, true);
                    if (valueString == "1") return ("", true, true);

                    value = bool.Parse(valueString.ToString());
                    return ("", true, value);

                }

            }
            catch (Exception ex)
            {
                return ("", false, false);
          
            }

            return ("Error", false, value);
        }

        public static (string error, bool status, string content) GetNoNull(List<tblAddressData> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, "");

            }
        }

        public static (string error, bool status, string content) GetRols(List<tblRol> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(new List<tblRol>()));

            }
        }

        public static (string error, bool status, string content) GetRol(tblRol list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(new tblRol()));

            }
        }

        public static (string error, bool status, tblRol content) GetRol(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<tblRol>( list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new tblRol());

            }
        }


        public static (string error, bool status, List<tblRol> content) GetRols(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<tblRol>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<tblRol>());

            }
        }



        public static (string error, bool status, NameConcept nameConcept) GetNoNullNameConcept(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<NameConcept>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new NameConcept());

            }
        }


        public static (string error, bool status, List<NameConcept> nameConcept) GetListNameConcept(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<NameConcept>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<NameConcept>());

            }
        }



        public static (string error, bool status, string json) GetListNameConcept(List<NameConcept> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(new List<NameConcept>()));

            }
        }

        public static (string error, bool status, string content) GetNoNullNameConcept(NameConcept list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, "");

            }
        }


        public static (string error, bool status, string content) GetNoNull(List<string> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<string>)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(tblRol item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblRol)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(List<tblRol> item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblRol>)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(List<Permission> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<Permission>)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(tblUser item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblRol)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(List<tblUser> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblUser>)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(List<ImgItem> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblUser>)));

            }

        }
        public static (string error, bool status, List<ImgItem> content) GetNoNullImages(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<ImgItem>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<ImgItem>());

            }
        }
        public static (string error, bool status, ImgItem content) GetNoNullImage(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<ImgItem>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new ImgItem());

            }
        }

        public static (string error, bool status, List<tblCharacteristics> content) GetNoNullCharacteristics(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<tblCharacteristics>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<tblCharacteristics>());

            }
        }

        public static (string error, bool status, string content) GetNoNullCharacteristics(List<tblCharacteristics> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(new tblCharacteristics()));

            }
        }





        public static (string error, bool status, string imgString) GetNoNullImage(ImgItem list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, "");

            }
        }


        public static (string error, bool status, string content) GetNoNull(List<tblCommens> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblCommens>)));

            }
        }
        public static (string error, bool status, string content) GetNoNull(tblCommens list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblCommens)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(List<tblProduct> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblProduct>)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(tblProduct item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblProduct)));

            }
        }

        public static (string error, bool status, string content) GetNoNull(tblPurchaseTracking item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblPurchaseTracking)));

            }
        }


        public static (string error, bool status, string content) GetNoNull(List<tblPurchaseTracking> item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblPurchaseTracking>)));

            }
        }

        public static (string error, bool status, string content) GetConcepValue(tblConcepValue item)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(item));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(tblConcepValue)));

            }
        }



        public static (string error, bool status, string content) GetNoNull(List<tblConcepValue> list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, JsonConvert.SerializeObject(default(List<tblConcepValue>)));

            }
        }


        public static (string error, bool status, List<Prices> content) GetNoNullPrices(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<Prices>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<Prices>());

            }
        }



        public static (string error, bool status, string prices) GetNoNullPricesToString(object list)
        {
            try
            {
                return ("", true, JsonConvert.SerializeObject(list));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, "");

            }
        }




        public static (string error, bool status, List<tblConcepValue> content) GettblConcepValueList(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<List<tblConcepValue>>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new List<tblConcepValue>());

            }
        }


        public static (string error, bool status, tblConcepValue content) GettblConcepValueItem(object list)
        {
            try
            {
                return ("", true, JsonConvert.DeserializeObject<tblConcepValue>(list.ToString()));

            }
            catch (Exception ex)
            {
                return (ex.Message.ToString(), false, new tblConcepValue());

            }
        }





    }

    public class Null<T>
    {
        public static T Get(object obj) {
            try
            {
              string d =  obj.ToString();
                if(obj.ToString()!="null")
                 return  JsonConvert.DeserializeObject<T>(obj.ToString());
                else
                return default(T); 

            }
            catch (Exception ex)
            {
                return default(T);
            }
        }


        public static string Set(T obj)
        {
            try
            {
                if( obj != null)
                {

                var data = JsonConvert.SerializeObject(obj);
                return data;
                }
                else
                {
                    return JsonConvert.SerializeObject(default(T));
                }

            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(default(T));
            }
        }


        public static T GetNull(object obj)
        {
            try
            {
                //if (obj == null || obj == DBNull.Value)
                //    return default(T);

                if (typeof(T) == typeof(int))
                {
                    if (int.TryParse(obj.ToString(), out int intValue))
                        return (T)(object)intValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(double))
                {
                    if (double.TryParse(obj.ToString(), out double doubleValue))
                        return (T)(object)doubleValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(float))
                {
                    if (float.TryParse(obj.ToString(), out float floatValue))
                        return (T)(object)floatValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(decimal))
                {
                    if (decimal.TryParse(obj.ToString(), out decimal decimalValue))
                        return (T)(object)decimalValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(long))
                {
                    if (long.TryParse(obj.ToString(), out long longValue))
                        return (T)(object)longValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(short))
                {
                    if (short.TryParse(obj.ToString(), out short shortValue))
                        return (T)(object)shortValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(byte))
                {
                    if (byte.TryParse(obj.ToString(), out byte byteValue))
                        return (T)(object)byteValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(bool))
                {
                    if (obj?.ToString() =="0") return (T)(object)false;
                    if (obj?.ToString() =="1") return (T)(object)true;
                        if (bool.TryParse(obj?.ToString(), out bool boolValue))
                        return (T)(object)boolValue;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(char))
                {
                    if (char.TryParse(obj.ToString(), out char charValue))
                        return (T)(object)charValue;
                    else
                        return default(T);
                } 
                else if (typeof(T) == typeof(Guid))
                {
                    if (Guid.TryParse(obj.ToString(), out Guid guid))
                        return (T)(object)guid;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(DateTime))
                {
                    if (DateTime.TryParse(obj.ToString(), out DateTime time))
                        return (T)(object)time;
                    else
                        return default(T);
                }
                else if (typeof(T) == typeof(string))
                {
                    if (obj != null && obj.ToString() != "")
                        return (T)(object)obj.ToString();
                    else
                        return (T)(object)string.Empty;
                }

                var data = (T)Convert.ChangeType(obj, typeof(T));
                return data;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return default(T);
            }
        }


    }
}   
