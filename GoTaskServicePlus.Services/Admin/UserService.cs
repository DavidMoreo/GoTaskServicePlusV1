using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.Admin.UtilCompany;
using GoTaskServicePlus.Services.Admin.UtilProject;
using GoTaskServicePlus.Services.Product.CRUD.Products.UtilSearch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.User
{
    public class UserService : IUser
    {

        private ISqlModelUser<tblUser> sqlService;

        public List<CounterUser> CounterUsers { get; set ; }

        public UserService(ISqlModelUser<tblUser> sqlService)
        {
            this.sqlService = sqlService;
        }

        public Task<Response<tblUser>> Delete(ConceptFilter config, Guid id)
        {
            return sqlService.Delete(config, id);
        }

        public async Task<Response<tblUser>> Get(ConceptFilter config, Guid id)
        {
            var user = await sqlService.Get(config, id);           
            return user;
        }

        //public async Task<Response<List<tblUser>>> GetAll(Guid idProject, int page)
        //{
        //    return await sqlService.GetAllUserFilter(idProject, page);
        //}

        public async Task<Response<List<tblUser>>> GetFilter()
        {
            var users = await sqlService.GetFilter();
             return users;  

        }

        public async Task<Response<List<tblUser>>> GetAllByIdCompny(ConceptFilter config, int page)
        {
            return await sqlService.GetAllByIDCompany(config, page);
        }

        public async Task<Response<List<tblUser>>> GetAllByIdProjet(ConceptFilter config, int page)
        {

            var listFilterGuid = new List<Guid>();
            var result = await sqlService.GetFilter();
            if (result != null)
            {
                sqlService.ListFilter = result.Data;
            }

            if (sqlService.ListFilter != null)
            {
                listFilterGuid = (from f in sqlService.ListFilter where f.IdProject == config.IdProject select f.Id).ToList();
            }

            return await sqlService.GetUserListById(listFilterGuid, page);
        }

        public async Task<Response<tblUser>> Save(tblUser data)
        {
            var result = await UtilSaveUser.Validate(data);
            if (result.Status)
            {
                return await sqlService.Save(result.Data);
            }
            else
            {
                return result;
            }
        }

        public async Task<Response<tblUser>> Update(tblUser data)
        {
            var result = await UtilSaveUser.Validate(data);
            if (result.Status)
            {
                var resultUser = await sqlService.Update(result.Data);
                return resultUser;
            }
            else
            {
                return result;
            }

        }


    }
}
