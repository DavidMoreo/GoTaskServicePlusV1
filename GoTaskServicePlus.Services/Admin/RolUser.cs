using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Admin
{
    public class RolUser : IRolUser
    {

        ISqlModelRolUser<tblRol> _SqlRol;

        public RolUser(ISqlModelRolUser<tblRol> _SqlRol)
        {
            this._SqlRol = _SqlRol;
        }


        public async Task<Response<tblRol>> Delete(ConceptFilter config, Guid id)
        {
            var response = new Response<tblRol>();

            if (id != Guid.Empty)
            {
                response = await _SqlRol.Delete(config, id);
                return response;
            }
            else
            {
                response.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "No eliminado" } };
                return response;
            }
        }

        public async Task<Response<tblRol>> Get(ConceptFilter config, Guid id)
        {
            var response = new Response<tblRol>();      
           
            if (id != Guid.Empty)
            {
                response = await _SqlRol.Get(config,id);
                return response;
            }
            else
            {
                response.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "No existe" } };
                return response;
            }
        }

        public async Task<Response<List<tblRol>>> GetRolByRol(ConceptFilter config)
        {
            var response = new Response<List<tblRol>>();

           
                response = await _SqlRol.GetByRol(config);
                return response;
           
        }


        public async Task<Response<tblRol>> Get(ConceptFilter config, string filter)
        {
            var response = new Response<tblRol>();
            if (filter != string.Empty)
            {
                response = await _SqlRol.Get(config, filter);
                return response;
            }
            else
            {
                response.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "No existe" } };
                return response;
            }
        }

        public async Task<Response<List<tblRol>>> GetAllByProject(ConceptFilter config, int page, string filter = "all")
        {
            var respnse = new Response<List<tblRol>>();
            respnse = await _SqlRol.GetAllByProject(config,page, filter );
            return respnse;
        }

        public async Task<Response<tblRol>> Save(tblRol data)
        {
            var respnse = new Response<tblRol>();
            data.Id = Config.NewGuid;
            var rolNew = new UtilRol(data);
            var rolValidate = await UtilsRol.UtilsRol.ValidateCompany(rolNew.RolConcept);
            if (rolValidate.Status)
            {
                respnse = await _SqlRol.Save(rolValidate.Data);
                return respnse;
            }
            else
            {
                respnse.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "No guardado" } };
                return respnse;    
            }
        }

        public async Task<Response<tblRol>> Update(tblRol data)
        {
            var respnse = new Response<tblRol>();
            var rolNew = new UtilRol(data);

            ConceptFilter config = new ConceptFilter();
            config.IdProject = data.IdProject;  
            config.IdCompany = data.IdCompany;  
            var exist = _SqlRol.Get(config,data.Id);

            var rolValidate = await UtilsRol.UtilsRol.ValidateCompany(rolNew.RolConcept);
            if (rolValidate.Status)
            {
                respnse = await _SqlRol.Update(rolValidate.Data);
                return respnse;
            }
            else
            {
                respnse.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "No guardado" } };
                return respnse;
            }
        }
    }
}
