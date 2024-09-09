using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServiceplus.Client.Model.Security
{
    public class tblUser : Info
    {
        public List<tblRol>? RolUser { get; set; }
        public tblRol? RolUserActive { get; set; }
        public string Password { get; set; }
        public string KeyPassword { get; set; }
        public string Email { get; set; }
        public string? ImgUrl { get; set; }
        public string? MobileNumber { get; set; }
        public TypeStatusRegister StatusRegister { get; set; }
        public virtual List<ConceptProduct>? ListShoppingCart { get; set; }
        public virtual List<Permission>? ListPermission { get; set; }
        public List<ConceptProduct>? ListFavorites { get; set; }
        public List<tblConcepValue>? AddressList { get; set; }
        public List<NameConcept>? ListMyLikes { get; set; }

        public enum TypeStatusRegister
        {
            CodigoEnvido,
            PendienteValidar,
            CorreoValidao
        }
        public enum TypeValidateUser
        {
            Get,
            Save,
            Delete
        }

    }


    public class ConceptUser
    {
        public string Name { get; set; }
        public string MobileNumber { get; set; }
    }


    public class Orders : Info
    {
        public int TypeOrder { get; set; }
        public tblAddressData Adress { get; set; }
        public string Img { get; set; }
        public List<ConceptProduct> Product { get; set; }

    }


    //IsCustomer si es cliente los permidos no seguardn son ppr defecto
    public class tblRol : Info
    {
        public  Permission? PermissionByRoll { get; set; }
        public bool? isPublic { get; set; }
        public bool? IsCustomer { get; set; }
        public bool? IsVendor { get; set; }
        public bool? IsMaker { get; set; }
        public bool? IsAdmin { get; set; }
        
    }



    public class Permission
    {
        public bool?  Read { get; set; }
        public bool? Write { get; set; }
        public bool? Delete { get; set; }
        public bool? Share { get; set; }
        public bool? Save { get; set; }
        public string? Page { get; set; }
   
      
    }

    public class RoleCustomer
    {

        public static string Cutomer { get { return "Cutomer"; } }
        public static string Vendor { get { return "Vendor"; } }
        public static string Producer { get { return "Producer"; } }

    }



    public class CounterUser
    {
        public string? Date { get; set; }
        public string Page { get; set; }
        public int? Count { get; set; }
     
    }

}
