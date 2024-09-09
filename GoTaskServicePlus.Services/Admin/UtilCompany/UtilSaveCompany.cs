using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Admin.UtilCompany
{
    public class UtilSaveCompany
    {
        public static Task<Response<tblCompany>> ValidateCompany(tblCompany company)
        {
            var result = new  Response<tblCompany>();

            if (company == null) { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se reqiere una compañia" } }; }
            if (company.Name == null || company.Name=="") { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se reqiere un nombre" } }; }
            
            
            if (company.Id == Config.GuidEmpty) { company.Id = Config.NewGuid; }
            if (company.Nit == string.Empty || company.Nit == null) { company.Nit = string.Empty; }
            if (company.ConceptCompany == null) { company.ConceptCompany = new NameConcept(); }
            if (company.ConceptProject ==null) { company.ConceptProject = new NameConcept(); }
            if (company.Code == null || company.Code=="") { company.Code = company.Name; }
            if (company.Description == null ) { company.Description = ""; }
            
            company.EditDate = Config.GetDateTodayString();
            if (result.Msg.Count > 0)
            {
                result.Data = null;
                result.Status = false;
            }
            else
            {
                result.Data = company;
                result.Status = true;
            }
            return Task.FromResult(result);
        }


    }
}
