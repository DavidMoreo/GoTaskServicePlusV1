using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblCompany : Info
    {
        public string Description { get; set; }
        public string Nit { get; set; }
        public string TypeCompanyMode { get; set; }
     
      
    }

   public class TypeCompanyModeValue
    {
     public string Vendor { get { return "Vendedor Final"; } }
     public string Provider { get { return "Proveedor"; } }
     public string Manufacturer { get { return "Fabricante"; } }
     public string Defaul { get { return "Defaul"; } }
    
    }


    public class tblProject : Info
    {
        public string Description { get; set; }
        public string MobileNumber { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsWhatsApp { get; set; }
        public string? RegistrationCode { get; set; }
        public NameConcept ConceptCompany { get; set; }    
        public Guid AddressItemId { get; set; }    
        public string TypeCompanyMode { get; set; }
        public string? StoreOpeningTime { get; set; }
        public string? StoreClosingTime { get; set; }
    }

    public class ConceptProject
    {
        public string Name { get; set; }
        public string MobilNumber { get; set; }
        public string Gps { get; set; }
        public NameConcept ConceptCity { get; set; }
    }



}
