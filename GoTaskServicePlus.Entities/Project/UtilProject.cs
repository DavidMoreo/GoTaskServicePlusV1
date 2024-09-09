
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
    public class UtilProject :tblProject
    {
        public tblProject project { get; set; }
        public UtilProject(tblProject project)
        {
            GetId(project.Id);
        }

        public UtilProject(string name, Guid IdCompany)
        {
            var utilConcept = new UtilNameCancept();
            project = new tblProject()
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
             IdCompany = GetId(IdCompany),
             IdProject = Config.NewGuid    ,
             RegistrationCode =name.Replace(" ","")+"_"+Config.NewGuid.ToString().Split("-")[0]
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
