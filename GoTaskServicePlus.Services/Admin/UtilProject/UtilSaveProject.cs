using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Admin.UtilProject
{
    public class UtilSaveProject
    {
        public static Task<Response<tblProject>> ValidateProject(tblProject project)
        {
            var result = new  Response<tblProject>();

            if (project == null) { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se reqiere una sucursal" } }; }
            if (project.Name == null || project.Name=="") { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se reqiere un nombre" } }; }
            if (project.AddressItemId.ToString() == "")
            {
                project.AddressItemId = Config.GuidEmpty;
                //result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se requiere asignar una Direcciòn" } };
            }
            
            
            if (project.Id == Config.GuidEmpty) { project.Id = Config.NewGuid; }           
            if (project.ConceptCompany == null) { project.ConceptCompany = new NameConcept(); }
            if (project.ConceptProject== null) { project.ConceptProject = new NameConcept(); }
            if (project.Code == null || project.Code=="") { project.Code = project.Name; }
            if (project.Description == null ) { project.Description = ""; }
            if (project.CreationDate == null || project.CreationDate.Trim() == "") { project.CreationDate = Config.GetDateTodayString(); }
            if (project.MobileNumber == null ) { project.MobileNumber = ""; }
            if (project.PhoneNumber == null ) { project.PhoneNumber = ""; }
            if (project.ConceptCompany == null ) { project.ConceptCompany = new GoTaskServiceplus.Client.Model.Comon.NameConcept(); }
            
            project.EditDate = Config.GetDateTodayString();
            if (result.Msg.Count > 0)
            {
                result.Data = null;
                result.Status = false;
            }
            else
            {
                result.Status = true;
                result.Data = project;
            }
            return Task.FromResult(result);
        }


    }
}
