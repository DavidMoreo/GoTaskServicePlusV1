using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Security
{
    public class AutorizationUser
    {
        public string Bearer { get; set; }
        public Guid IdUser { get; set; }
        public Guid IdCompany { get; set; }
        public Guid IdProject { get; set; }
        public string NameCompany { get; set; }
        public string NameProject { get; set; }
        public string IpCutomer { get; set; }
        public string MobileNumber { get; set; }
        public string NameUser { get; set; }
        public List<tblRol> Rol { get; set; }
        public List<string> FilterCitysRules { get; set; }
    }

    public class FilterRules
    {
        public List<NameConcept> list { get; set; }
    }


    



}
