namespace ConfigData
{
    public class DateConfig
    {
        static public DateTime GetDate(DateTime? date)
        {
            return DateTime.Now;
        }
        
        static public DateTime GetDate(string date)
        {
            DateTime result;
            var resul = DateTime.TryParse(date, out result );

            return result;
        }
       static public string GetDateString(DateTime? date)
        {
            return DateTime.Today.ToString();
        }

        static public string GetDateString()
        {
            return DateTime.Today.ToString();
        }
    }
}