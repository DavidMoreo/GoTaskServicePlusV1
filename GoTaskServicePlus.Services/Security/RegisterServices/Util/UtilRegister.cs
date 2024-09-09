using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.Security.UtilRegister;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Security.RegisterServices.Util
{
    public class UtilRegister : IUtilRegister
    {
        private ICompany _ICompany;
        private IProject _IProject;
        public UtilRegister(ICompany _ICompany, IProject _IProject)
        {

            this._ICompany = _ICompany;
            this._IProject = _IProject;
        }

        public async Task<Response<tblCompany>> CreateCompanyCustomer()
        {
            var obj = new Response<tblCompany>();

            var company = new UtilCompany(Config.CompanyCustomer).company;


            var resultCompany = await _ICompany.Save(company);

            obj.Status = resultCompany.Status;
            obj.Data = resultCompany.Data;

            return obj;
        }

        public async Task<Response<tblProject>> CreateProjectCustomer(Guid IdProject)
        {
            var obj = new Response<tblProject>();
                 
            var project = new UtilProject(Config.ProjectCustomer, IdProject).project;

            var resultCompany = await _IProject.Save(project);

            obj.Status = resultCompany.Status;
            obj.Data = resultCompany.Data;

            return obj;
        }

        public async Task<Response<tblCompany>> ValidateCompanyCustomer()
        {
            var obj = new Response<tblCompany>();

            ConceptFilter config = new ConceptFilter()
            {
                IsAdmin = true
            };

            var company = await _ICompany.Get(config, Config.CompanyCustomer);

            obj.Status = company.Status;
            obj.Data = company.Data;

            return obj;
        }

        public async Task<Response<tblProject>> ValidateProjectCustomer()
        {
            var obj = new Response<tblProject>();

            ConceptFilter config = new ConceptFilter()
            {
                IsAdmin = true
            };
            var project = await _IProject.Get(config,Config.ProjectCustomer);

            obj.Status = project.Status;
            obj.Data = project.Data;

            return obj;
        }

    }
}
