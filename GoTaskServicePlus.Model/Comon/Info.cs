using ConfigData;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServiceplus.Client.Model.Comon
{
    public class Info
    {
        public Guid Id { get; set; }
        public Guid IdCompany { get; set; }
        public Guid IdProject { get; set; }
        public NameConcept? ConceptCompany { get; set; }
        public NameConcept? ConceptProject { get; set; }
        public NameConcept? ConceptPrevious { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? CreationDate { get; set; }
        public string ?EditDate { get; set; }
        public bool? InUse { get; set; }
        public bool? Disable { get; set; }
        public DateTime GetCreationDate { get { return DateConfig.GetDate(CreationDate); } }
        public DateTime GetEditDate { get { return DateConfig.GetDate(EditDate); } }

    }



    public class ImgItem : Info
    {
        public string url { get; set; }
        public string? NameVisible { get; set; }
        public List<string>? ReferUse { get; set; }
        public TypeDbImg TypeImgDb { get; set; }
        public static TypeDbImg GetStringToTypeImgDb(string mode)
        {
            TypeDbImg type = TypeDbImg.Defaul;
            if (mode == TypeDbImg.BdPublic.ToString()) type = TypeDbImg.BdPublic;
            if (mode == TypeDbImg.DriveGmail.ToString()) type = TypeDbImg.DriveGmail;
            if (mode == TypeDbImg.Upload.ToString()) type = TypeDbImg.Upload;
            return type;
        }

        public enum TypeDbImg
        {
            DriveGmail,
            Upload,
            BdPublic,
            Defaul
        }
    }





    //public class tblConceptData : Info // agregar cualquier iten por llave valor 
    //{

    //    public Guid IdRelation { get; set; }         
    //    public string TypeConceptValue { get; set; }   
    //    public string TypeValue { get; set; }         
    //    public bool IsPublic { get; set; }         
    //    public decimal Value { get; set; }
    //    public decimal Description { get; set; }
    //   public int  ConceptType { get; set; }    
    //    public enum ConceptTypeMode // Se crea el tipo y despues se crea un llave valor en base a ese tipo 
    //    {
    //        ModeType,
    //        ModeValue,
    //    }

    //}

    public class tblConcepValue : Info
    {
        public NameConcept Concept { get; set; }
        public string? Value { get; set; }
        public string? Type { get; set; }
        public bool isPublic { get; set; }
       

    }


    public class NameConcept
    {
        public string? Name { get; set; }
        public string? Value { get; set; }
        public Guid? Id { get; set; }
        
    }

    public class ConceptProduct
    {        
        public string Name { get; set; }
        public int Quantity   { get; set; }
        public Guid Id { get; set; }
    }

    public class ConceptCategory
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public Guid Id { get; set; }
        public Guid IdCompany { get; set; }
    }

}

