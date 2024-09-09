
using CloudinaryDotNet.Actions;
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
    public class UtilCompany :tblCompany
    {
        public tblCompany company { get; set; }
        public UtilCompany(tblCompany company)
        {
            GetId(company.Id);
        }

        public UtilCompany(string name)
        {
            var utilConcept = new UtilNameCancept();
            company = new tblCompany()
            {
             Name = name,
             Description ="",
             Code = "",
             ConceptCompany = utilConcept.Concept,
             ConceptPrevious = utilConcept.Concept,
             ConceptProject = utilConcept.Concept,
             CreationDate = Config.GetDateTodayString(),
             EditDate = Config.GetDateTodayString(),
             TypeCompanyMode = "",
             InUse = false,
             Disable = false,
             Id = Config.NewGuid,
             IdCompany = Config.GuidEmpty,
             IdProject = Config.GuidEmpty,
             Nit =""
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
