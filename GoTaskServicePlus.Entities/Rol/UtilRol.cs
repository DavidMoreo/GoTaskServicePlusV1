
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;


namespace GoTaskServicePlus.Entities.Company
{
    public class UtilRol : tblRol
    {
        public tblRol RolConcept { get; set; }
   

        public UtilRol(string rol, Permission permission)
        {
            var utilConcept = new UtilNameCancept();
            RolConcept = new tblRol()
            {
                Name = rol,
                Code = "",
                ConceptCompany = utilConcept.Concept,
                ConceptPrevious = utilConcept.Concept,
                ConceptProject = utilConcept.Concept,
                CreationDate = Config.GetDateTodayString(),
                EditDate = Config.GetDateTodayString(),
                InUse = false,
                Disable = false,
                Id = Config.NewGuid,
                IdCompany = Config.GuidEmpty,
                IdProject = Config.GuidEmpty,
                IsCustomer = true,
                IsMaker = false, 
                IsVendor = false,    
                isPublic = true,
             PermissionByRoll = permission
            };
        }



        public UtilRol(tblRol rol)
        {
            var utilConcept = new UtilNameCancept();
            RolConcept = new tblRol()
            {
                Name = rol.Name,
                Code = rol.Code,
                ConceptCompany =  new GoTaskServiceplus.Client.Model.Comon.NameConcept(),
                ConceptPrevious = new GoTaskServiceplus.Client.Model.Comon.NameConcept(),
                ConceptProject = new GoTaskServiceplus.Client.Model.Comon.NameConcept(),
                CreationDate = rol.CreationDate ==""? Config.GetDateTodayString(): rol.CreationDate,
                EditDate = Config.GetDateTodayString(),
                InUse = false,
                Disable = false,
                Id = GetId(rol.Id),
                IdCompany = rol.IdCompany,
                IdProject = rol.IdProject,
                IsCustomer = rol.IsCustomer,
                IsAdmin = rol.IsAdmin,
                IsMaker = rol.IsMaker,
                IsVendor = rol.IsVendor,
                isPublic = rol.isPublic,
                PermissionByRoll = rol.PermissionByRoll
            };
        }


        internal Guid GetId(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid GetId(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

      

    }
}
