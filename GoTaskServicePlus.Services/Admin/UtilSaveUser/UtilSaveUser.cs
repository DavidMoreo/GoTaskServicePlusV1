using GoTaskServiceplus.Client.Model.Security;
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
    public class UtilSaveUser
    {
        public static Task<Response<tblUser>> Validate(tblUser userNew)
        {
            var result = new  Response<tblUser>();
           
                if (userNew == null) { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se reqiere una sucursal" } }; }
                if (userNew.Password == null) { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Clave Requerida" } }; }
           

            if (userNew.Name == null) userNew.Name = string.Empty;

                if (userNew.Id == Config.GuidEmpty) { userNew.Id = Config.NewGuid; }
                if (userNew.ConceptCompany == null) { userNew.ConceptCompany = new GoTaskServiceplus.Client.Model.Comon.NameConcept(); }
                if (userNew.ConceptProject == null) { userNew.ConceptProject = new GoTaskServiceplus.Client.Model.Comon.NameConcept(); }
                if (userNew.Code == null || userNew.Code == "") { userNew.Code = userNew.Name; }
                if (userNew.KeyPassword == null ) { userNew.KeyPassword = ""; }

                if (userNew.CreationDate == null) { userNew.CreationDate = Config.GetDateTodayString(); }
           

                if (userNew.AddressList == null) { userNew.AddressList = new List<GoTaskServiceplus.Client.Model.Comon.tblConcepValue>(); }
                if (userNew.ListFavorites == null) { userNew.AddressList = new List<GoTaskServiceplus.Client.Model.Comon.tblConcepValue>(); }

                userNew.EditDate = Config.GetDateTodayString();
                if (result.Msg.Count > 0)
                {
                    result.Data = null;
                    result.Status = false;
                }
                else
                {
                    result.Status = true;
                    result.Data = userNew;
                }

            //if (userNew.Password == null) { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se rquiere  password " } }; }
            //if (userNew.Email == null || userNew.Email == "") { result.Status = false; result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "Se rquiere  email " } }; }

            return Task.FromResult(result);
        }


    }
}
