using GoTaskServicePlus.Model.Statistics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Admin
{
    public interface IDataAnalysisService
    {
        public List<SearchFilter> SearchList { get; set; }
        public void Save(string value, string id);
        public List<SearchFilter> GetSearchFilter();

    }

}
