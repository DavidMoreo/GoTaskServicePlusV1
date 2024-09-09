using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Comon
{
    public class ConceptFilter
    {
        public Guid  IdCompany { get; set; }
        public Guid  IdProject { get; set; }
        public Guid  IdUser { get; set; }
        public bool  IsAdmin { get; set; }
        public bool  IsVendor { get; set; }
        public bool  IsMaker { get; set; }
        public bool  IsCustomer { get; set; }
        public string  MobilNumber { get; set; }
        public string  NameUser { get; set; }
        public List<string> IdCitys { get; set; }
    }
}
