using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Security.RegisterServices
{
    public class ValidationRegisterService
    {
        public static Task<Response<tblUser>> Validation(tblUser user)
        {
            var response = new Response<tblUser>();
            response.Status = true;
            DateTime date;

            if (user.ImgUrl == null) user.ImgUrl = "";

            if (user == null)
            {
                response.Status = false;
                response.ErrorPublic = $"Operación no válida él {nameof(user)} no debe ser nulo";

            }
            else
            {



                if (user.ConceptProject.Id == Guid.Empty)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(tblUser.ConceptProject)} no debe ser nulo";

                }

                if (user.ConceptCompany.Id == Guid.Empty)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(tblUser.ConceptCompany)} no debe ser nulo";

                }

                if (user.Id == Guid.Empty)
                {
                    user.Id = Config.NewGuid;
                }

                if (user.Email == string.Empty)
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(tblUser.Email)} no debe ser nulo";

                }


                if (user.Password == string.Empty )
                {
                    response.Status = false;
                    response.ErrorPublic = $" Operación no válida él {nameof(tblUser.Email)} no debe ser nulo";

                }


                if (user.CreationDate != string.Empty)
                {
                    user.CreationDate = ConfigData.DateConfig.GetDateString();
                }

                if (!DateTime.TryParse(user.CreationDate, out date))
                {
                    user.CreationDate = ConfigData.DateConfig.GetDateString();
                }

                if (user.EditDate != string.Empty)
                {
                    user.EditDate = ConfigData.DateConfig.GetDateString();
                }

                if (!DateTime.TryParse(user.EditDate, out date))
                {
                    user.EditDate = ConfigData.DateConfig.GetDateString();
                }

                if (user.Code == string.Empty)
                {
                    user.Code = user.Name;
                }


            }

            response.Data = user;

            return Task.FromResult(response);
        }


    }
}
