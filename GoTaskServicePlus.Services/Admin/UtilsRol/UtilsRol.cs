using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Admin.UtilsRol
{
    public class UtilsRol
    {
        public static Task<Response<tblRol>> ValidateCompany(tblRol rol)
        {
            var response = new Response<tblRol>();
            response.Msg = new List<MsgResponse>();
  

            if (rol.Name == null) response.Msg.Add(new MsgResponse { Msg ="Nombre requerido", Id = Config.NewGuid });
            if (rol.Name == "") response.Msg.Add(new MsgResponse { Msg = "Nombre requerido", Id = Config.NewGuid });
            if (rol.IdCompany == Config.GuidEmpty) response.Msg.Add(new MsgResponse { Msg = "Nombre compañia requerido", Id = Config.NewGuid }); ;
            if (rol.IdProject == Config.GuidEmpty) response.Msg.Add(new MsgResponse { Msg = "Nombre proyecto", Id = Config.NewGuid }); ;

            response.Status =  !(response.Msg.Count() > 0);
         

            if (rol.PermissionByRoll == null) rol.PermissionByRoll = new Permission();
            if (rol.Id == Config.GuidEmpty) rol.Id = Config.NewGuid;
            if (rol.ConceptCompany == null) rol.ConceptCompany = new GoTaskServiceplus.Client.Model.Comon.NameConcept();
            if (rol.ConceptProject == null) rol.ConceptProject = new GoTaskServiceplus.Client.Model.Comon.NameConcept();
            if (rol.ConceptPrevious == null) rol.ConceptPrevious = new GoTaskServiceplus.Client.Model.Comon.NameConcept();
            if ( !Null<bool>.GetNull(rol.IsCustomer) && !Null<bool>.GetNull(rol.IsVendor) && !Null<bool>.GetNull(rol.IsMaker) && !Null<bool>.GetNull(rol.IsAdmin))
                rol.IsCustomer = true;

            response.Data = rol;
            return Task.FromResult(response);
        }
    }

  
}
