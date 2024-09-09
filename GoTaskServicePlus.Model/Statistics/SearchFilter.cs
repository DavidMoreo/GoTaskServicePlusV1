using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Statistics
{
    public class SearchFilter
    {
        public string TypeData { get; set; }
        public string Filter { get; set; }
        public DateTime Date { get; set; }
        public bool Status { get; set; }
        public string Ip { get; set; }
    }
}
