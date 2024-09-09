using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Model.Statistics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Admin
{
    public class DataAnalysisService : IDataAnalysisService
    {
        public DataAnalysisService() { 
        
        }

        public List<SearchFilter> SearchList { get ; set ; }

        public void Save(string value, string ip )
        {

            if (SearchList == null) SearchList = new List<SearchFilter>();

            SearchList.Add(new SearchFilter() { Status = true, Filter = value , Ip = ip, Date = Config.GetDateTimeToday() });
           
        }





        public List<SearchFilter> GetSearchFilter()
        {
           return  SearchList;          

        }
    }
}
