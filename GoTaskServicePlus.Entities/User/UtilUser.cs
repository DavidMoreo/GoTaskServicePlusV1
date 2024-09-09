
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
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
    public class UtilUser : tblUser
    {
        public tblUser user { get; set; }
        public UtilUser(tblUser user)
        {
            GetId(user.Id);
        }

        public UtilUser(Guid IdProject)
        {
            var utilConcept = new UtilNameCancept();
            user = new tblUser()
            {
                Name = "",
                Code = "",
                ConceptCompany = utilConcept.Concept,
                ConceptPrevious = utilConcept.Concept,
                ConceptProject = utilConcept.Concept,
                CreationDate = Config.GetDateTodayString(),
                EditDate = Config.GetDateTodayString(),
                Email = "",
                InUse = false,
                Disable = false,
                Id = Config.NewGuid,
                IdCompany = Config.NewGuid,
                IdProject = GetId(IdProject)


            };
        }


        public UtilUser(tblUser user,Guid idCompany, Guid idProject)
        {
            this.user = user;
            this.user.IdCompany = GetId(idCompany);
            this.user.IdProject = GetId(idProject);  
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
