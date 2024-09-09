using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Interfaces.Security.UtilRegister;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.KeyValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Security.RegisterServices
{
    public class RegisterService : IRegister
    {

        private ISqlModelLogin<tblUser> _Service;
        private IUtilRegister _IUtilRegister;
        private readonly IKeyValidation _IKeyValidation;
        public RegisterService(ISqlModelLogin<tblUser> _Service, IUtilRegister _IUtilRegister, IKeyValidation _IKeyValidation)
        {

            this._Service = _Service;
            this._IUtilRegister = _IUtilRegister;
            this._IKeyValidation = _IKeyValidation;
        }

        public Task<Response<tblUser>> DeleteRegister(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Task<Response<tblUser>> GetRegister(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblUser>> GetRegister(string name)
        {
            var result = await _Service.GetByEmail(name);
            return result;
        }

        public Task<Response<tblUser>> GetRegisterByCompany(Guid IdCompany)
        {
            throw new NotImplementedException();
        }

        public Task<Response<tblUser>> GetRegisterByProject(Guid IdProject)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblUser>> SaveRegister(tblUser user)
        {
            var obj = new Response<tblUser>();
            obj.Data = new tblUser();

            var resultCompany = await _IUtilRegister.ValidateCompanyCustomer();
            var resultProject = await _IUtilRegister.ValidateProjectCustomer();

            var company = new Response<tblCompany>();
            var project = new Response<tblProject>();

            if (resultCompany.Data == null) company = await _IUtilRegister.CreateCompanyCustomer();
            if (resultProject.Data == null && company.Data != null) project = await _IUtilRegister.CreateProjectCustomer(company.Data.Id);
            if (resultProject.Data == null && resultCompany.Data != null) project = await _IUtilRegister.CreateProjectCustomer(resultCompany.Data.Id);

            if (resultCompany.Data != null) company = resultCompany;
            if (resultProject.Data != null) project = resultProject;


            if (company.Data != null && project.Data != null)
            {
                var conceptProject = new UtilNameCancept(project.Data.Name, project.Data.Id, project.Data.Name);
                var conceptCompany = new UtilNameCancept(company.Data.Name, company.Data.Id, company.Data.Name);
                var concept = new UtilNameCancept();
                user.ConceptCompany = conceptCompany.Concept;
                user.ConceptProject = conceptProject.Concept;
                user.ConceptPrevious = concept.Concept;


                var permission = new Permission();                
                var utilRol = new UtilRol(RoleCustomer.Cutomer,permission);

                user.RolUser = new List<tblRol>
                {
                    utilRol.RolConcept
                };
                user.RolUserActive = utilRol.RolConcept;
                user.IdCompany =  company.Data.Id ;
                user.IdProject =  project.Data.Id ;
                user.Password = _IKeyValidation.Encrypt(user.Password, user.Password);
                if(user.Name == null || user.Name =="") user.Name = user.Email;
                if(user.MobileNumber == null || user.MobileNumber == "") user.MobileNumber = user.Email;
            }

            obj = await ValidationRegisterService.Validation(user);
            if (user.IdCompany == Config.GuidEmpty) return obj;
            if (user.IdProject == Config.GuidEmpty) return obj;

            if (!obj.Status) return obj;

            ConceptFilter config = new ConceptFilter()
            {
                IdCompany = user.IdCompany,
                IdProject = user.IdProject
            };


            var userExist = await _Service.GetByEmail(user.Email);
            if (userExist.Data != null)
            {
                obj.Status = false;
                obj.Msg.Add(new MsgResponse() { Msg = "Este usuario no está disponible, ingrese uno diferente" });
                return obj;
            }
           
          
             await _Service.Save(obj.Data);

             return obj;    
        }

        public Task<Response<tblUser>> SaveRegister()
        {
            throw new NotImplementedException();
        }

        public Task<Response<tblUser>> UpdateRegister(tblUser user)
        {
            throw new NotImplementedException();
        }
    }
}
