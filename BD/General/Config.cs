using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.General
{
    public class Config
    {
        public static string  ProjectCustomer { get { return "Go task Service Project Customer"; } }
        public static string  CompanyCustomer{ get { return "Go task Service Company Customer"; } }
        public static string ConnectionSqlName { get { return "SqlString:value"; } }
        public static string GetRouteFiles { get { return Path.Combine("wwwroot", "Files"); } }
        public static string WhatsAppGoTaskService { get { return "3192024524"; } }
        public static string Host { get { return "https://gotaskservice.com"; } }
        public static int ExpiresTokenMinute { get { return 60; } }

        public static int ExpiresTokenRefreshMinute { get { return (ExpiresTokenMinute+3); } }
        public static Guid NewGuid { get { return Guid.NewGuid(); } }
        public static Guid GuidEmpty { get { return Guid.Empty; } }
        public static Guid GuidParse(string guid)
        {
            return Guid.Parse(guid);    
        }

        public static bool GuidIsNotValid(string guid)
        {
            try
            {
             var data = Guid.Parse(guid);
                if(data != Guid.Empty)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {

                return false;
            }
        }

        static public DateTime GetTodayDate()
        {
           
            return DateTime.Now;
        }

        static public DateTime GetParseDate(string date)
        {
            DateTime result;
            var culture = new CultureInfo("en-US");
            //List<string> list = new List<string>();
            //list.Add("dd/MM/yyyy");
            //list.Add("dd/MMMM/yyyy");
            //list.Add("dd/yyyy/MM");
            //list.Add("dd/yyyy/MMMM");
            //list.Add("yyyy/MM/dd");
            return DateTime.Parse(date, culture);
            //if (System.DateTime.TryParse(date, out result))
            //{
            //    return result;
            //}

            //var resul = DateTime.TryParse(date, out result);

            //return result;
        }
        static public string GetDateToString(DateTime? date)
        {
            var culture = new CultureInfo("en-US");
            return date?.ToString("yyyy/MM/dd HH:mm:ss", culture);
        }
        static public DateTime GetDateTimeToday( )
        {
            DateTime date = new  DateTime ();
            date = DateTime.Today;
            return date;
        }

        static public string GetDateTodayString()
        {
            var culture = new CultureInfo("en-US");
            return GetDateTimeToday().ToString("yyyy/MM/dd HH:mm:ss", culture);
        }


        #region IA
        public static Double ProbabilityMaxIA { get { return 0.5000000; } }
        public static Double ProbabilityMediunIA { get { return 0.2000000; } }
        public static Double ProbabilityLowIA { get { return 0.2000000; } }

        #endregion IA

    }
}
